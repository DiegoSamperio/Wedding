# Sistema de diseño — Daniela & Rodrigo

## 1. Propósito

Este documento define la dirección visual y de interacción para la página de boda de **Daniela Samperio Arce** y **Rodrigo Hevia Ibarrarán**.

La experiencia debe sentirse como una invitación impresa de alta gama: romántica, clásica, editorial, cálida y cuidadosamente compuesta. La interfaz prioriza ritmo, papel, aire y detalles sutiles sobre convenciones de una landing page tecnológica. Debe funcionar primero en móvil y conservar una composición más editorial en pantallas amplias.

**Datos del evento**

- Pareja: Daniela Samperio Arce y Rodrigo Hevia Ibarrarán
- Monograma: D & R
- Fecha: 20 de marzo de 2027
- Lugar: Piedra Alta, Morelos

## 2. Principios visuales

1. **Papel antes que pantalla.** El fondo, las líneas y los bloques deben recordar una papelería fina, no una interfaz plana o brillante.
2. **Elegancia silenciosa.** Usar el dorado y los ornamentos como acentos; nunca como decoración dominante.
3. **Composición editorial.** Combinar títulos amplios, bloques de lectura angostos, mucho espacio negativo y jerarquía tipográfica clara.
4. **Romance con contención.** Las flores, acuarelas y fotografías apoyan la historia sin competir con el contenido.
5. **Función sin fricción.** RSVP, ubicación y datos del evento deben ser inmediatamente claros, especialmente en móvil.

## 3. Fundamentos de marca

### Voz editorial

El tono es cálido, íntimo y ceremonial. Usar frases breves, cuidadas y personales. Preferir "Nos hará muy felices celebrar contigo" a mensajes genéricos o comerciales. Los textos de acción deben ser directos y amables: "Confirmar asistencia", "Ver ubicación" y "Sugerir canción".

### Monograma

`D & R` es el sello de la celebración. Se usa como apertura del hero, cierre, separador de secciones especiales y posible sello del menú móvil. Debe ir en **Cinzel Decorative**, con espacio generoso alrededor. No convertirlo en un logotipo pesado ni repetirlo en cada bloque.

### Motivos ornamentales

- Líneas de 1 px en taupe o dorado tenue.
- Pequeños motivos botánicos, trazos en acuarela o flores prensadas como acentos de borde.
- Separadores sugeridos: `D & R`, una pequeña rama botánica o tres puntos dorados discretos.
- Los ornamentos nunca deben reducir legibilidad ni formar fondos cargados.

## 4. Tipografía

Las fuentes se cargan localmente. No sustituir la jerarquía por una sans serif moderna; las fuentes de sistema solo son fallback.

### Familias y usos

| Familia | Uso | Reglas |
| --- | --- | --- |
| **The Seasons** | Hero, nombres, títulos principales, frases editoriales, hitos | Es la voz principal. Usar tamaños grandes, interlineado compacto y pocas líneas. |
| **Cinzel Decorative** | Monograma, iniciales y detalles ornamentales | Reservar para elementos cortos. Nunca usar en párrafos, formularios o navegación. |
| **Cinzel** | Navegación, etiquetas, botones, horarios, subtítulos y texto corto | Preferir versalitas o mayúsculas con tracking moderado para UI. Mantener tamaños legibles. |

### Carga local y tokens

Guardar los archivos de fuente en:

```text
/public/fonts/the-seasons/
/public/fonts/cinzel/
/public/fonts/cinzel-decorative/
```

```css
@font-face {
  font-family: "The Seasons";
  src: url("/fonts/the-seasons/TheSeasons-Regular.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "Cinzel";
  src: url("/fonts/cinzel/Cinzel-Variable.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "Cinzel Decorative";
  src: url("/fonts/cinzel-decorative/CinzelDecorative-Regular.woff2") format("woff2");
  font-display: swap;
}

:root {
  --font-display: "The Seasons", "Cormorant Garamond", serif;
  --font-decorative: "Cinzel Decorative", "Cinzel", serif;
  --font-serif: "Cinzel", "Cormorant Garamond", serif;
  --font-body: "Cinzel", Georgia, serif;
}
```

