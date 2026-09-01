"""
Recorrido por los siete idiomas contra la aplicación en marcha.

    pip install playwright && python -m playwright install chromium
    npm start                       # en otra terminal
    python pruebas/e2e-idiomas.py   # usa el puerto 4300

Comprueba que la interfaz cambia de idioma en caliente, que las cifras y las
fechas se formatean con el locale correcto, que un libro nuevo nace con los
nombres en el idioma activo, y que el idioma viaja dentro del fichero JSON.
"""

import datetime
import json

from playwright.sync_api import sync_playwright

URL = 'http://localhost:4300/'
ANIO_EN_CURSO = datetime.date.today().year

# El apunte de prueba es del 3 de julio; el día de la semana depende del año, así
# que la abreviatura esperada se calcula en vez de escribirse a mano.
DIA_SEMANA = datetime.date(ANIO_EN_CURSO, 7, 3).weekday()  # 0 = lunes
DIAS_FR = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.']
DIAS_IT = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom']

fallos = []


def comprobar(nombre, real, esperado):
    if real == esperado:
        print('ok   %s -> %r' % (nombre, real))
    else:
        fallos.append(nombre)
        print('FALLO %s: %r != %r' % (nombre, real, esperado))


def sin_espacios_raros(texto):
    """Intl usa espacios duros y finos como separador de miles."""
    return texto.replace('\u00a0', ' ').replace('\u202f', ' ')


# Por idioma: marca del titular, botón de crear, nombre de julio y rótulo del sello.
ESPERADO = {
    'es': ('ningún servidor.', 'Crear el libro', 'Julio', 'Ahorrado'),
    'en': ("anyone's server.", 'Create the book', 'July', 'Saved'),
    'pt': ('nenhum servidor.', 'Criar o livro', 'Julho', 'Poupado'),
    'it': ('nessun server.', 'Crea il registro', 'Luglio', 'Risparmiato'),
    'fr': ('aucun serveur.', 'Créer le carnet', 'Juillet', 'Épargné'),
    'ru': ('ни на одном сервере.', 'Создать книгу', 'Июль', 'Отложено'),
    'de': ('keinem Server.', 'Buch anlegen', 'Juli', 'Gespart')
}

