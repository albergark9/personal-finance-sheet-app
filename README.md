# Finanzas de casa

Control de gastos e ingresos domésticos en **Angular 13**, sin backend y sin base de datos.
Los datos viven en un fichero JSON que tú subes, editas desde la aplicación y vuelves a
descargar. **Un fichero por año.**

Disponible en **español, inglés, portugués, italiano, francés, ruso y alemán**, con selector
en la propia interfaz.

Es la misma lógica que la hoja de Excel: gastos del día por categoría y semana, gastos fijos
aparte, ingresos por origen y, al final del mes, ingresos − gastos = ahorro.

---

## Arrancar

```bash
npm install
npm start          # http://localhost:4200
```

### Sobre la versión de Node

Comprobado de verdad, compilando y manejando la aplicación en un navegador, con
**Node 16.20.2** y con **Node 18.10.0**: `npm install`, `ng build`, `ng serve` y las dos suites
de pruebas de extremo a extremo pasan en las dos.

- Con **Node 16** no hay nada que decir: es una de las versiones que Angular 13 soporta
  oficialmente.
- Con **Node 18**, `ng version` imprime `Node: 18.10.0 (Unsupported)`. Es solo una etiqueta
  informativa: el CLI de Angular 13 comprueba las versiones que conocía en su día y no bloquea
  las posteriores. El campo `engines` del `package.json` incluye `^18.10.0`, así que `npm install`
  tampoco avisa.

**No hace falta `--openssl-legacy-provider`.** Ese apaño se necesita en versiones de Angular con
webpack más antiguo, que calculaba los hashes con MD4: OpenSSL 3 (el que trae Node 17+) lo
retiró y el build moría con `ERR_OSSL_EVP_UNSUPPORTED`. Angular 13.3 ya no usa MD4. Si algún día
te topas con ese error tras cambiar de versión, la salida de emergencia es:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

Otros comandos:

```bash
npm run build      # compila a dist/finanzas-caseras
npm run comprobar  # ejecuta las comprobaciones de los cálculos
```

`npm run comprobar` valida las cuentas contra los mismos números de la hoja de Excel
(220,45 € de gastos diarios, 914,84 € de fijos, 1.953,50 € de ingresos, 818,21 € de ahorro),
más el ida y vuelta por el fichero JSON y el rechazo de ficheros corruptos.

---

## Cómo se usa

Al abrir la aplicación no hay datos. Dos caminos:

- **Empezar un año** — crea un libro vacío para el año que elijas, con las cuatro categorías
  (gasolina, comida, ocio, extras), los orígenes de ingreso habituales y los gastos fijos
  típicos a 0 € para que solo haya que poner el importe.
- **Abrir un fichero** — eliges tu `finanzas-2026.json` y sigues donde lo dejaste.

A partir de ahí:

La pantalla está partida en dos: a la izquierda se apunta, a la derecha se lee.

| Zona | Qué hace |
| --- | --- |
| Barra de arriba | Año, estado de los cambios, selector de idioma y el botón de descargar. |
| Cinta de meses | Los 12 meses con una barrita proporcional al gasto de cada uno. Pincha para cambiar de mes. |
| Gastos del día | Formulario de apunte rápido, rejilla de categorías × semanas y lista de apuntes agrupada por semana. |
| Ingresos | Nómina, Wallapop, BlaBlaCar, Bizum, devoluciones… con desglose por origen. |
| Gastos fijos | Se definen una vez para todo el año y cuentan en cada mes. Se editan en la propia tabla. La casilla *Cuenta* los pausa sin borrarlos. |
| Resumen del mes | El sello con el ahorro, el balance y la tasa de ahorro. |
| Gasto por categoría | Cuánto se ha ido en cada categoría, ordenado de más a menos, con su porcentaje y una barra. Se puede mirar el mes abierto o el año entero. |
| El año en curso | Los 12 meses en tabla, con el total del año. |