> Ajustar los nombres de archivo a los archivos reales. Mantener `font-display: swap` para que el contenido sea visible mientras cargan las fuentes.

### Escala sugerida

| Rol | Móvil | Desktop | Tratamiento |
| --- | ---: | ---: | --- |
| Nombre / hero | `clamp(3rem, 12vw, 7.5rem)` | incluido | The Seasons, peso regular, `line-height: .94` |
| H1 de sección | `clamp(2.25rem, 8vw, 4.75rem)` | incluido | The Seasons, `line-height: 1` |
| H2 / frase | `1.75rem` | `2.5rem` | The Seasons, aire editorial |
| Monograma | `2rem` | `3rem` | Cinzel Decorative |
| UI / etiqueta | `.7rem–.82rem` | `.72rem–.9rem` | Cinzel, mayúsculas, `letter-spacing: .12em` |
| Texto informativo | `.92rem–1rem` | `1rem` | Cinzel, `line-height: 1.75` |

No usar bloques extensos en mayúsculas. En botones y navegación, el tracking debe mantenerse entre `.08em` y `.16em`; más espaciado dificulta la lectura en móvil.

## 5. Color

### Tokens

```css
:root {
  /* Neutrales / papel */
  --paper-50: #F9F7F4;
  --paper-100: #F4F1EC;
  --paper-200: #EAE6DE;
  --taupe-300: #D1C4B0;
  --taupe-500: #AB9280;
  --brown-900: #4E342A;

  /* Amarillos / champagne */
  --champagne-50: #FFFDEF;
  --champagne-100: #FEF8D6;
  --champagne-200: #FEF3AE;
  --champagne-300: #F8E687;
  --gold-400: #EFD36A;
  --gold-600: #E0C153;

  /* Verdes */
  --sage-50: #E9EBE3;
  --sage-100: #D9E0CB;
  --sage-200: #BECBA7;
  --olive-400: #9AA881;
  --olive-600: #8CA06B;
  --olive-800: #77865C;

  --color-page: var(--paper-50);
  --color-surface: rgba(255, 253, 239, 0.72);
  --color-text: var(--brown-900);
  --color-muted: var(--taupe-500);
  --color-line: rgba(171, 146, 128, 0.22);
  --color-accent: var(--gold-600);
  --color-nature: var(--olive-800);
}
```

### Aplicación

- Fondo principal: `--paper-50`.
- Alternar secciones con `--paper-100`, o con un lavado muy tenue de `--sage-50`; evitar cambios de color bruscos.
- Texto principal: `--brown-900`. No usar negro puro.
- Texto secundario y metadatos: `--taupe-500`, validando contraste sobre el fondo utilizado.
- Dorado: solo en líneas, iconos, foco, bordes o microdetalles. No como fondo de bloques de texto largos.
- Verde olivo: para enlaces de ubicación, iconos naturales y un botón secundario; no convertirlo en un segundo color dominante.
- Cards: `rgba(255, 253, 239, 0.72)` con `1px solid rgba(171, 146, 128, 0.22)`.

## 6. Papel y profundidad

La textura debe percibirse al observar, no imponerse a primera vista. No usar imágenes de grano fotográfico pesado, ruido contrastado ni filtros que afecten los textos.

```css
body {
  min-height: 100%;
  background: var(--paper-50);
  color: var(--color-text);
}

body::before {
  position: fixed;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  content: "";
  opacity: 0.18;
  background:
    radial-gradient(ellipse at 16% 12%, rgba(255, 255, 255, .8), transparent 42%),
    radial-gradient(ellipse at 78% 34%, rgba(224, 193, 83, .07), transparent 38%),
    repeating-linear-gradient(7deg, rgba(78, 52, 42, .025) 0 1px, transparent 1px 7px),
    repeating-linear-gradient(96deg, rgba(255, 255, 255, .38) 0 1px, transparent 1px 13px);
}

.paper-texture {
  background-color: var(--paper-100);
  background-image:
    radial-gradient(circle at top right, rgba(255, 253, 239, .9), transparent 35%),
    linear-gradient(120deg, rgba(171, 146, 128, .045), transparent 45%);
}
```