with sync_playwright() as p:
    navegador = p.chromium.launch()
    errores = []
    pg = navegador.new_page(viewport={'width': 1280, 'height': 1000}, locale='es-ES')
    pg.on('dialog', lambda d: d.accept())
    pg.on('pageerror', lambda e: errores.append(str(e)))
    pg.on('console', lambda m: errores.append(m.text) if m.type == 'error' else None)
    pg.goto(URL)
    pg.wait_for_selector('.portada__titulo')
    pg.wait_for_timeout(2500)

    comprobar(
        'arranca en espanol si el navegador pide es-ES',
        pg.locator('.portada__titulo-marca').inner_text(),
        'ningún servidor.'
    )
    comprobar('el html lleva lang', pg.evaluate('document.documentElement.lang'), 'es')

    # --- la portada en los siete idiomas
    for codigo, (marca, boton, _mes, _sello) in ESPERADO.items():
        pg.select_option('.portada .idioma__control', codigo)
        pg.wait_for_timeout(350)
        comprobar('portada en ' + codigo, pg.locator('.portada__titulo-marca').inner_text(), marca)
        comprobar(
            'boton crear en ' + codigo,
            pg.locator('.opcion .boton--sello').inner_text().strip(),
            boton
        )
        comprobar('lang del html en ' + codigo, pg.evaluate('document.documentElement.lang'), codigo)

    # --- un libro nuevo nace con los nombres en el idioma activo
    pg.select_option('.portada .idioma__control', 'de')
    pg.wait_for_timeout(300)
    pg.fill('.campo--anio input', str(ANIO_EN_CURSO))
    pg.click('.opcion .boton--sello')
    pg.wait_for_selector('.barra')
    # La aplicación abre por el mes de hoy: nos ponemos en julio para que los
    # nombres de mes que se comprueban abajo no dependan de la fecha.
    pg.click('.cinta .mes >> nth=6')
    pg.wait_for_timeout(500)
    comprobar('titulo de la barra en aleman', pg.locator('.barra__logo').inner_text(), 'Haushaltskasse')
    comprobar('mes en aleman', pg.locator('.tarjeta--resumen .tarjeta__titulo').inner_text(), 'Juli')
    comprobar(
        'categorias iniciales en aleman',
        pg.locator('fc-panel-diarios select[name="categoria"] option').all_inner_texts(),
        ['Tanken', 'Essen', 'Freizeit', 'Extras']
    )
    comprobar(
        'gastos fijos iniciales en aleman',
        pg.locator('fc-panel-fijos tbody tr td:nth-child(2) input').evaluate_all(
            'els => els.map(e => e.value)'
        ),
        ['Miete', 'Internet', 'Strom', 'Wasser', 'Fitnessstudio']
    )
    comprobar('sello en aleman', pg.locator('.sello__rotulo').inner_text(), 'GESPART')

    # --- el formato de las cifras sigue al idioma; la moneda sigue siendo el euro
    pg.locator('fc-panel-fijos tbody td.col-importe input').first.fill('1234.5')
    pg.locator('fc-panel-fijos tbody td.col-importe input').first.blur()
    pg.wait_for_timeout(400)
    comprobar(
        'formato aleman',
        sin_espacios_raros(pg.locator('fc-panel-fijos tfoot td').first.inner_text()),
        '1.234,50 €'
    )
    pg.select_option('.barra .idioma__control', 'en')
    pg.wait_for_timeout(400)
    comprobar(
        'formato ingles',
        sin_espacios_raros(pg.locator('fc-panel-fijos tfoot td').first.inner_text()),
        '€1,234.50'
    )
    comprobar(
        'el mes pasa a ingles',
        pg.locator('.tarjeta--resumen .tarjeta__titulo').inner_text(),
        'July'
    )
    comprobar(
        'la cinta pasa a ingles',
        pg.locator('.cinta .mes--activo .mes__nombre').inner_text(),
        'JUL'
    )
    pg.select_option('.barra .idioma__control', 'ru')
    pg.wait_for_timeout(400)
    comprobar(
        'formato ruso',
        sin_espacios_raros(pg.locator('fc-panel-fijos tfoot td').first.inner_text()),
        '1 234,50 €'
    )
    comprobar('mes en ruso', pg.locator('.tarjeta--resumen .tarjeta__titulo').inner_text(), 'Июль')

    # --- fechas y semanas
    pg.select_option('.barra .idioma__control', 'fr')
    pg.wait_for_timeout(300)
    pg.fill('fc-panel-diarios input[name="fecha"]', '%d-07-03' % ANIO_EN_CURSO)
    pg.fill('fc-panel-diarios input[name="concepto"]', 'Essence')
    pg.fill('fc-panel-diarios input[name="importe"]', '62.40')
    pg.click('fc-panel-diarios button[type="submit"]')
    pg.wait_for_timeout(400)
    comprobar(
        'fecha en frances',
        pg.locator('.apunte__fecha').first.inner_text(),
        '%s 3 juil.' % DIAS_FR[DIA_SEMANA]
    )
    comprobar('semana en frances', pg.locator('.semana__nombre').first.inner_text(), 'SEMAINE 1')
    pg.select_option('.barra .idioma__control', 'it')
    pg.wait_for_timeout(300)
    comprobar(
        'fecha en italiano',
        pg.locator('.apunte__fecha').first.inner_text(),
        '%s 3 lug' % DIAS_IT[DIA_SEMANA]
    )
    comprobar('semana en italiano', pg.locator('.semana__nombre').first.inner_text(), 'SETTIMANA 1')

    # --- los errores del formulario también se traducen
    pg.fill('fc-panel-diarios input[name="importe"]', '0')
    pg.click('fc-panel-diarios button[type="submit"]')
    pg.wait_for_timeout(300)
    comprobar(
        'error en italiano',
        pg.locator('fc-panel-diarios .nota--error').inner_text(),
        'L\u2019importo deve essere maggiore di 0.'
    )

    # --- el idioma viaja dentro del fichero
    with pg.expect_download() as espera:
        pg.click('.barra .boton--sello')
    ruta = '/tmp/finanzas-idiomas.json'
    espera.value.save_as(ruta)
    datos = json.load(open(ruta, encoding='utf-8'))
    comprobar('el fichero guarda el idioma activo', datos['idioma'], 'it')
    comprobar('el fichero guarda las categorias en aleman', datos['categorias'][0], 'Tanken')
    comprobar('el fichero guarda categoriasFijos', datos['categoriasFijos'][0], 'Wohnen')

    pg.select_option('.barra .idioma__control', 'es')
    pg.wait_for_timeout(300)
    pg.click('.boton--fantasma')
    pg.wait_for_selector('.portada__titulo')
    comprobar(
        'la portada esta en espanol antes de abrir',
        pg.locator('.portada__titulo-marca').inner_text(),
        'ningún servidor.'
    )
    pg.set_input_files('.opcion input[type="file"]', ruta)
    pg.wait_for_selector('.barra')
    pg.wait_for_timeout(600)
    comprobar(
        'al abrir el fichero vuelve al italiano',
        pg.locator('.barra__logo').inner_text(),
        'Conti di casa'
    )
    comprobar(
        'las categorias siguen en aleman: son datos del usuario',
        pg.locator('fc-panel-diarios select[name="categoria"] option').all_inner_texts(),
        ['Tanken', 'Essen', 'Freizeit', 'Extras']
    )
    comprobar(
        'el importe se conserva',
        sin_espacios_raros(pg.locator('fc-panel-fijos tfoot td').first.inner_text()),
        '1.234,50 €'
    )

    # --- los errores de lectura salen en el idioma de la interfaz
    pg.click('.boton--fantasma')
    pg.wait_for_selector('.portada__titulo')
    pg.select_option('.portada .idioma__control', 'pt')
    pg.wait_for_timeout(300)
    with open('/tmp/basura.json', 'w') as f:
        f.write('{"esto":"no es un libro"}')
    pg.set_input_files('.opcion input[type="file"]', '/tmp/basura.json')
    pg.wait_for_timeout(600)
    comprobar(
        'error de fichero en portugues',
        pg.locator('.portada__error').inner_text().startswith('Este ficheiro não é do Contas de casa'),
        True
    )

    comprobar('sin errores en la consola del navegador', errores, [])
    navegador.close()

print('\n' + ('TODO CORRECTO' if not fallos else '%d FALLOS: %s' % (len(fallos), fallos)))
