# Plan de construcción — Web de boda Daniela & Rodrigo

## 1. Objetivo y alcance

Construir una web de boda elegante, responsive y fácil de actualizar para **Daniela Samperio Arce** y **Rodrigo Hevia Ibarrarán**.

La página concentra toda la información de la celebración del **20 de marzo de 2027**, en **Piedra Alta, Morelos**, y permite que los invitados confirmen asistencia y sugieran canciones. El álbum colaborativo se resolverá con un enlace y QR a Google Photos; no se construirá un sistema propio para carga de fotos o videos.

### Incluido

- Información del evento, cuenta regresiva e historia de la pareja.
- Galerías, itinerario, FAQ, ceremonia, ubicación, hospedaje y mesa de regalos.
- RSVP persistente en Supabase.
- Solicitudes de canciones persistentes en Supabase.
- Enlace y QR al álbum compartido de Google Photos.
- Diseño responsive y accesible definido en [DESIGN.md](/Volumes/WD_BLACK/Boda_Dan/DESIGN.md).
- Deploy en Vercel.

### Fuera de alcance inicial

- Registro, inicio de sesión o portal privado para invitados.
- Carga directa de fotos, videos o archivos a la web.
- Panel administrativo propio.
- Pagos, e-commerce o gestión de regalos dentro del sitio.
- Integración de pronóstico en tiempo real antes de que sea útil para el evento.

## 2. Decisiones técnicas

| Área | Decisión | Motivo |
| --- | --- | --- |
| Frontend | Next.js + React + TypeScript, App Router | Integración directa con Vercel, buen rendimiento, rutas API/Route Handlers para mutaciones y manejo claro de assets. |
| Estilos | CSS global con variables/tokens + CSS Modules por componente | Mantiene la identidad editorial centralizada sin acoplar la UI a utilidades extensas. |
| Persistencia | Supabase Postgres | Suficiente para RSVP y canciones, con consola simple para consultar resultados. |
| Acceso a datos | Route Handlers de Next.js | La clave de servicio nunca llega al navegador y se puede validar/limitar cada envío. |
| Deploy | Vercel | Compatible de forma nativa con Next.js y variables de entorno. |
| Fuentes | Locales en `/public/fonts` | Respeta la identidad visual y evita depender de terceros. |
| Imágenes | Assets optimizados en `/public/images` y `next/image` | Control de calidad, carga diferida y dimensiones conocidas. |
| Álbum | Google Photos shared album + QR | Resuelve la colaboración sin backend ni moderación propios. |

**Alternativa aceptable:** Vite + React es viable si se prefiere un sitio puramente estático, pero requeriría alojar o crear endpoints separados para mantener las claves de Supabase fuera del cliente. Para este proyecto se recomienda Next.js.

## 3. Arquitectura propuesta

```text
/
├── public/
│   ├── fonts/
│   │   ├── the-seasons/
│   │   ├── cinzel/
│   │   └── cinzel-decorative/
│   ├── images/
│   │   ├── hero/
│   │   ├── gallery/
│   │   ├── ceremony/
│   │   ├── location/
│   │   └── closing/
│   └── qr/
│       └── shared-album.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── rsvp/route.ts
│   │   │   └── song-request/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Countdown.tsx
│   │   ├── StoryTimeline.tsx
│   │   ├── Gallery.tsx
│   │   ├── WeddingDayTimeline.tsx
│   │   ├── FaqSection.tsx
│   │   ├── CeremonyPeople.tsx
│   │   ├── RsvpForm.tsx
│   │   ├── SongRequestForm.tsx
│   │   ├── LocationSection.tsx
│   │   ├── GiftsSection.tsx
│   │   ├── ClosingSection.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── Button.tsx
│   │   └── SiteNavigation.tsx
│   ├── data/
│   │   ├── wedding.ts
│   │   ├── colors.ts
│   │   ├── schedule.ts
│   │   ├── faq.ts
│   │   ├── hotels.ts
│   │   ├── story.ts
│   │   ├── ceremony.ts
│   │   └── gifts.ts
│   ├── lib/
│   │   ├── env.ts
│   │   ├── supabase.ts
│   │   └── validation.ts
│   └── styles/
│       ├── fonts.css
│       └── tokens.css
├── .env.example
├── DESIGN.md
└── PLAN.md
```