Mantener la opacidad total de cualquier capa de textura en `0.25` o menos. Las tarjetas pueden tener un `backdrop-filter: blur(3px)` si no compromete rendimiento ni legibilidad; no usar sombras duras. La profundidad proviene de borde, contraste suave y capas de papel.

## 7. Layout, retícula y espaciado

### Contenedores

```css
:root {
  --content-max: 76rem;
  --reading-max: 42rem;
  --gutter: clamp(1.25rem, 5vw, 5rem);
  --section-y: clamp(5rem, 12vw, 10rem);
  --radius-sm: .75rem;
  --radius-md: 1.25rem;
  --radius-lg: 2rem;
}

.section {
  padding: var(--section-y) var(--gutter);
}

.section__inner {
  width: min(100%, var(--content-max));
  margin-inline: auto;
}
```

- Mobile: una columna, prioridad a lectura y controles táctiles.
- Desktop: retícula de 12 columnas con composiciones descentradas, dos columnas o asimetrías moderadas.
- Usar `max-width` de lectura para párrafos, aunque la sección sea amplia.
- Dejar espacios de `2–4rem` entre encabezado de sección y contenido; no compactar la página.
- Bordes redondeados suaves: entre `12px` y `32px`. Evitar cápsulas excesivas.

## 8. Navegación y comportamiento global

La navegación debe ser discreta, clara y fácil de cerrar en móvil.

- Desktop: barra superior de fondo papel semitransparente, con enlaces `Nuestra historia`, `Itinerario`, `Galería`, `RSVP`, `Ubicación`, `Regalos`.
- Móvil: botón de menú accesible con panel a pantalla completa o lateral, enlaces grandes y botón de RSVP visible.
- La navegación puede usar un fondo con blur ligero al hacer scroll, borde inferior muy tenue y altura compacta.
- La CTA persistente solo se recomienda en móvil si no oculta contenido: un botón inferior de "Confirmar asistencia" con área táctil de al menos `44 × 44px`.
- Incluir un enlace "Saltar al contenido" visible al recibir foco de teclado.

## 9. Componentes principales

### 9.1 Hero

**Objetivo:** abrir con emoción y orientación inmediata.

Composición sugerida:

1. Monograma `D & R` en Cinzel Decorative.
2. Nombres completos en The Seasons, con separación editorial entre ambos nombres.
3. Fecha: `20 de marzo de 2027`.
4. Lugar: `Piedra Alta · Morelos`.
5. Cuenta regresiva clara y breve.
6. CTA primaria: `Confirmar asistencia`.

El hero debe medir al menos `min(100svh, 58rem)` en móvil y cerca de pantalla completa en desktop. Puede incorporar una foto muy desaturada o una acuarela de baja opacidad detrás del contenido, siempre con una capa crema que preserve contraste. No usar carruseles automáticos ni video de fondo.

**Cuenta regresiva:** presentar cuatro unidades — Días, Horas, Minutos, Segundos — en una fila flexible. Usar números claros, etiquetas pequeñas y separadores finos; anunciar cambios sin generar ruido para lectores de pantalla.

### 9.2 Separador editorial

Usar entre secciones de historia, ceremonia y cierre. Puede contener una línea, el monograma o una ilustración botánica tenue. El separador debe ocupar poco alto visual y dejar aire antes y después.

### 9.3 Timeline de la historia

Título sugerido: **Nuestra historia**.

- Móvil: línea vertical izquierda, fecha arriba y card debajo; lectura cronológica sin alternar lado.
- Desktop: hitos alternados a ambos lados de una línea central, manteniendo orden visual de arriba hacia abajo.
- Hitos: `2019`, `2020–2026`, `La propuesta`, `Hoy`.
- Cards de papel con borde fino, fotografía opcional y texto breve. No usar tarjetas con sombra flotante.
- Conectar cada hito con un pequeño punto dorado o verde olivo; los años pueden ir en Cinzel y las frases en The Seasons.

