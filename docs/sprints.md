# Planificación para el tablero PRAC

Las fechas, velocidades y transiciones de la simulación corresponden al plan académico. La evidencia del tablero se obtendrá de Jira. [Equivalencia entre referencias y claves reales](jira.md)

## Ajuste del tablero PRAC

El Sprint 2 activo conserva las fechas registradas en Jira. Su meta incluye arquitectura, entorno de pruebas y verificación del recorrido vecinal. Se verificaron seis tarjetas en el tablero, PRAC-9 a PRAC-11 y las tres nuevas historias.

| Historia nueva | Puntos en Jira | Criterio principal |
| --- | ---: | --- |
| [PRAC-18](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-18) Arquitectura del backend | 3 | Diagrama versionado con autenticación, persistencia, entornos y límites de confianza |
| [PRAC-19](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-19) Backend en pruebas | 5 | SHA aprobado, URL verificable, migraciones y logs sin credenciales |
| [PRAC-20](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-20) Recorrido del vecino en remoto | 3 | Dos cuentas prueban persistencia e aislamiento del historial |

El Sprint 3 quedó previsto del 7 al 11 de diciembre con PRAC-12, PRAC-13 y PRAC-14. El Sprint 4 quedó previsto del 14 al 18 de diciembre. PRAC-15, PRAC-16 y PRAC-17 tienen asignado el Sprint 4 en su ficha. El tablero mostró dos de esas tarjetas en la comprobación. Se conservaron los estados existentes.

Las 11 unidades añadidas al Sprint 2 corresponden al cambio de alcance en Jira. Las series de abajo conservan los datos de la simulación original del informe.

## Simulación de cuatro sprints

Fechas propuestas para la simulación. Ajusta el inicio en bloque si la fecha de entrega es distinta. Registra las series como **simuladas**. Sustituye o acompaña con capturas y mediciones reales cuando existan. Captura inicio, revisión y cierre de cada sprint y conserva pruebas de los movimientos del tablero.

### Sprint 1 · 2026-11-23 a 2026-11-27 · 5 días hábiles
- Meta: Dejar lista la infraestructura y publicar una primera vista consultable.
- Backlog: SJL-01 (3 SP), SJL-02 (2 SP), SJL-03 (3 SP), SJL-04 (3 SP). Carga total: 11 SP. Historias: 5 SP. Tareas: 6 SP.
- Aceptaciones simuladas por día: D1 SJL-01, D2 SJL-02, D3 SJL-03, D5 SJL-04.

### Sprint 2 · 2026-11-30 a 2026-12-04 · 5 días hábiles
- Meta: Completar el camino del vecino desde el acceso hasta el seguimiento.
- Backlog: SJL-05 (3 SP), SJL-06 (5 SP), SJL-07 (3 SP). Carga total: 11 SP. Historias: 11 SP. Tareas: 0 SP.
- Aceptaciones simuladas por día: D1 SJL-05, D4 SJL-06, D5 SJL-07.

### Sprint 3 · 2026-12-07 a 2026-12-11 · 5 días hábiles
- Meta: Validar la moderación, la privacidad y la orientación oficial.
- Backlog: SJL-08 (5 SP), SJL-09 (3 SP), SJL-10 (2 SP). Carga total: 10 SP. Historias: 10 SP. Tareas: 0 SP.
- Aceptaciones simuladas por día: D2 SJL-08, D4 SJL-09, D5 SJL-10.

### Sprint 4 · 2026-12-14 a 2026-12-18 · 5 días hábiles
- Meta: Demostrar el despliegue automatizado y cerrar la entrega.
- Backlog: SJL-11 (5 SP), SJL-12 (3 SP), SJL-13 (3 SP). Carga total: 11 SP. Historias: 3 SP. Tareas: 8 SP.
- Aceptaciones simuladas por día: D2 SJL-11, D4 SJL-12, D5 SJL-13.

Burndown de historias, puntos pendientes. D0 a D5. Traza dos líneas por sprint y conserva los datos fuente.

Sprint | Ideal | Simulado | Velocidad simulada
1 | 5, 4, 3, 2, 1, 0 | 5, 5, 3, 3, 3, 0 | 5 SP
2 | 11, 8.8, 6.6, 4.4, 2.2, 0 | 11, 8, 8, 8, 3, 0 | 11 SP
3 | 10, 8, 6, 4, 2, 0 | 10, 10, 5, 5, 2, 0 | 10 SP
4 | 3, 2.4, 1.8, 1.2, 0.6, 0 | 3, 3, 3, 3, 0, 0 | 3 SP
Velocidad media simulada: 7,25 SP de historias por sprint. En Jira, si el informe suma tareas estimadas, conserva esa captura con su alcance y adjunta el gráfico filtrado a historias con la tabla anterior. No reduzcas los puntos de una historia a medida que se trabaja: se descuentan al aceptarla.

## Datos fuente del Gantt
Fechas propuestas. El mismo día puede incluir cierre de una tarjeta y comienzo de su sucesora. Usa los códigos de Jira reales al diagramar. Agrupa por épica y agrega hitos de consulta, persistencia, privacidad y despliegue.

Tarjeta | Épica | Inicio | Fin | Depende de
SJL-01 | E4 | 2026-11-23 | 2026-11-23 | —
SJL-02 | E1 | 2026-11-23 | 2026-11-24 | 01
SJL-03 | E4 | 2026-11-24 | 2026-11-25 | 01
SJL-04 | E1 | 2026-11-25 | 2026-11-27 | 02, 03
SJL-05 | E2 | 2026-11-30 | 2026-11-30 | 02, 03
SJL-06 | E2 | 2026-11-30 | 2026-12-03 | 05
SJL-07 | E2 | 2026-12-03 | 2026-12-04 | 06
SJL-08 | E3 | 2026-12-07 | 2026-12-08 | 06, 07
SJL-09 | E3 | 2026-12-08 | 2026-12-10 | 04, 08
SJL-10 | E1 | 2026-12-10 | 2026-12-11 | 02
SJL-11 | E4 | 2026-12-14 | 2026-12-15 | 08, 09, 10
SJL-12 | E4 | 2026-12-15 | 2026-12-17 | 11
SJL-13 | E4 | 2026-12-17 | 2026-12-18 | 12
Hitos: 2026-11-27 mapa básico; 2026-12-04 reportes persistentes; 2026-12-11 privacidad y moderación; 2026-12-17 publicación; 2026-12-18 entrega.

## Evidencia de flujo Kanban por sprint
Usa registros reales de Jira si ejecutas el movimiento, o rotula las transiciones como simuladas cuando sean ilustrativas. Modelo para las capturas: al iniciar el sprint todas sus tarjetas están en To Do. Selecciona una tarjeta, muéstrala en In Progress, luego en In Review con su evidencia y finalmente en Done antes de comenzar la siguiente. Captura las cuatro columnas y el WIP. Repite el recorrido con una tarjeta representativa de cada sprint (SJL-04, SJL-06, SJL-08, SJL-12) y captura el cierre con el conjunto aceptado.
