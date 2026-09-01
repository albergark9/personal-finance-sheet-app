import datetime
import json
import re

from playwright.sync_api import sync_playwright

URL = 'http://localhost:4300/'
fallos = []

MESES_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
HOY = datetime.date.today()
# El libro se crea para el año en curso, así que la aplicación debe abrirlo por
# el mes de hoy, sea cual sea. Los apuntes de la prueba son de julio.
MES_DE_HOY = MESES_ES[HOY.month - 1]
ANIO_EN_CURSO = HOY.year
JULIO = 6  # índice del chip de julio en la cinta
OTRO_ANIO = ANIO_EN_CURSO + 1


def julio(dia):
    """Una fecha de julio del año en curso, en el formato del input date."""
    return '%d-07-%02d' % (ANIO_EN_CURSO, dia)


def comprobar(nombre, real, esperado):
    if real == esperado:
        print('ok   %s -> %r' % (nombre, real))
    else:
        fallos.append(nombre)
        print('FALLO %s: %r != %r' % (nombre, real, esperado))


def solo_numero(texto):
    limpio = re.sub(r'[^\d,\-−]', '', texto).replace('−', '-').replace(',', '.')
    return float(limpio) if limpio not in ('', '-') else None


with sync_playwright() as p:
    navegador = p.chromium.launch()
    # locale explícito: la aplicación elige idioma según el navegador, y estas
    # comprobaciones esperan los textos en español.
    pg = navegador.new_page(viewport={'width': 1280, 'height': 1000}, locale='es-ES')
    errores_consola = []
    pg.on('console', lambda m: errores_consola.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errores_consola.append(str(e)))
    # Los window.confirm (cerrar con cambios, quitar un fijo) se aceptan.
    pg.on('dialog', lambda d: d.accept())

    pg.goto(URL)
    pg.wait_for_selector('.portada__titulo')
    pg.wait_for_timeout(2500)
    pg.screenshot(path='/tmp/real-portada.png', full_page=True)
    comprobar('la portada carga', pg.locator('.portada__titulo').is_visible(), True)

    # --- fichero de un ano que no es el actual: debe abrir enero
    pg.fill('.campo--anio input', str(ANIO_EN_CURSO - 1))
    pg.click('.opcion .boton--sello')
    pg.wait_for_selector('.barra')
    comprobar('anio en la barra', pg.locator('.barra__anio').inner_text(), str(ANIO_EN_CURSO - 1))
    comprobar('libro de otro anio abre en enero', pg.locator('.tarjeta--resumen .tarjeta__titulo').inner_text(), 'Enero')
    comprobar('avisa de que hay cambios sin descargar', pg.locator('.estado--sucio').is_visible(), True)

    # --- volver a empezar con el ano en curso
    pg.click('.boton--fantasma')
    pg.wait_for_selector('.portada__titulo')
    pg.fill('.campo--anio input', str(ANIO_EN_CURSO))
    pg.click('.opcion .boton--sello')
    pg.wait_for_selector('.barra')
    comprobar(
        'libro del anio en curso abre en el mes de hoy',
        pg.locator('.tarjeta--resumen .tarjeta__titulo').inner_text(),
        MES_DE_HOY
    )

    # --- gastos fijos: mismos importes que el Excel
    fijos = ['750', '39.90', '55', '22', '34.95']
    casillas = pg.locator('fc-panel-fijos tbody td.col-importe input')
    for i, valor in enumerate(fijos):
        casillas.nth(i).fill(valor)
        casillas.nth(i).blur()
    pg.wait_for_timeout(300)
    comprobar('total de fijos', solo_numero(pg.locator('fc-panel-fijos tfoot td').first.inner_text()), 901.85)

    # anadir Netflix a mano
    pg.click('fc-panel-fijos .boton--linea')
    pg.wait_for_timeout(200)
    pg.locator('fc-panel-fijos tbody tr td:nth-child(2) input').last.fill('Netflix')
    pg.locator('fc-panel-fijos tbody tr td:nth-child(3) select').last.select_option('Suscripciones')
    pg.locator('fc-panel-fijos tbody td.col-importe input').last.fill('12.99')
    pg.locator('fc-panel-fijos tbody td.col-importe input').last.blur()
    pg.wait_for_timeout(300)
    comprobar('total de fijos con Netflix', solo_numero(pg.locator('fc-panel-fijos tfoot td').first.inner_text()), 914.84)

    # --- gastos del dia
    gastos = [
        (julio(3), 'Gasolina', 'Repostaje Repsol', '62.40'),
        (julio(5), 'Comida', 'Compra semanal Mercadona', '78.15'),
        (julio(11), 'Ocio', 'Cine y canas', '24'),
        (julio(18), 'Extras', 'Zapatillas nuevas', '55.90'),
        (julio(30), 'Comida', 'Cena de fin de mes', '31.20'),
    ]
    for fecha, cat, concepto, importe in gastos:
        pg.fill('fc-panel-diarios input[name="fecha"]', fecha)
        pg.select_option('fc-panel-diarios select[name="categoria"]', cat)
        pg.fill('fc-panel-diarios input[name="concepto"]', concepto)
        pg.fill('fc-panel-diarios input[name="importe"]', importe)
        pg.click('fc-panel-diarios button[type="submit"]')
        pg.wait_for_timeout(200)

    comprobar('numero de apuntes en la lista', pg.locator('fc-panel-diarios .apunte').count(), 5)
    comprobar('semanas con apuntes', pg.locator('fc-panel-diarios .semana').count(), 4)
    comprobar('el gasto del dia 30 cae en la semana 5',
              pg.locator('fc-panel-diarios .semana').last.locator('.semana__nombre').inner_text(), 'SEMANA 5')  # el CSS lo pone en mayusculas
    comprobar('el campo concepto se vacia tras apuntar',
              pg.input_value('fc-panel-diarios input[name="concepto"]'), '')

    # --- errores del formulario
    pg.fill('fc-panel-diarios input[name="importe"]', '0')
    pg.click('fc-panel-diarios button[type="submit"]')
    pg.wait_for_timeout(200)
    comprobar('rechaza importe 0', pg.locator('fc-panel-diarios .nota--error').inner_text(),
              'El importe tiene que ser mayor que 0.')
    pg.fill('fc-panel-diarios input[name="fecha"]', '%d-03-04' % OTRO_ANIO)
    pg.fill('fc-panel-diarios input[name="importe"]', '10')
    pg.click('fc-panel-diarios button[type="submit"]')
    pg.wait_for_timeout(200)
    comprobar('rechaza fecha de otro anio', pg.locator('fc-panel-diarios .nota--error').inner_text(),
              'Esa fecha es de %d y este fichero es de %d.' % (OTRO_ANIO, ANIO_EN_CURSO))

    # --- ingresos
    ingresos = [
        (julio(25), 'Nómina', 'Nómina de julio', '1850'),
        (julio(8), 'Wallapop', 'Venta del monitor', '60'),
        (julio(12), 'BlaBlaCar', 'Madrid - Valencia', '25'),
        (julio(14), 'Bizum', 'Cena que adelanté', '18.50'),
    ]
    for fecha, origen, concepto, importe in ingresos:
        pg.fill('fc-panel-ingresos input[name="fechaIngreso"]', fecha)
        pg.select_option('fc-panel-ingresos select[name="origen"]', origen)
        pg.fill('fc-panel-ingresos input[name="conceptoIngreso"]', concepto)
        pg.fill('fc-panel-ingresos input[name="importeIngreso"]', importe)
        pg.click('fc-panel-ingresos button[type="submit"]')
        pg.wait_for_timeout(200)
    comprobar('numero de ingresos', pg.locator('fc-panel-ingresos .apunte').count(), 4)

    # --- categoria nueva
    pg.click('fc-panel-diarios .enlace')
    pg.fill('fc-panel-diarios input[name="nuevaCategoria"]', 'Farmacia')
    pg.click('fc-panel-diarios .boton--pequeno')
    pg.wait_for_timeout(300)
    opciones = pg.locator('fc-panel-diarios select[name="categoria"] option').all_inner_texts()
    comprobar('la categoria nueva aparece en el desplegable', 'Farmacia' in opciones, True)
    comprobar('la rejilla incluye la categoria nueva',
              pg.locator('fc-panel-diarios .tabla--rejilla tbody tr').count(), 5)

    # --- el sello y el balance
    pg.wait_for_timeout(400)
    comprobar('rotulo del sello', pg.locator('.sello__rotulo').inner_text(), 'AHORRADO')
    comprobar('cifra del sello', solo_numero(pg.locator('.sello__cifra').inner_text()), 787.01)
    balance = [solo_numero(t) for t in pg.locator('.balance__fila dd').all_inner_texts()]
    comprobar('balance: ingresos, diarios, fijos, total', balance, [1953.50, -251.65, -914.84, 1166.49])
    comprobar('tasa de ahorro', pg.locator('.tasa__valor').inner_text().replace('\u00a0', ' '), '40,3 %')
    pg.screenshot(path='/tmp/real-app.png', full_page=True)
    pg.locator('.tarjeta--resumen').screenshot(path='/tmp/real-sello.png')

    # --- el apartado de gasto por categoria
    filas = pg.locator('fc-panel-categorias .reparto__fila')
    comprobar('el reparto tiene una fila por categoria mas los fijos', filas.count(), 6)
    comprobar(
        'la primera fila es la categoria en la que mas se ha gastado',
        [
            filas.nth(0).locator('.reparto__nombre').inner_text().strip(),
            solo_numero(filas.nth(0).locator('.reparto__importe').inner_text())
        ],
        ['Comida', 109.35]
    )
    comprobar(
        'los fijos van en su propia fila al final',
        [
            filas.last.locator('.reparto__nombre').inner_text().strip(),
            solo_numero(filas.last.locator('.reparto__importe').inner_text())
        ],
        ['Gastos fijos', 914.84]
    )
    comprobar(
        'el total del apartado es el gasto total del mes',
        solo_numero(pg.locator('fc-panel-categorias .tarjeta__pie').first.inner_text()),
        1166.49
    )
    porcentajes = [
        float(t.replace('\u00a0', ' ').replace(' %', '').replace(',', '.'))
        for t in filas.locator('.reparto__porcentaje').all_inner_texts()
    ]
    comprobar('los porcentajes suman 100', round(sum(porcentajes)), 100)
    comprobar(
        'la barra mas larga es la de los fijos',
        pg.locator('fc-panel-categorias .reparto__barra').last.evaluate(
            'e => e.style.width'
        ),
        '100%'
    )
    # cambiar a la vista anual
    pg.click('fc-panel-categorias .periodo__opcion >> nth=1')
    pg.wait_for_timeout(400)
    comprobar(
        'la vista anual dice cuantos meses cuenta',
        'apuntes: 1' in pg.locator('fc-panel-categorias .tarjeta__pie-nota').inner_text(),
        True
    )
    comprobar(
        'con un solo mes con datos, el anual coincide con el mensual',
        solo_numero(pg.locator('fc-panel-categorias .tarjeta__pie').first.inner_text()),
        1166.49
    )
    pg.click('fc-panel-categorias .periodo__opcion >> nth=0')
    pg.wait_for_timeout(300)

    # --- la cinta de meses y el cambio de mes
    comprobar('la cinta tiene 12 meses', pg.locator('.cinta .mes').count(), 12)
    comprobar('julio esta marcado como activo',
              pg.locator('.cinta .mes--activo .mes__nombre').inner_text(), 'JUL')
    pg.click('.cinta .mes >> nth=2')  # marzo
    pg.wait_for_timeout(400)
    comprobar('al cambiar de mes cambia el titulo',
              pg.locator('.tarjeta--resumen .tarjeta__titulo').inner_text(), 'Marzo')
    comprobar('marzo sin ingresos da sobregiro', pg.locator('.sello__rotulo').inner_text(), 'EN ROJO')
    comprobar('marzo debe los fijos', solo_numero(pg.locator('.sello__cifra').inner_text()), -914.84)
    comprobar('marzo no tiene apuntes', pg.locator('fc-panel-diarios .vacio').is_visible(), True)
    comprobar(
        'en marzo el reparto es solo los fijos',
        pg.locator('fc-panel-categorias .reparto__fila--fijos .reparto__porcentaje')
        .inner_text()
        .replace('\u00a0', ' '),
        '100,0 %'
    )
    pg.locator('.tarjeta--resumen').screenshot(path='/tmp/real-sello-debe.png')
    pg.click('.cinta .mes >> nth=6')  # volver a julio
    pg.wait_for_timeout(300)

    # --- borrar un apunte
    pg.locator('fc-panel-diarios .apunte').first.hover()
    pg.locator('fc-panel-diarios .apunte__borrar').first.click()
    pg.wait_for_timeout(300)
    comprobar('queda un apunte menos', pg.locator('fc-panel-diarios .apunte').count(), 4)
    comprobar('el sello se recalcula al borrar',
              solo_numero(pg.locator('.sello__cifra').inner_text()), 849.41)

    # --- descargar el fichero
    with pg.expect_download() as espera:
        pg.click('.barra .boton--sello')
    descarga = espera.value
    comprobar(
        'nombre del fichero descargado',
        descarga.suggested_filename,
        'finanzas-%d.json' % ANIO_EN_CURSO
    )
    ruta = '/tmp/finanzas-%d.json' % ANIO_EN_CURSO
    descarga.save_as(ruta)
    datos = json.load(open(ruta, encoding='utf-8'))
    comprobar('formato del fichero', datos['formato'], 'finanzas-caseras')
    comprobar('anio del fichero', datos['anio'], ANIO_EN_CURSO)
    comprobar('meses guardados', len(datos['meses']), 12)
    comprobar('gastos de julio guardados', len(datos['meses'][6]['gastos']), 4)
    comprobar('ingresos de julio guardados', len(datos['meses'][6]['ingresos']), 4)
    comprobar('la categoria nueva se guarda', 'Farmacia' in datos['categorias'], True)
    comprobar('los fijos se guardan', len(datos['gastosFijos']), 6)
    comprobar('lleva marca de tiempo', 'actualizado' in datos, True)
    pg.wait_for_timeout(400)
    comprobar('tras descargar ya no hay cambios pendientes',
              pg.locator('.estado--sucio').count(), 0)

    # --- recargar y volver a subir el fichero
    pg.reload()
    pg.wait_for_selector('.portada__titulo')
    pg.set_input_files('.opcion input[type="file"]', ruta)
    pg.wait_for_selector('.barra')
    pg.wait_for_timeout(600)
    comprobar('al reabrir, el anio', pg.locator('.barra__anio').inner_text(), str(ANIO_EN_CURSO))
    # Al abrir, la aplicación se pone en el mes de hoy: los apuntes son de julio.
    pg.click('.cinta .mes >> nth=%d' % JULIO)
    pg.wait_for_timeout(400)
    comprobar('al reabrir, el mismo ahorro',
              solo_numero(pg.locator('.sello__cifra').inner_text()), 849.41)
    comprobar('al reabrir, los mismos apuntes', pg.locator('fc-panel-diarios .apunte').count(), 4)
    comprobar('al reabrir, los mismos fijos',
              solo_numero(pg.locator('fc-panel-fijos tfoot td').first.inner_text()), 914.84)
    comprobar('al reabrir no hay cambios pendientes', pg.locator('.estado--sucio').count(), 0)
    comprobar('el fijo pausado sigue pausado', pg.locator('fc-panel-fijos .casilla:not(:checked)').count(), 0)

    # --- fichero que no vale
    pg.click('.boton--fantasma')
    pg.wait_for_selector('.portada__titulo')
    open('/tmp/basura.json', 'w').write('{"esto":"no es un libro"}')
    pg.set_input_files('.opcion input[type="file"]', '/tmp/basura.json')
    pg.wait_for_timeout(600)
    comprobar('rechaza un fichero ajeno con mensaje',
              pg.locator('.portada__error').inner_text().startswith('Este fichero no es de Finanzas de casa'), True)
    comprobar('y se queda en la portada', pg.locator('.portada__titulo').is_visible(), True)

    # --- movil
    mv = navegador.new_page(viewport={'width': 390, 'height': 844}, locale='es-ES')
    mv.goto(URL)
    mv.wait_for_selector('.portada__titulo')
    mv.fill('.campo--anio input', str(ANIO_EN_CURSO))
    mv.click('.opcion .boton--sello')
    mv.wait_for_selector('.barra')
    mv.fill('fc-panel-diarios input[name="fecha"]', julio(3))
    mv.fill('fc-panel-diarios input[name="concepto"]', 'Repostaje')
    mv.fill('fc-panel-diarios input[name="importe"]', '62.40')
    mv.click('fc-panel-diarios button[type="submit"]')
    mv.wait_for_timeout(1500)
    mv.screenshot(path='/tmp/real-movil.png', full_page=True)
    comprobar('en movil tambien se puede apuntar', mv.locator('fc-panel-diarios .apunte').count(), 1)
    ancho_scroll = mv.evaluate('document.documentElement.scrollWidth')
    comprobar('sin scroll horizontal en movil (390px)', ancho_scroll <= 390, True)

    comprobar('sin errores en la consola del navegador', errores_consola, [])
    navegador.close()

print('\n' + ('TODO CORRECTO' if not fallos else '%d FALLOS: %s' % (len(fallos), fallos)))