### 9.4 Galerías

Título sugerido: **Momentos que nos trajeron hasta aquí**.

- Categorías: `Propuesta`, `Pedida`, `Fiesta de Compromiso`.
- Grid editorial: mezclar imágenes verticales, horizontales y una imagen protagonista. No forzar todas a la misma proporción.
- Cada imagen usa `object-fit: cover`, radio suave y un borde claro.
- Hover de desktop: escala máxima `1.02`, desplazamiento de `2–4px` y overlay crema de baja opacidad. Respetar `prefers-reduced-motion`.
- Al abrir, usar diálogo accesible con foto ampliada, texto alternativo y cierre por teclado.

### 9.5 Itinerario del día

Título sugerido: **El día de nuestra boda**.

Diseño de timeline sobrio: cada hora alineada en una columna estrecha y el evento en una columna amplia. En desktop puede incluir una línea central; en móvil, una línea lateral.

| Hora | Momento |
| --- | --- |
| 13:30 | Recepción de invitados |
| 14:00 | Ceremonia |
| 15:00 | Cóctel |
| 16:00 | Cena |
| 17:30 | Nuestro primer baile |
| 18:00 | Fiesta |
| 02:00 | Ever After |

Usar iconos lineales discretos solo si aclaran el momento. Cada icono requiere una etiqueta accesible; no depender del icono para comunicar el texto.

### 9.6 FAQ y tips

Usar un acordeón nativo o botones que controlen paneles con `aria-expanded`, borde inferior fino y estados de foco evidentes. En desktop se puede usar una cuadrícula de cards si el contenido es muy breve, pero el acordeón conserva mejor la lectura en móvil.

Contenido inicial:

- **Estacionamiento:** habrá estacionamiento y valet sin costo.
- **Dress code:** formal. Mujeres: vestido largo. Hombres: traje; corbata opcional. No tenis.
- **Al aire libre:** la celebración será al aire libre; considerar clima y calzado adecuado.
- **Solo adultos:** la celebración será solo para adultos.
- **Alimentos:** indicar restricciones alimenticias en el formulario RSVP.

### 9.7 Ceremonia y personas especiales

Título exacto: **Conoce a quienes harán especial nuestra ceremonia**.

Preparar una grilla adaptable para ilustraciones en acuarela, no fotografías obligatorias. Cada grupo contiene: ilustración, nombre del grupo, nombres de personas y una frase breve.

| Grupo | Frase sugerida |
| --- | --- |
| Papás | Quienes nos enseñaron a celebrar el amor todos los días. |
| Padrinos | Guías y cómplices de este nuevo comienzo. |
| Testigos | Presentes en cada historia que nos trajo hasta aquí. |
| Damas de honor | Amigas que llenan este día de alegría y cariño. |
| Groomsmen | Amigos que han acompañado cada paso del camino. |

Las acuarelas deben tener fondo transparente o fundirse con el papel. Usar un marco suave y alturas consistentes; no convertir los retratos en avatares de aplicación.

### 9.8 RSVP

Esta es la sección de mayor prioridad funcional. Debe estar disponible desde el hero, la navegación y al menos una vez cerca del final.

**Campos requeridos**

1. Confirmación de asistencia (`Sí, con gusto` / `No podré acompañarlos`).
2. Número de asistentes: permitir solo `1` o `2`, según boletos otorgados.
3. Restricciones alimenticias.
4. Mensaje opcional.
5. Código de invitación, opcional y preparado para activarse si se controla el acceso.

**Reglas de interacción**

- Pedir nombre o código antes de mostrar el límite de asistentes, si el sistema de invitaciones lo requiere.
- Si la respuesta es negativa, ocultar o deshabilitar de forma semántica los campos de asistentes y alimentos.
- Usar `fieldset` y `legend` para la confirmación; no usar solo tarjetas visuales sin radios funcionales.
- El selector de asistentes debe explicar el máximo autorizado y validar en línea.
- Mostrar error junto al campo, con texto específico y no solo color.
- Tras guardar, confirmar claramente el resultado y explicar cómo cambiar la respuesta si es posible.
- El botón principal: `Enviar confirmación`. Deshabilitar solo durante envío; conservar texto visible de estado.