`src/app/globals.css` importa `src/styles/fonts.css` y `src/styles/tokens.css`, además de reset, textura de papel y estilos globales mínimos. Los estilos específicos viven junto a sus componentes como `ComponentName.module.css` cuando el componente lo justifique.

## 4. Modelo de contenido

Los contenidos que la pareja puede modificar sin tocar componentes deben residir en `src/data`. Cada archivo exporta objetos tipados; las secciones leen de esos datos y no duplican textos o enlaces.

### `wedding.ts`

Debe centralizar:

- Nombres, fecha ISO (`2027-03-20T14:00:00-06:00`) y texto de fecha.
- Nombre del recinto y dirección final.
- URLs de Waze, Google Maps y Google Photos.
- Datos de cuenta regresiva.
- Mensajes de hero, cierre y álbum.
- URL y alt de imágenes principales.

### Otros archivos de datos

| Archivo | Responsabilidad |
| --- | --- |
| `colors.ts` | Referencia TypeScript opcional a los tokens CSS; no duplicar valores si no hay uso en código. |
| `schedule.ts` | Horarios y etiquetas del itinerario. |
| `faq.ts` | Preguntas, respuestas y orden de despliegue. |
| `hotels.ts` | Nombre, distancia, precio aproximado, URL y notas de cada hotel. |
| `story.ts` | Hitos 2019, 2020–2026, propuesta y hoy; texto e imágenes. |
| `ceremony.ts` | Grupos, nombres, frases e ilustraciones de ceremonia. |
| `gifts.ts` | Liverpool, Palacio y datos de cuenta bancaria con URLs o textos copiables. |

## 5. Experiencia y páginas

La primera versión tendrá una ruta pública única (`/`) con navegación por anclas. Esto evita fragmentar la experiencia y facilita que un invitado llegue a RSVP o ubicación desde un enlace compartido.

### Orden de secciones

1. **Hero**
2. **Nuestra historia**: timeline y galería.
3. **Ese día**: itinerario, bloque de clima y FAQ.
4. **Ceremonia**: personas especiales.
5. **Canciones**: formulario de sugerencias.
6. **RSVP**: confirmación de asistencia.
7. **Ubicación y hospedaje**.
8. **Mesa de regalos**.
9. **Cierre y álbum compartido**.

Cada sección recibe un `id` estable para navegación y deep links: `#historia`, `#itinerario`, `#ceremonia`, `#canciones`, `#rsvp`, `#ubicacion`, `#regalos` y `#album`.

## 6. Especificación por componente

### `Hero.tsx` y `Countdown.tsx`

- Mostrar mensaje de bienvenida:

  > Estamos muy felices de compartir el inicio de nuestro para siempre con ustedes. Aquí encontrarán toda la información para acompañarnos ese día.

- Mostrar los nombres completos, la fecha y `Piedra Alta | Morelos`.
- Incluir monograma `D & R` y CTA anclada a `#rsvp` con texto `Confirmar asistencia`.
- Usar fecha del evento con zona horaria de Morelos (`America/Mexico_City`), no la zona del dispositivo, para evitar que el contador cambie antes de tiempo.
- Mensaje del contador:

| Días restantes | Mensaje |
| --- | --- |
| Más de 100 | `Faltan X días` |
| Exactamente 100 | `Faltan 100 días` |
| 8 a 30 | `¡Ya falta un mes!` |
| 0 a 7 | `¡Nos vemos este fin de semana!` |
| Fecha pasada | Mensaje posterior configurable, por ejemplo `Gracias por celebrar con nosotros` |

El contador puede actualizarse una vez por minuto hasta la semana previa y cada segundo solo dentro de los últimos siete días. Debe tener una representación de texto accesible; no depender únicamente de números decorativos.

### `StoryTimeline.tsx` y `Gallery.tsx`

- Timeline con los hitos: `Cómo nos conocimos — 2019`, `Momentos y viajes — 2020–2026`, `La propuesta` y `Hoy…`.
- En móvil: cronología vertical. En desktop: composición editorial alternada, según `DESIGN.md`.
- Galerías filtrables o agrupadas visualmente: `Propuesta`, `Pedida`, `Fiesta de Compromiso`.
- Usar imágenes locales en `/public/images/gallery`; registrar `alt`, ancho y alto en los datos.
- El lightbox, si se implementa, debe ser accesible; no es requisito para la primera entrega si las fotos se ven correctamente dentro de la grilla.