**Nada se guarda solo.** El indicador de la barra dice si hay cambios sin descargar, y el
navegador avisa si intentas cerrar la pestaña con cambios pendientes. Para guardar: *Descargar
finanzas-AAAA.json* y sustituye el fichero anterior.

### Idiomas

El selector está arriba a la derecha, tanto en la portada como en la barra. Cambia la interfaz
al momento, sin recargar: los siete idiomas van en el mismo bundle.

| Idioma | Locale de formato | Ejemplo |
| --- | --- | --- |
| Español | es-ES | 1.234,50 € · vie 3 jul |
| English | en-IE | €1,234.50 · Fri 3 Jul |
| Português | pt-PT | 1234,50 € · sex., 3 de jul. |
| Italiano | it-IT | 1.234,50 € · ven 3 lug |
| Français | fr-FR | 1 234,50 € · ven. 3 juil. |
| Русский | ru-RU | 1 234,50 € · пт, 3 июл. |
| Deutsch | de-DE | 1.234,50 € · Fr., 3. Juli |

Cómo se elige:

1. La primera vez, el idioma que pida el navegador (`navigator.languages`). Solo se miran las
   dos primeras letras, así que `pt-BR` abre en portugués y `de-AT` en alemán. Si no hay ninguno
   de los siete, español.
2. Al abrir un fichero, el idioma que ese fichero recuerde (campo `idioma`).
3. Lo que elijas en el selector, que se guarda en el fichero la próxima vez que lo descargues.

**La moneda es siempre el euro.** Lo que cambia con el idioma es cómo se escriben las cifras y
las fechas, no la divisa: no hay conversión de monedas en ninguna parte.

**Los nombres de tus categorías no se traducen.** «Gasolina», «Comida» o «Alquiler» son datos
tuyos y viven dentro del fichero, así que se quedan como los escribiste. Lo que sí pasa es que
un libro **nuevo** nace con los nombres en el idioma que tengas puesto al crearlo: si creas un
libro en alemán, las categorías son Tanken, Essen, Freizeit y Extras. Si luego cambias la
interfaz a francés, esas categorías siguen en alemán — son las tuyas. Puedes renombrarlas en la
tabla de gastos fijos, o añadir las que quieras con «+ Nueva categoría».

### Gasto por categoría

El apartado que responde a «¿dónde se me va?». Cada categoría con su suma, su porcentaje y una
barra, de más gastado a menos, y un botón para cambiar entre **este mes** y **todo el año**.

Tres decisiones que conviene conocer, porque cambian lo que dicen los números:

- **Los gastos fijos entran como una fila más**, separada por una línea de puntos y en gris.
  Así el porcentaje es sobre todo lo que has gastado, no solo sobre el día a día: si el alquiler
  se lleva el 78 %, se ve. Si solo se repartiera el gasto diario, «Comida 45 %» sonaría a mucho
  cuando en realidad son cuatro duros al lado del recibo del piso.
- **Las barras están a la misma escala**, proporcionales a la fila más alta. Cuando los fijos
  dominan, las barras del día a día quedan cortas — que es exactamente lo que pasa en la
  realidad. Para comparar entre sí las categorías del día a día, mira los porcentajes, que son
  precisos.
- **En la vista anual los fijos cuentan una vez por cada mes con apuntes**, no doce. Un año que
  llevas por marzo no arrastra el alquiler de todo el año. El pie del apartado dice cuántos
  meses se han contado.

Una categoría sin gastos no desaparece: se queda en gris al final con una raya, para que veas
también en qué no has gastado.

### Semanas

Igual que en el Excel: semana 1 = días 1-7, semana 2 = 8-14, semana 3 = 15-21,
semana 4 = 22-28, semana 5 = 29-31.

---

## El fichero JSON

