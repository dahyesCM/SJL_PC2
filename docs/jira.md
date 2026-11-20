# Backlog de SJL Previene

Tablero indicado por Damarys en el proyecto **PRAC**. Verifica si ya contiene tarjetas de SJL Previene antes de importar para evitar duplicados. [Abrir backlog de Jira](https://damatmfr-1790533434032.atlassian.net/jira/software/projects/PRAC/boards/69/backlog)

## Orden de carga

1. Busca las cuatro épicas y las trece tarjetas por título. Reutiliza las coincidencias verificadas.
2. Crea las épicas faltantes, luego las historias y tareas. Copia los criterios y las evidencias de cada ficha. Asigna a Damarys si aparece como usuaria seleccionable. Registra Must y Should con etiquetas si el tablero carece de un campo MoSCoW.
3. Asigna Parent, registra los puntos y vincula las dependencias con «is blocked by». Ubica cada tarjeta en el sprint que le corresponde.
4. Completa el mapa con las claves reales. Inicia con la tarea de repositorio y CI. Registra la evidencia del PR fallido, la ejecución exitosa y el check obligatorio antes de cerrar.

## Equivalencias

| Referencia | Incidencia | Clave Jira |
| --- | --- | --- |
| E1 | Exploración y prevención | [PRAC-2](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-2) |
| E2 | Reportes y seguimiento | [PRAC-3](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-3) |
| E3 | Moderación y privacidad | [PRAC-4](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-4) |
| E4 | Entrega DevSecOps y evidencias | [PRAC-1](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-1) |
| SJL-01 | Configurar repositorio, Jira y pipeline inicial | [PRAC-5](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-5) |
| SJL-02 | Mostrar portada y navegación adaptable | [PRAC-6](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-6) |
| SJL-03 | Versionar el esquema y preparar datos de demostración | [PRAC-7](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-7) |
| SJL-04 | Consultar el mapa y la lista de zonas | [PRAC-8](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-8) |
| SJL-05 | Registrarse e iniciar sesión | [PRAC-9](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-9) |
| SJL-06 | Enviar un reporte ciudadano | [PRAC-10](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-10) |
| SJL-07 | Consultar el estado de mis reportes | [PRAC-11](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-11) |
| SJL-08 | Revisar reportes desde el panel de moderación | [PRAC-12](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-12) |
| SJL-09 | Publicar únicamente estadísticas agregadas de reportes aprobados | [PRAC-13](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-13) |
| SJL-10 | Consultar orientación y canales oficiales verificados | [PRAC-14](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-14) |
| SJL-11 | Completar pruebas y controles DevSecOps | [PRAC-15](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-15) |
| SJL-12 | Desplegar pruebas y producción en Vercel | [PRAC-16](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-16) |
| SJL-13 | Cerrar informe, evidencias y ZIP de entrega | [PRAC-17](https://damatmfr-1790533434032.atlassian.net/browse/PRAC-17) |

## Fichas para Jira

- E1 — Exploración y prevención. Descripción y objetivo de negocio: Mostrar información comunitaria agregada y orientación para que los vecinos puedan consultar su zona sin exponer domicilios ni personas.
- E2 — Reportes y seguimiento. Descripción y objetivo de negocio: Recibir incidentes con datos mínimos y permitir a cada vecino consultar el estado de sus propios reportes.
- E3 — Moderación y privacidad. Descripción y objetivo de negocio: Revisar aportes antes de incorporarlos a las estadísticas y controlar el acceso a información privada.
- E4 — Entrega DevSecOps y evidencias. Descripción y objetivo de negocio: Entregar una aplicación verificable en la nube y demostrar el flujo de trabajo, los controles de seguridad y las pruebas.

## Tarjetas listas para cargar

### SJL-01 — Configurar repositorio, Jira y pipeline inicial
- Tipo: Tarea técnica | Épica: E4 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 1 | Depende de: —
- Resumen: Dejar lista la base reproducible del proyecto.
- Historia o necesidad: Como desarrolladora, quiero ejecutar verificaciones en cada PR, para detectar fallos antes de integrar.
- Criterio de aceptación: Dado un PR de prueba abierto, cuando se ejecuta CI con un fallo controlado, entonces el check obligatorio falla y el merge queda bloqueado.
- Implementación y QA: Crear repositorio, lockfile, tablero, ramas y workflow; enlazar ticket real; probar una ejecución fallida y otra exitosa.
- Evidencia antes de Done: Links al PR, ejecuciones y reglas de protección. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-02 — Mostrar portada y navegación adaptable
- Tipo: Historia | Épica: E1 | Responsable: Damarys | Prioridad: Must | Puntos: 2 | Estado: To Do
- Sprint: 1 | Depende de: SJL-01
- Resumen: Permitir que el vecino encuentre las funciones principales.
- Historia o necesidad: Como visitante, quiero ubicar el mapa, la orientación y el acceso, para navegar desde mi celular.
- Criterio de aceptación: Dado una pantalla de 360 px, cuando navego con teclado y activo cada acción, entonces las etiquetas y el foco son visibles y cada acción abre su pantalla.
- Implementación y QA: Crear layout, navegación y estados de error; probar con Playwright a 360 px y escritorio.
- Evidencia antes de Done: Capturas y prueba de navegación. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-03 — Versionar el esquema y preparar datos de demostración
- Tipo: Tarea técnica | Épica: E4 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 1 | Depende de: SJL-01
- Resumen: Hacer reproducible la base de datos y el entorno de prueba.
- Historia o necesidad: Como desarrolladora, quiero aplicar migraciones y cargar datos sintéticos, para repetir la demo sin usar información personal real.
- Criterio de aceptación: Dado una base de pruebas limpia, cuando aplico migraciones y ejecuto la semilla dos veces, entonces el esquema queda operativo y la semilla conserva resultados consistentes.
- Implementación y QA: Crear migraciones, restricciones, índices y políticas iniciales; separar entornos; preparar semilla reproducible con cuentas solo de prueba.
- Evidencia antes de Done: Migraciones versionadas y resultado de prueba de persistencia. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-04 — Consultar el mapa y la lista de zonas
- Tipo: Historia | Épica: E1 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 1 | Depende de: SJL-02, SJL-03
- Resumen: Mostrar patrones agregados con alcance y procedencia visibles.
- Historia o necesidad: Como vecina, quiero consultar un mapa y una lista por zona, para interpretar los datos de demostración en un formato accesible.
- Criterio de aceptación: Dado datos aprobados agregados por zona y un grupo con volumen inferior al mínimo, cuando filtro por categoría y periodo, entonces la lista y el mapa coinciden, el grupo pequeño se omite y el estado vacío es claro.
- Implementación y QA: Implementar geometrías generales, endpoint agregado y filtros; incluir fecha y cobertura; probar agrupación, umbral, zona sin datos y fallo parcial del mapa.
- Evidencia antes de Done: Pruebas de API y captura del mapa y lista con filtros. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-05 — Registrarse e iniciar sesión
- Tipo: Historia | Épica: E2 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 2 | Depende de: SJL-02, SJL-03
- Resumen: Permitir acceso a reportes privados.
- Historia o necesidad: Como vecina, quiero iniciar sesión con mi cuenta, para enviar y consultar mis reportes.
- Criterio de aceptación: Dado una cuenta habilitada, cuando inicio sesión y luego la cierro, entonces puedo acceder mientras mi sesión sigue vigente y el área privada rechaza el acceso al salir.
- Implementación y QA: Configurar Supabase Auth SSR, rutas privadas y formularios; mostrar errores seguros; probar credenciales incorrectas y sesiones vencidas.
- Evidencia antes de Done: Prueba E2E de sesión y captura del formulario. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-06 — Enviar un reporte ciudadano
- Tipo: Historia | Épica: E2 | Responsable: Damarys | Prioridad: Must | Puntos: 5 | Estado: To Do
- Sprint: 2 | Depende de: SJL-05
- Resumen: Guardar reportes con datos mínimos en estado pendiente.
- Historia o necesidad: Como vecina autenticada, quiero enviar un reporte por categoría y zona, para aportar información comunitaria.
- Criterio de aceptación: Dado un formulario válido y una petición que se reintenta, cuando envío el reporte, entonces se guarda una sola vez, queda pendiente y la respuesta muestra la confirmación.
- Implementación y QA: Crear esquema de validación, operación de escritura con idempotencia, controles de autorización y límites de entrada; probar 401, datos inválidos, reintento y error de red.
- Evidencia antes de Done: Pruebas de integración y evidencia de persistencia. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-07 — Consultar el estado de mis reportes
- Tipo: Historia | Épica: E2 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 2 | Depende de: SJL-06
- Resumen: Dar seguimiento individual con aislamiento por cuenta.
- Historia o necesidad: Como vecina autenticada, quiero ver mis reportes y su estado, para saber si fueron revisados.
- Criterio de aceptación: Dado dos cuentas con reportes diferentes, cuando consulto el historial e intento abrir el ID ajeno, entonces solo veo mis registros y la consulta ajena se deniega.
- Implementación y QA: Crear vista y filtros de estado; aplicar protección en API y RLS; probar acceso cruzado con dos usuarios y recarga de página.
- Evidencia antes de Done: Reporte de pruebas de permisos y captura del historial. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-08 — Revisar reportes desde el panel de moderación
- Tipo: Historia | Épica: E3 | Responsable: Damarys | Prioridad: Must | Puntos: 5 | Estado: To Do
- Sprint: 3 | Depende de: SJL-06, SJL-07
- Resumen: Controlar el paso de pendiente a aprobado o rechazado.
- Historia o necesidad: Como moderadora, quiero aprobar o rechazar reportes pendientes, para mejorar la calidad de los datos que se muestran.
- Criterio de aceptación: Dado un reporte pendiente y dos solicitudes de revisión concurrentes, cuando una moderadora registra la decisión, entonces solo se confirma una transición y se guarda el registro de auditoría.
- Implementación y QA: Implementar rol en servidor, transición transaccional, auditoría y panel de revisión; probar 403, concurrencia y transiciones inválidas.
- Evidencia antes de Done: Pruebas de autorización y captura del panel. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-09 — Publicar únicamente estadísticas agregadas de reportes aprobados
- Tipo: Historia | Épica: E3 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 3 | Depende de: SJL-04, SJL-08
- Resumen: Reducir exposición de datos personales en el mapa y API.
- Historia o necesidad: Como visitante, quiero ver estadísticas revisadas y agregadas, para entender tendencias generales con datos de prueba.
- Criterio de aceptación: Dado reportes aprobados, pendientes y rechazados, cuando consulto el endpoint público como anónimo, entonces solo los aprobados elegibles contribuyen y la respuesta contiene agregados sin identificadores ni texto privado.
- Implementación y QA: Conectar la consulta pública al flujo de moderación; probar umbral, combinación de filtros y acceso directo anónimo a tablas privadas.
- Evidencia antes de Done: Respuesta pública de ejemplo y matriz de permisos con pruebas. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-10 — Consultar orientación y canales oficiales verificados
- Tipo: Historia | Épica: E1 | Responsable: Damarys | Prioridad: Should | Puntos: 2 | Estado: To Do
- Sprint: 3 | Depende de: SJL-02
- Resumen: Explicar cómo usar la herramienta y cuándo acudir a canales oficiales.
- Historia o necesidad: Como visitante, quiero encontrar enlaces oficiales y orientación, para saber dónde buscar atención o reportar por la vía oficial.
- Criterio de aceptación: Dado una visita anónima desde móvil, cuando abro la página de orientación, entonces veo el alcance de la demo y los enlaces oficiales con fecha de verificación.
- Implementación y QA: Crear página accesible; verificar enlaces en fuentes oficiales; probar navegación; mostrar claramente el alcance del reporte interno.
- Evidencia antes de Done: Captura y registro de fuentes verificadas. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-11 — Completar pruebas y controles DevSecOps
- Tipo: Tarea técnica | Épica: E4 | Responsable: Damarys | Prioridad: Must | Puntos: 5 | Estado: To Do
- Sprint: 4 | Depende de: SJL-08, SJL-09, SJL-10
- Resumen: Verificar flujos, permisos y seguridad en Actions.
- Historia o necesidad: Como desarrolladora, quiero ver resultados de pruebas y escaneos, para detener una entrega con regresiones.
- Criterio de aceptación: Dado una ejecución de CI con una prueba o regla de seguridad bloqueante, cuando falla un check, entonces no se dispara el deploy y el log muestra la causa.
- Implementación y QA: Ejecutar unitarias, integración con RLS y E2E; agregar SAST, auditoría de dependencias y escaneo de secretos; publicar resultados y registrar excepciones justificadas.
- Evidencia antes de Done: Run verde, ejemplo de bloqueo y artefactos de prueba. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-12 — Desplegar pruebas y producción en Vercel
- Tipo: Historia | Épica: E4 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 4 | Depende de: SJL-11
- Resumen: Publicar el código validado con entornos separados.
- Historia o necesidad: Como docente, quiero abrir una URL pública de la solución, para verificar el flujo evaluado sin instalar nada.
- Criterio de aceptación: Dado un commit válido en test y otro aprobado en main, cuando pasan los checks correspondientes, entonces cada SHA llega a su entorno y la URL pública responde al smoke test.
- Implementación y QA: Configurar entornos, credenciales y migraciones; ejecutar despliegues gated y smoke tests; registrar SHA, run y URL de cada entorno.
- Criterio público adicional: Dado que visito la URL pública, cuando abro el mapa y la orientación, entonces puedo consultarlos y veo que los datos son de demostración.
- Evidencia antes de Done: Enlaces a runs, despliegues y URL pública. Añadir clave real al nombre de la rama, al commit y al título del PR.

### SJL-13 — Cerrar informe, evidencias y ZIP de entrega
- Tipo: Tarea técnica | Épica: E4 | Responsable: Damarys | Prioridad: Must | Puntos: 3 | Estado: To Do
- Sprint: 4 | Depende de: SJL-12
- Resumen: Preparar una entrega reproducible y defendible.
- Historia o necesidad: Como estudiante, quiero reunir el informe y el código final, para entregar cada evidencia y poder explicarla.
- Criterio de aceptación: Dado los cuatro bloques de la rúbrica y una copia limpia del ZIP, cuando repaso el paquete y verifico los enlaces, entonces todo se corresponde con el commit entregado y el docente tiene los accesos requeridos.
- Implementación y QA: Recopilar evidencias Jira, burndown, Gantt y arquitectura; revisar accesos; generar ZIP limpio y probar instrucciones de arranque.
- Evidencia antes de Done: Informe, ZIP, SHA y comprobación de los tres enlaces. Añadir clave real al nombre de la rama, al commit y al título del PR.