### `WeddingDayTimeline.tsx` y clima

El itinerario contiene estos momentos:

| Hora | Actividad |
| --- | --- |
| 13:30 | Recepción de invitados |
| 14:00 | Ceremonia |
| 15:00 | Cóctel |
| 16:00 | Cena |
| 17:30 | Nuestro primer baile |
| 18:00 | Fiesta |
| 02:00 | Ever After |

El pronóstico inicia como card visual con el estado `Información del clima próximamente`. Cuando falten pocas semanas, se decide entre integrar un API en un Route Handler con caché o incluir un enlace a un proveedor externo. No añadir una API de clima antes de que el beneficio sea real.

### `FaqSection.tsx`

Usar acordeón accesible con preguntas y respuestas sobre:

- Estacionamiento y valet sin costo.
- Dress code formal: vestido largo para mujeres; traje para hombres; corbata opcional; no tenis.
- Evento al aire libre.
- Celebración solo para adultos.
- Opciones vegetarianas y restricciones alimenticias por medio del RSVP.

### `CeremonyPeople.tsx`

Renderizar cards para Papás, Padrinos, Testigos, Damas de honor y Groomsmen. Cada elemento acepta `image`, `groupName`, `people` y `description`; la imagen debe permitir una ilustración en acuarela sin obligar a tenerla desde el primer día.

### `SongRequestForm.tsx`

- Título: `La canción que te hará bailar`.
- Campos: nombre del invitado, canción y artista.
- Validar que canción no esté vacía; nombre y artista pueden ser opcionales según el contenido solicitado, aunque se recomienda pedir nombre para dar contexto a la sugerencia.
- Enviar por `POST /api/song-request`.
- Mostrar estados de envío, éxito y error en el mismo formulario sin redirigir.

### `RsvpForm.tsx`

- Título: `Confirmación de asistencia`.
- Campos: código de invitación opcional, nombre, asistencia Sí/No, asistentes 1/2, restricciones alimenticias y mensaje opcional.
- Al seleccionar `No`, ocultar visualmente y excluir del envío los campos que no aplican (`guest_count` y restricciones alimenticias).
- Validar que nombre y asistencia existan; cuando asiste, validar `guest_count` en rango 1–2.
- Enviar por `POST /api/rsvp`.
- Presentar confirmación elegante, inequívoca y accesible; no recargar la página.
- Preparar el contrato para que, si se activa control de boletos, el endpoint valide código y devuelva `max_guests` antes de permitir enviar el formulario.

### `LocationSection.tsx`

- Mostrar croquis como recurso visual complementario, dirección escrita y copiable, botones Waze y Google Maps.
- Mostrar tres hoteles desde `hotels.ts` con distancia, precio aproximado y enlace externo.
- Agregar recomendaciones de Airbnb, transporte y un mapa embebido o enlace de respaldo.
- Declarar claramente que enlaces de mapas abren servicios externos.

### `GiftsSection.tsx` y `ClosingSection.tsx`

`GiftsSection` usa el mensaje indicado y ofrece Liverpool, Palacio y cuenta de banco. Los datos bancarios deben poder copiarse como texto, no estar solamente en una imagen.

`ClosingSection` muestra una foto final, el mensaje de agradecimiento, el QR de `/public/qr/shared-album.png` y un enlace visible al álbum de Google Photos. El enlace es obligatorio incluso si hay QR.

## 7. Estilos y assets

Seguir [DESIGN.md](/Volumes/WD_BLACK/Boda_Dan/DESIGN.md) como fuente de verdad visual.

### Preparación de assets

1. Colocar fuentes licenciadas en las carpetas definidas dentro de `public/fonts`.
2. Añadir `@font-face` en `src/styles/fonts.css` con rutas locales y `font-display: swap`.
3. Definir paleta, tamaños, radios, espaciado y fuentes en `src/styles/tokens.css`.
4. Aplicar textura ligera en `globals.css` mediante pseudo-elemento o clase reutilizable; opacidad máxima `0.25`.
5. Guardar fotos de hero, galería y cierre en `public/images` con nombres descriptivos y sin espacios.
6. Optimizar imágenes antes de agregarlas: tamaño de presentación, compresión adecuada, formatos WebP/AVIF cuando sea posible y JPEG de respaldo si se requiere.
7. Generar el QR a partir de la URL final de Google Photos y verificarlo en al menos dos teléfonos.

## 8. Supabase

### Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

- `NEXT_PUBLIC_SUPABASE_URL` puede exponerse al navegador, pero en esta arquitectura los formularios no necesitan usarlo directamente.
- `SUPABASE_SERVICE_ROLE_KEY` es exclusiva del servidor: nunca usar prefijo `NEXT_PUBLIC_`, nunca incluirla en commits y nunca importarla en un Client Component.
- Incluir `.env.example` solo con los nombres de variables, sin valores.

### Esquema SQL inicial

Ejecutar en el SQL Editor de Supabase:

```sql
create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  invitation_code text,
  guest_name text not null,
  attending boolean not null,
  guest_count integer,
  dietary_restrictions text,
  message text,
  constraint rsvps_guest_count_when_attending check (
    (attending = false and guest_count is null)
    or (attending = true and guest_count between 1 and 2)
  )
);

create table public.song_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  guest_name text,
  song_title text not null,
  artist text
);

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  guest_family_name text not null,
  max_guests integer not null default 1 check (max_guests between 1 and 2),
  used boolean not null default false
);

create index rsvps_created_at_idx on public.rsvps (created_at desc);
create index song_requests_created_at_idx on public.song_requests (created_at desc);
create index invitations_code_idx on public.invitations (code);
```

La tabla `invitations` se crea desde el inicio para evitar migraciones posteriores, pero no se expone en UI ni se usa para bloquear respuestas hasta que la pareja decida controlar accesos.

### Seguridad y acceso

1. Activar Row Level Security (RLS) en las tres tablas.
2. No crear políticas de lectura pública para RSVP, canciones o invitaciones.
3. Los Route Handlers usan la clave de servicio exclusivamente en servidor para insertar o validar datos.
4. Validar y limitar tamaño de todos los campos en el servidor; no confiar solo en validación de cliente.
5. Añadir protección básica contra abuso antes de publicar: honeypot, límite de frecuencia por IP o captcha ligero si se detecta spam.
6. Registrar errores sin incluir textos de mensajes personales o claves secretas.

### Contratos de endpoints

| Ruta | Método | Validación | Resultado |
| --- | --- | --- | --- |
| `/api/rsvp` | `POST` | nombre, asistencia; asistentes 1–2 si asiste; longitudes máximas | Inserta RSVP y responde mensaje de éxito. |
| `/api/song-request` | `POST` | canción obligatoria; longitudes máximas | Inserta sugerencia y responde mensaje de éxito. |
| `/api/invitation` (opcional) | `POST` | código de invitación | Devuelve máximo autorizado, sin exponer lista de invitados. |

Para evitar duplicados accidentales, considerar una restricción adicional o un flujo de actualización cuando se habilite control de boletos. No marcar una invitación como `used` hasta que la validación de negocio esté definida: una familia puede requerir modificar su RSVP posteriormente.

## 9. Plan por fases

### Fase 1 — Setup del proyecto

1. Crear proyecto Next.js con TypeScript, linting y estructura `src/`.
2. Configurar alias de imports si se utiliza (`@/components`, `@/data`, `@/lib`).
3. Crear `.env.example`, `.gitignore` y estructura de carpetas.
4. Añadir `layout.tsx`, metadatos base, favicon y título de la boda.

**Resultado:** aplicación local que inicia correctamente y despliega un esqueleto de home.

### Fase 2 — Fundamentos visuales

1. Copiar fuentes a `/public/fonts` y declarar `@font-face`.
2. Implementar tokens, reset, color, textura de papel y estilos de foco.
3. Crear `Button`, `SectionTitle` y navegación reutilizable.
4. Revisar contraste y tipografía antes de crear el resto de secciones.

**Resultado:** sistema visual coherente, sin contenido final todavía.

### Fase 3 — Layout y contenido estático

1. Crear datos mock completos en `src/data`.
2. Construir Hero y contador.
3. Construir historia, galería, itinerario, clima placeholder, FAQ y ceremonia.
4. Construir ubicación/hospedaje, mesa de regalos, cierre y QR temporal.
5. Enlazar navegación por anclas y CTA de RSVP.

**Resultado:** web navegable de punta a punta, con todas las secciones visibles sin backend.

### Fase 4 — Formularios y Supabase