```json
{
  "formato": "finanzas-caseras",
  "version": 1,
  "anio": 2026,
  "idioma": "es",
  "categorias": ["Gasolina", "Comida", "Ocio", "Extras"],
  "origenes": ["Nómina", "Wallapop", "BlaBlaCar", "Bizum", "Devoluciones", "Otros"],
  "categoriasFijos": ["Vivienda", "Suministros", "Suscripciones", "Salud y deporte"],
  "gastosFijos": [
    {
      "id": "l3k9a2b1",
      "concepto": "Alquiler",
      "categoria": "Vivienda",
      "importe": 750,
      "diaCargo": 1,
      "activo": true
    }
  ],
  "meses": [
    {
      "mes": 7,
      "gastos": [
        {
          "id": "l3k9c4d2",
          "fecha": "2026-07-03",
          "categoria": "Gasolina",
          "concepto": "Repostaje Repsol",
          "importe": 62.4
        }
      ],
      "ingresos": [
        {
          "id": "l3k9e6f3",
          "fecha": "2026-07-25",
          "origen": "Nómina",
          "concepto": "Nómina de julio",
          "importe": 1850
        }
      ]
    }
  ],
  "actualizado": "2026-07-30T10:12:00.000Z"
}
```

Reglas al abrir un fichero:

- `formato` y `anio` son obligatorios; sin ellos el fichero se rechaza con un mensaje concreto.
- Un fichero de una versión mayor que la de la aplicación se rechaza en vez de abrirse a medias.
- Se arreglan sin preguntar: importes escritos como `"12,50"`, ids repetidos o ausentes, meses
  que faltan (se crean los 12), categorías u orígenes vacíos (se ponen los del idioma activo).
- `idioma` y `categoriasFijos` son opcionales: un fichero anterior a que existieran se abre sin
  problema. La lista de categorías de gastos fijos se reconstruye con las que usen los propios
  gastos fijos del fichero, así que el desplegable nunca pierde un valor que esté en los datos.
- Se descarta y se avisa: cualquier línea sin importe válido o cuya fecha no cuadre con su año y
  su mes.
- Un apunte con una categoría que ya no existe en el libro no se pierde: aparece agrupado bajo
  *Sin categoría*.

---

## Estructura

```
src/
  index.html                  fuentes y raíz <fc-raiz>
  styles.scss                 TODO el diseño (los componentes no llevan estilos propios)
  app/
    app.module.ts             NgModule único (Angular 13, sin standalone)
    app.component.*           orquesta barra, cinta y paneles; aviso al cerrar pestaña
    i18n/
      es.ts                   diccionario español: define el juego de claves
      en.ts pt.ts it.ts       … y los demás idiomas, tipados como Textos
      fr.ts ru.ts de.ts
      idiomas.ts              catálogo de idiomas, locales y detección
    modelos/
      libro.modelo.ts         estructura del JSON y creación de un libro nuevo
      resumen.modelo.ts       tipos de los cálculos
      nota.modelo.ts          mensajes de la interfaz
    servicios/
      libro.service.ts        estado en memoria (BehaviorSubject) y mutaciones
      traduccion.service.ts   idioma activo, traducción y formato con Intl
      libro-json.ts           validar, normalizar y serializar el fichero (sin Angular)
      archivo.service.ts      lo que necesita navegador: FileReader y la descarga
      calculos.ts             funciones puras: semanas, resumen mensual y anual
    componentes/              barra, cinta de meses, portada, selector de idioma
                              y los cinco paneles (diarios, fijos, ingresos,
                              resumen del mes, gasto por categoría y el año)
    pipes/                    t, euros, fechaCorta, porcentaje, mes
pruebas/prueba.ts             comprobaciones de los cálculos y del fichero (node)
pruebas/e2e.py                recorrido completo por el navegador (playwright)
pruebas/e2e-idiomas.py        los siete idiomas en el navegador
capturas/                     cómo se ve: español, inglés, alemán, ruso y móvil
```

### Comprobaciones