### 9.9 Canciones

Título exacto: **La canción que te hará bailar**.

Formulario corto con `Canción`, `Artista` y botón `Enviar sugerencia`. Guardar las sugerencias en el backend o servicio configurado; mostrar estado de guardado y errores. No prometer que todas las canciones se reproducirán.

### 9.10 Ubicación y hospedaje

La información práctica debe ser escaneable, no escondida en una imagen.

- Croquis ilustrado como complemento, con texto alternativo; nunca como única fuente de dirección.
- Dirección escrita completa y copiable.
- CTA primaria de navegación: `Abrir en Waze`.
- CTA secundaria: `Abrir en Google Maps`.
- Mapa embebido o mapa estático con enlace accesible de respaldo.
- Lista de hoteles con nombre, distancia, precio aproximado y enlace externo claramente identificado.
- Bloque de Airbnb recomendado y transporte sugerido.

En móvil, apilar los botones de navegación con ancho completo. Los links externos deben indicar que abren otra aplicación o pestaña cuando corresponda.

### 9.11 Mesa de regalos

Abrir con este texto:

> Nuestro mejor regalo es que nos acompañen en este día tan especial. Si además desean tener un detalle con nosotros, les compartimos algunas opciones con mucho cariño.

Presentar tres opciones equivalentes en cards sobrias: **Liverpool**, **Palacio** y **Cuenta de banco**. Cada card debe tener datos esenciales, un botón claro y una alternativa para copiar número de cuenta/CLABE cuando aplique. Tratar la información bancaria como texto seleccionable; evitar mostrarla exclusivamente dentro de una imagen o QR.

### 9.12 Cierre y álbum compartido

Usar una fotografía cálida, de alto valor emocional, con overlay crema ligero y texto de contraste validado.

> Gracias por acompañarnos en uno de los días más importantes de nuestras vidas. No podemos esperar para celebrar con ustedes.

Agregar QR y enlace para álbum compartido con este texto:

> Queremos vivir este día también desde sus ojos. Si toman fotos o videos, compártanlos aquí para conservar todos esos momentos.

El QR es un complemento. Debe existir también un enlace o botón visible y accesible: `Compartir fotos y videos`.

## 10. Botones, enlaces y formularios

### Botones

| Variante | Uso | Tratamiento |
| --- | --- | --- |
| Primario | RSVP, envío de formularios | Fondo `--olive-800`, texto `--champagne-50`, borde fino; radio medio, no cápsula extrema. |
| Secundario | Mapas, ver galería, sugerencias | Fondo transparente o papel, borde taupe/dorado, texto `--brown-900`. |
| Enlace | Acciones terciarias | Texto `--olive-800` y subrayado de 1 px con offset. |

- Altura mínima: `44px`; padding horizontal mínimo: `1.25rem`.
- Transición: color, borde y `transform` en `180–300ms` con curva suave.
- Hover: oscurecer sutilmente o elevar `1–2px`; no aplicar glow, rebote ni sombras grandes.
- Focus visible: anillo de `2–3px` con `--gold-600` y separación suficiente del borde.

### Campos

- Fondo crema muy claro, borde `--taupe-300`, texto `--brown-900`.
- Etiquetas siempre visibles por encima del campo; placeholders son ejemplos, no etiquetas.
- Radio `--radius-sm`; padding generoso; `min-height: 48px`.
- Estados: normal, hover, focus, error y éxito definidos con texto y borde; no depender únicamente del color.
- Textareas con altura inicial cómoda y posibilidad de crecer.

## 11. Imagen, ilustración e iconografía

- Fotografías: luz cálida, tonos naturales, contraste moderado, edición consistente. Evitar filtros fríos, saturación alta o recortes de baja calidad.
- Ilustraciones: acuarela botánica o retrato suave, con paleta reducida a verdes, taupes y champagne.
- Iconos: lineales, finos, redondeados y secundarios al texto. Un único set visual para toda la web.
- Todas las imágenes informativas requieren `alt` descriptivo. Las puramente decorativas usan `alt=""` y no añaden ruido al lector de pantalla.

