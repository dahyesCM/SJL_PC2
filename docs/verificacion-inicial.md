# Verificación inicial

La rúbrica de la Práctica Calificada 2 pide cuatro bloques de cinco puntos. El estado siguiente corresponde al trabajo en la carpeta local.

| Pregunta | Artefactos listos para revisión | Evidencia pendiente |
| --- | --- | --- |
| 1. Backlog | Cuatro épicas y trece tarjetas en Jira. Cuatro tarjetas en Sprint 1 y nueve en Backlog | Campos de planificación, capturas de las cuatro épicas y acceso docente |
| 2. Sprints | Cuatro metas, historias, fechas, burndowns simulados y Gantt editable | Capturas de las columnas y del WIP |
| 3. Arquitectura | Diagrama lógico editable y controles por fase | Validación con el backend integrado |
| 4. Entrega | Git local, lockfile y workflow inicial | Ramas y PRs en GitHub, pruebas y escaneos en Actions, despliegue y URL pública |

Responsable y autora del proyecto: Damarys.

La verificación local del 19 de noviembre de 2026 pasó lint, tipos y compilación. Seis solicitudes HTTP comprobaron la portada, la orientación, el mapa, los filtros combinados, la omisión de un grupo de cuatro y el rechazo de un filtro duplicado. Falta comprobar la experiencia visual y de teclado en navegador a 360 px.

## Secuencia de evidencias de PRAC-5

1. Estado inicial en Jira. Sprint 1 con cuatro tarjetas y Backlog con nueve. PRAC-5 aparece en Por hacer bajo la épica PRAC-1.
2. Inicio en Jira. PRAC-5 pasó a En curso, asignada a Damarys. Las capturas de los dos estados se tomaron en la conversación.
3. Git local. El primer commit registra la base que ya existía. La rama de trabajo separa el workflow y la documentación de verificación para PRAC-5.
4. Evidencia pendiente en GitHub. Registrar el PR a test, el control fallido, el run exitoso y la regla de checks obligatorios. Capturar la revisión y cerrar PRAC-5 después de cumplir esos criterios.

## Corte de avance del piloto

El 19 de noviembre se actualizaron PRAC-5 a PRAC-16 con el estado verificable de sus doce tarjetas. Las notas preservan los criterios y dejan explícitos los controles que faltan antes de aceptar cada historia.

| Jira | Evidencia de Git local | Resultado |
| --- | --- | --- |
| PRAC-5 | `4dbb2f6`, `ae1af0a` | Base y workflow inicial |
| PRAC-6 | `c3e8480`, `9ce209f` | Portada y navegación |
| PRAC-8 | `c3e8480`, `e0547cc` | Mapa y calor por sector |
| PRAC-9 | `7878a3e`, `9ae65f8`, `b4bf0dd` | Registro, sesión y alias |
| PRAC-10 | `7878a3e`, `b4bf0dd`, `f7dae8e` | Reporte, ubicación opcional y detalle |
| PRAC-11 | `7878a3e`, `f7dae8e` | Perfil e historial privado |
| PRAC-12 | `7878a3e` | Panel y rol local |
| PRAC-14 | `9ce209f` | Orientación y rutas oficiales |

Las capturas del guion, los gráficos de planificación y los espacios para evidencia posterior se incorporaron al informe Word de avance. El informe queda como material de entrega y sus capturas se conservan fuera del repositorio.

El siguiente control de PRAC-5 requiere un remoto de GitHub para abrir un PR de trabajo a test, comprobar el check y registrar su URL. PRAC-7 registra la integración de Supabase. PRAC-16 registra la decisión del proveedor y el despliegue tras las verificaciones.

## Evidencia remota de Supabase

En [Prueba_PC2](https://supabase.com/dashboard/project/svqmqhabxzhthvozcqsb) se aplicó desde el SQL Editor el esquema de `20261120000000_pilot.sql` del commit `a07ba6b`. La consulta posterior confirmó RLS activa en `profiles`, `reports` y `moderation_events`. La auditoría queda reservada a operaciones del servidor con privilegios definidos.

Las pruebas SQL remotas comprobaron el aislamiento entre dos cuentas, la idempotencia del envío, la restricción de moderación y la auditoría. Las cuentas y reportes temporales se revirtieron al terminar. La prueba desde la aplicación desplegada sigue pendiente en PRAC-20.

La aplicación local se conectó a Prueba_PC2 y se probó con dos cuentas sintéticas de Supabase Auth. La primera inició sesión, envió el reporte de ensayo número 3 y lo vio pendiente de revisión en su perfil. La segunda inició sesión y vio su historial vacío. Una consulta en Supabase confirmó la fila guardada. Las dos cuentas y el reporte de ensayo se conservaron en el entorno de pruebas como evidencia. Falta repetir el recorrido desde una URL desplegada.