`npm run comprobar` (Node, sin navegador) valida los cálculos, el manejo del fichero y los
siete diccionarios: los mismos números de la hoja de Excel, el ida y vuelta por el JSON, y que
cada idioma tenga exactamente las mismas claves, sin ninguna vacía, con los `{parámetros}`
intactos y sin textos largos que se hayan quedado en español. Funciona en cualquier Node porque
`libro-json.ts`, `calculos.ts` y los diccionarios no importan nada de Angular. Son 105
comprobaciones.

`pruebas/e2e.py` recorre la aplicación de verdad en un navegador: crea un libro, mete gastos
fijos, apuntes e ingresos, comprueba el sello y el balance, cambia de mes, borra un apunte,
descarga el JSON, lo vuelve a subir y verifica que los números sobreviven, rechaza un fichero
ajeno y repite lo esencial a 390 px de ancho. Son 58 comprobaciones.

`pruebas/e2e-idiomas.py` hace lo propio con los idiomas: los textos de la portada en los siete,
el cambio en caliente, el formato de cifras y fechas de cada locale, un libro nuevo creado en
alemán, los errores traducidos y el idioma viajando dentro del fichero. Otras 48.

Ninguna de las dos depende de la fecha en que se ejecuten: el año y el mes de hoy se calculan,
y la prueba se coloca en julio antes de comprobar los nombres de mes.

Las dos necesitan el servidor en marcha y playwright:

```bash
pip install playwright && python -m playwright install chromium
npm start                        # en otra terminal
python pruebas/e2e.py            # usa el puerto 4300; cámbialo en la constante URL
python pruebas/e2e-idiomas.py
```

Decisiones que conviene conocer si lo tocas:

- **La traducción es en tiempo de ejecución, no con el i18n de Angular.** El i18n oficial
  (`@angular/localize`, atributos `i18n`, ficheros XLF) compila un bundle por idioma y los sirve
  en rutas distintas: no permite cambiar de idioma sin recargar y obligaría a compilar y
  desplegar siete veces. Aquí hay un diccionario por idioma, un `TraduccionService` con el
  idioma activo y un pipe `t`. El precio es que los pipes son **impuros** (`pure: false`): un
  pipe puro no se recalcularía al cambiar de idioma, porque sus entradas no cambian. Recalcular
  es barato porque es una búsqueda en un objeto y los formateadores de `Intl` están cacheados
  por locale.
- **El diccionario español define el juego de claves.** `type Textos = Record<ClaveTexto, string>`
  hace que a los demás idiomas no les pueda faltar ni sobrar ninguna clave, y que una clave mal
  escrita en una plantilla sea un error de compilación, no un hueco en blanco en pantalla.
- **La lógica no depende del framework.** Los cálculos (`calculos.ts`) y el formato del fichero
  (`libro-json.ts`) son funciones puras sin `import` de Angular; el servicio inyectable es solo
  la cáscara que habla con `FileReader` y con la descarga. Por eso se pueden probar con `node`.
- **Los cálculos son funciones puras** en `calculos.ts`, separadas del estado. Nada calculado se
  guarda en el JSON: se recalcula siempre al leerlo.
- **Los importes se redondean a dos decimales** en cada suma para que no se acumulen restos de
  coma flotante (0,1 + 0,2).
- **En la vista mensual los gastos fijos cuentan siempre**; en la tabla del año solo cuentan en
  los meses que tienen algún apunte, para que un mes que aún no has empezado no aparezca en
  pérdidas.
- **Los gastos fijos se editan en la propia tabla.** Mientras escribes un importe el navegador
  manda `null` en estados intermedios (`12,`): se ignoran para no pisar el campo a medio teclear.
- **Los elementos `fc-*` llevan `display: block; min-width: 0`** en `styles.scss`. Los hosts de
  componente de Angular son `display: inline` de serie y, como ítems de un grid, no se encogen
  por debajo del ancho de su contenido: sin esa regla la página tenía scroll horizontal en móvil.
- El estado es un `BehaviorSubject<LibroAnual | null>` y cada cambio emite un objeto nuevo, así
  que los paneles se enteran por `ngOnChanges` sin necesidad de `OnPush` ni de suscripciones
  repartidas.
