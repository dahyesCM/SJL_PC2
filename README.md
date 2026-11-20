# SJL Previene

Proyecto académico de prevención comunitaria para San Juan de Lurigancho.

**Autora: Damarys**

## Desarrollo en Visual Studio Code

Con Node.js 24, abre esta carpeta en VS Code y ejecuta en la terminal:

```powershell
npm.cmd ci
```

Una vez instaladas las dependencias, ejecuta `npm.cmd run dev`. En Windows, detén el servidor con `Ctrl+C` antes de volver a ejecutar `npm.cmd ci`, porque Next.js puede mantener abierto el binario SWC.

La página local se sirve en <http://localhost:3000>. Ejecuta `npm.cmd run verify` para revisar lint, tipos y compilación.

## Planificación

El [backlog local](docs/jira.md) conserva las épicas, las fichas y las dependencias para el [tablero PRAC](https://damatmfr-1790533434032.atlassian.net/jira/software/projects/PRAC/boards/69/backlog). Las referencias SJL del documento se vincularán a las claves que asigne Jira.

## Estado inicial

La aplicación local incluye una portada ilustrada, mapa interactivo, orientación con enlaces oficiales, acceso con alias, reportes de prueba e historial por cuenta. La ilustración de portada fue generada para el proyecto a partir de un paisaje urbano inspirado en San Juan de Lurigancho. El mapa base usa teselas de [OpenStreetMap](https://www.openstreetmap.org/copyright). La capa de calor usa sectores ilustrativos y los agregados sintéticos incluidos en el código.

## Probar el flujo privado en local

1. Abre `/register` con un correo electrónico, un alias y una contraseña de al menos 10 caracteres. Completa nombre, DNI y celular con datos de ensayo. El servidor valida su formato y descarta esos tres campos. La cuenta local aún carece de verificación por correo o identidad.
2. Crea un reporte ficticio en `/reportar` y revisa su estado en `/mis-reportes`.
3. Para probar la moderación, registra una segunda cuenta con `moderador@example.test`. Desde la carpeta del proyecto, ejecútalo con Node.js 24:

   ```powershell
   node -e "const db=new (require('node:sqlite').DatabaseSync)('.sjl-local/demo.sqlite'); const result=db.prepare('UPDATE accounts SET role=? WHERE email=?').run('moderator','moderador@example.test'); if(result.changes!==1) process.exitCode=1"
   ```

4. Abre `/moderacion` con la segunda cuenta. Valida y marca un reporte como atendido. Comprueba el cambio desde la primera cuenta.

La base SQLite de desarrollo vive en `.sjl-local/`, fuera de Git. Para revisar una compilación local con SQLite, inicia con `SJL_LOCAL_DEMO=1` y enlaza el servidor a `127.0.0.1`. Cuando se configuran `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY`, la aplicación usa Supabase Auth, PostgreSQL y RLS. Los estados de moderación son internos del piloto.

## Entorno de pruebas en Render

1. En el proyecto Supabase de pruebas, aplica `supabase/migrations/20261120000000_pilot.sql`. Usa la clave publicable en el entorno de Next.js.
2. En GitHub publica las ramas y promueve el cambio a `test` por PR. Conecta el repositorio desde Render e importa `render.yaml`. El servicio Node usa los checks de GitHub antes del despliegue desde `test`.
3. Configura `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` en Render. Para dominio personalizado configura también `SJL_PUBLIC_URL` con su origen HTTPS. Render proporciona `RENDER_EXTERNAL_URL` para el dominio asignado.
4. En Supabase Auth activa la confirmación de correo. Añade la URL del servicio como Site URL y la ruta `/auth/callback` de ese origen a las URL permitidas. El correo de confirmación debe usar `{{ .ConfirmationURL }}`. Comprueba el envío con el proveedor SMTP del proyecto antes de abrir el piloto.
5. Comprueba `/api/health` y la portada sin cuenta. Registra dos cuentas de prueba, confirma sus correos en el navegador donde se inició el registro, envía un reporte y comprueba la persistencia y el aislamiento del historial. Registra la URL y el SHA en PRAC-19 y PRAC-20.

CI ejecuta la migración y `supabase/tests/pilot.sql` en PostgreSQL desechable. El script comprueba aislamiento, idempotencia, roles y auditoría, y revierte sus datos de prueba al terminar.

El gráfico de GitHub Actions muestra cuatro etapas. Primero se compila y se prueba el arranque. A continuación se ejecutan en paralelo las pruebas de PostgreSQL y el análisis de seguridad con npm audit, Gitleaks y las reglas Semgrep del proyecto. El último check autoriza el SHA solo cuando las tres etapas anteriores terminaron con éxito. Render registra por separado el despliegue del SHA aprobado.

Para crear una cuenta moderadora de prueba, registra y confirma la cuenta antes de asignar su rol desde el SQL Editor de Supabase con privilegios administrativos. Actualiza `public.profiles.role` a `moderator` por el UUID confirmado de esa cuenta. Los formularios y la API pública carecen de permisos para asignar roles.

El mapa puede pedir permiso de ubicación con la API de geolocalización del navegador. Una clasificación aproximada selecciona un sector si la posición está cerca del área cubierta. El explorador usa las coordenadas en el navegador. Al elegir adjuntar la ubicación a un reporte, la aplicación redondea las coordenadas a dos decimales antes de guardar el área de manera privada. La capa de calor sigue usando los agregados de prueba. El mapa manual, la lista y el envío siguen disponibles si se omite el permiso.

El workflow inicial verifica código y compilación en PRs y pushes a `test` y `main`. Consulta la [planificación de sprints](docs/sprints.md), sus [gráficos editables](docs/graficos-sprints.md), el [diagrama lógico](docs/arquitectura.md) y la [matriz de verificación](docs/verificacion-inicial.md).