## 12. Movimiento

El movimiento debe sentirse lento, casi imperceptible y no competir con la ceremonia.

- Entradas de contenido: `opacity` y desplazamiento vertical de `8–16px`, duración `500–800ms`.
- Hero o ilustraciones: parallax mínimo y solo si no afecta rendimiento ni contenido interactivo.
- Galería y botones: transiciones de `180–300ms`.
- No usar autoplay de carruseles, desplazamiento continuo, confeti ni animaciones de texto letra por letra.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

## 13. Responsive

### Mobile first

- Diseñar desde `320px` de ancho, verificando especialmente `375px` y `430px`.
- Una columna para texto, formulario, ubicación y cronología.
- Botones de ancho completo cuando son acciones primarias; área táctil mínima de `44 × 44px`.
- Hero con nombres grandes pero sin romper palabras de forma incómoda; permitir dos líneas elegantes.
- Las tarjetas no deben tener anchos fijos ni depender de hover.
- Evitar fondos con demasiada imagen debajo de texto en pantallas pequeñas.

### Desktop

- A partir de `768px`, introducir dos columnas en RSVP contextual, ceremonia, ubicación y hoteles cuando el contenido lo permita.
- A partir de `1024px`, usar la retícula editorial para timeline alternado y galería asimétrica.
- Mantener el texto en bloques legibles, no estirarlo a todo el ancho.
- No trasladar la navegación móvil literalmente: en desktop debe permanecer tranquila y alineada al sistema editorial.

## 14. Accesibilidad y calidad

- Verificar contraste de texto y controles en cada fondo; no asumir que dorado sobre crema es legible para texto pequeño.
- Estructura semántica: un único `h1`, secciones con `h2`, listas reales para horarios y hoteles, botones para acciones y enlaces para navegación.
- Todos los controles tienen nombre accesible y foco visible.
- Formularios con `label`, instrucciones, validación en línea y resumen de errores cuando aplique.
- Diálogos de galería y menú móvil deben atrapar foco, cerrarse con `Escape` y devolver foco al disparador.
- Respetar zoom al 200% sin pérdida de contenido ni acciones.
- No deshabilitar la selección de texto, el zoom, el menú contextual ni el scroll nativo.
- Optimizar fotografías: formatos modernos, dimensiones declaradas, carga diferida fuera del hero y versión de alta prioridad para la imagen principal.

## 15. Criterios de aceptación visual

La implementación está lista para revisión de diseño cuando:

- La primera impresión es una invitación cálida y editorial, no una plantilla SaaS ni una landing moderna genérica.
- The Seasons domina nombres y títulos; Cinzel Decorative se limita a monograma y ornamentos; Cinzel estructura la información corta.
- La textura de papel existe pero no interfiere con legibilidad ni rendimiento.
- RSVP se entiende, se completa y se valida fácilmente desde móvil.
- Fecha, lugar, itinerario, navegación y mapas se encuentran sin esfuerzo.
- Galería, ceremonia, regalos y cierre mantienen el mismo sistema de color, tipografía, bordes y ritmo.
- La interfaz mantiene contraste, foco, labels y comportamiento correcto sin depender de hover o color.

## 16. Restricciones explícitas

No hacer lo siguiente:

- No usar paletas ajenas a crema, taupe, café, champagne, dorado suave y verde olivo definidos aquí.
- No usar una sans serif moderna como tipografía dominante.
- No diseñar una interfaz minimalista fría, negra o de alto contraste agresivo.
- No usar negro puro, sombras pesadas, gradientes brillantes, glassmorphism marcado ni botones tipo aplicación tecnológica.
- No saturar la página con dorado, flores, acuarelas o el monograma.
- No aplicar textura de papel intensa, ruido sucio o fondos que compitan con fotografías y textos.
- No esconder información esencial en imágenes, tooltips, hover o carruseles.