1. Crear proyecto Supabase y aplicar el esquema SQL.
2. Configurar variables de entorno locales y de Vercel.
3. Implementar cliente de servidor en `src/lib/supabase.ts`.
4. Implementar validación compartida en `src/lib/validation.ts`.
5. Implementar `POST /api/rsvp` y el formulario con mensajes de estado.
6. Implementar `POST /api/song-request` y el formulario con mensajes de estado.
7. Probar inserciones, errores, campos vacíos y contenido largo.

**Resultado:** RSVP y canciones guardan datos de forma segura y muestran feedback claro.

### Fase 5 — Contenido final y assets

1. Sustituir textos mock por datos reales de ceremonia, hoteles, direcciones, regalos y transporte.
2. Agregar fotografías e ilustraciones finales optimizadas.
3. Crear álbum compartido de Google Photos, obtener URL y generar QR.
4. Validar todos los enlaces externos, montos/precios aproximados y rutas de navegación.

**Resultado:** el sitio contiene solo información vigente y assets definitivos.

### Fase 6 — Responsive, accesibilidad y rendimiento

1. Validar layouts en anchos de `320px`, `375px`, `430px`, `768px`, `1024px` y escritorio amplio.
2. Probar menú, acordeón, formularios, foco de teclado y mensajes de error.
3. Verificar `prefers-reduced-motion`, contraste y zoom al 200%.
4. Medir rendimiento y reducir peso de hero/galería antes de publicar.
5. Probar en iPhone, Android y desktop con navegadores actuales.

**Resultado:** interfaz usable, legible y rápida en las plataformas reales de invitados.

### Fase 7 — Deploy y operación

1. Crear proyecto Vercel conectado al repositorio.
2. Configurar variables de entorno de producción.
3. Desplegar preview y ejecutar la lista de verificación final.
4. Publicar dominio definitivo y actualizar URL del QR si cambió.
5. Verificar formularios en producción y revisar registros de Supabase/Vercel.

**Resultado:** sitio público, estable y listo para compartir.

## 10. Pruebas y checklist de publicación

### Funcional

- [ ] CTA de Hero desplaza a RSVP.
- [ ] Cuenta regresiva usa la fecha y zona horaria correctas.
- [ ] RSVP bloquea envíos inválidos y guarda una respuesta válida.
- [ ] RSVP con `No` no envía cantidad de asistentes ni restricciones.
- [ ] Solicitud de canción válida se guarda en `song_requests`.
- [ ] Los errores del servidor son comprensibles y no exponen datos internos.
- [ ] Waze, Google Maps, hoteles, regalos y álbum abren el destino correcto.
- [ ] QR escaneado desde dos dispositivos abre el álbum correcto.

### Diseño y accesibilidad

- [ ] Fuentes cargan localmente y los fallbacks son aceptables.
- [ ] Textura de papel es perceptible pero tenue.
- [ ] No hay negro puro, sombras fuertes ni elementos con estética de app genérica.
- [ ] Títulos, navegación y controles mantienen la jerarquía tipográfica definida.
- [ ] Botones y campos son cómodos de tocar en móvil.
- [ ] Todos los campos tienen label y todos los controles muestran foco visible.
- [ ] Navegación y acordeones funcionan con teclado.
- [ ] Imágenes informativas tienen texto alternativo adecuado.

### Rendimiento y despliegue

- [ ] Imágenes tienen dimensiones, formatos y peso adecuados.
- [ ] Las imágenes fuera del hero se cargan de forma diferida.
- [ ] No hay claves de Supabase en el cliente ni en el repositorio.
- [ ] Variables de entorno están configuradas en Vercel.
- [ ] Build de producción termina sin errores.
- [ ] La versión publicada se verifica desde móvil y desktop.

## 11. Criterios de aceptación

La primera versión se considera terminada cuando:

- La página carga rápido y presenta una experiencia elegante, romántica y coherente con la paleta y el sistema de [DESIGN.md](/Volumes/WD_BLACK/Boda_Dan/DESIGN.md).
- La textura de papel es sutil y las fuentes están servidas localmente desde `/public/fonts`.
- Toda la información esencial del evento es localizable desde móvil sin esfuerzo.
- RSVP valida datos, guarda registros en Supabase y comunica correctamente éxito o error.
- Las canciones se guardan en `song_requests`.
- El QR y el enlace de Google Photos funcionan y no existe backend de uploads innecesario.
- La web responde correctamente en teléfono, tablet y desktop.
- La información privada y las credenciales de Supabase no quedan expuestas al navegador ni al repositorio.
