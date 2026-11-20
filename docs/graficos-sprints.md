# Gráficos de planificación de SJL Previene

Los cuatro burndowns muestran puntos de historias. Los resultados corresponden a la simulación. La velocidad media es de 7,25 SP por sprint. Los [datos fuente y fechas](sprints.md) permiten reproducir las series.

## Sprint 1

Velocidad simulada de 5 SP. La primera línea es la ideal y la segunda es el avance simulado.

```mermaid
xychart-beta
    title "Sprint 1 · Puntos de historias pendientes"
    x-axis [D0, D1, D2, D3, D4, D5]
    y-axis "SP" 0 --> 5
    line [5, 4, 3, 2, 1, 0]
    line [5, 5, 3, 3, 3, 0]
```

## Sprint 2

Velocidad simulada de 11 SP. La primera línea es la ideal y la segunda es el avance simulado.

```mermaid
xychart-beta
    title "Sprint 2 · Puntos de historias pendientes"
    x-axis [D0, D1, D2, D3, D4, D5]
    y-axis "SP" 0 --> 11
    line [11, 8.8, 6.6, 4.4, 2.2, 0]
    line [11, 8, 8, 8, 3, 0]
```

## Sprint 3

Velocidad simulada de 10 SP. La primera línea es la ideal y la segunda es el avance simulado.

```mermaid
xychart-beta
    title "Sprint 3 · Puntos de historias pendientes"
    x-axis [D0, D1, D2, D3, D4, D5]
    y-axis "SP" 0 --> 10
    line [10, 8, 6, 4, 2, 0]
    line [10, 10, 5, 5, 2, 0]
```

## Sprint 4

Velocidad simulada de 3 SP. La primera línea es la ideal y la segunda es el avance simulado.

```mermaid
xychart-beta
    title "Sprint 4 · Puntos de historias pendientes"
    x-axis [D0, D1, D2, D3, D4, D5]
    y-axis "SP" 0 --> 3
    line [3, 2.4, 1.8, 1.2, 0.6, 0]
    line [3, 3, 3, 3, 0, 0]
```

## Gantt previsto

El Gantt usa las claves asignadas por Jira. La última fecha de cada barra en el código es exclusiva, para incluir el día de cierre en la barra. Las dependencias de cada tarjeta aparecen en su rótulo.

```mermaid
gantt
    title SJL Previene · Cronograma previsto
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    section Exploración y prevención
PRAC-6 (depende de PRAC-5) :t02, 2026-11-23, 2026-11-25
PRAC-8 (depende de PRAC-6 y PRAC-7) :t04, 2026-11-25, 2026-11-28
PRAC-14 (depende de PRAC-6) :t10, 2026-12-10, 2026-12-12
    section Reportes y seguimiento
PRAC-9 (depende de PRAC-6 y PRAC-7) :t05, 2026-11-30, 2026-12-01
PRAC-10 (depende de PRAC-9) :t06, 2026-11-30, 2026-12-04
PRAC-11 (depende de PRAC-10) :t07, 2026-12-03, 2026-12-05
    section Moderación y privacidad
PRAC-12 (depende de PRAC-10 y PRAC-11) :t08, 2026-12-07, 2026-12-09
PRAC-13 (depende de PRAC-8 y PRAC-12) :t09, 2026-12-08, 2026-12-11
    section Entrega DevSecOps y evidencias
PRAC-5 :t01, 2026-11-23, 2026-11-24
PRAC-7 (depende de PRAC-5) :t03, 2026-11-24, 2026-11-26
PRAC-15 (depende de PRAC-12 y PRAC-13 y PRAC-14) :t11, 2026-12-14, 2026-12-16
PRAC-16 (depende de PRAC-15) :t12, 2026-12-15, 2026-12-18
PRAC-17 (depende de PRAC-16) :t13, 2026-12-17, 2026-12-19
    section Hitos
    Mapa básico :milestone, 2026-11-27, 0d
    Reportes persistentes :milestone, 2026-12-04, 0d
    Privacidad y moderación :milestone, 2026-12-11, 0d
    Publicación :milestone, 2026-12-17, 0d
    Entrega :milestone, 2026-12-18, 0d
```
