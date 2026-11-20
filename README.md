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

La aplicación local incluye una portada ilustrada, mapa esquemático interactivo, orientación con enlaces oficiales, acceso con alias, reportes de prueba e historial por cuenta. La ilustración de portada fue generada para el proyecto a partir de un paisaje urbano inspirado en San Juan de Lurigancho. El mapa usa sectores ilustrativos y los agregados sintéticos incluidos en el código.

## Probar el flujo privado en local

1. Abre `/register` con un correo electrónico, un alias y una contraseña de al menos 10 caracteres. Completa nombre, DNI y celular con datos de ensayo. El servidor valida su formato y descarta esos tres campos. La cuenta local aún carece de verificación por correo o identidad.
2. Crea un reporte ficticio en `/reportar` y revisa su estado en `/mis-reportes`.
3. Para probar la moderación, registra una segunda cuenta con `moderador@example.test`. Desde la carpeta del proyecto, ejecútalo con Node.js 24:

   ```powershell
   node -e "const db=new (require('node:sqlite').DatabaseSync)('.sjl-local/demo.sqlite'); const result=db.prepare('UPDATE accounts SET role=? WHERE email=?').run('moderator','moderador@example.test'); if(result.changes!==1) process.exitCode=1"
   ```

4. Abre `/moderacion` con la segunda cuenta. Valida y marca un reporte como atendido. Comprueba el cambio desde la primera cuenta.

La base local SQLite vive en `.sjl-local/`, fuera de Git. El flujo privado solo se habilita en desarrollo. Para revisar una compilación local, se puede iniciar con `SJL_LOCAL_DEMO=1` y enlazar el servidor a `127.0.0.1`. La integración para producción con Supabase Auth, PostgreSQL y RLS sigue pendiente. Los estados de moderación son internos de la demo.

El mapa puede pedir permiso de ubicación con la API de geolocalización del navegador. Una clasificación aproximada selecciona un sector ilustrativo si la posición está cerca del área cubierta. Las coordenadas se usan en el navegador. Los filtros y el mapa manual siguen disponibles si el permiso se deniega.

El workflow inicial verifica código y compilación en PRs y pushes a `test` y `main`. Consulta la [planificación de sprints](docs/sprints.md), sus [gráficos editables](docs/graficos-sprints.md), el [diagrama lógico](docs/arquitectura.md) y la [matriz de verificación](docs/verificacion-inicial.md).
