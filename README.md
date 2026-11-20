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

La aplicación local incluye portada, mapa esquemático con filtros de demostración y orientación con enlaces oficiales. Los datos proceden de un conjunto sintético incluido en el código. El mapa se dibuja con CSS y usa sectores ilustrativos.

El workflow inicial verifica código y compilación en PRs y pushes a `test` y `main`. Consulta la [planificación de sprints](docs/sprints.md), sus [gráficos editables](docs/graficos-sprints.md), el [diagrama lógico](docs/arquitectura.md) y la [matriz de verificación](docs/verificacion-inicial.md).
