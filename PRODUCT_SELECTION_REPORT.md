# PRODUCT_SELECTION_REPORT — Tulsi.store

_Estado: **INCOMPLETO — bloqueado por acceso a catálogos** · 2026-07-11_
_Director de Compras: Claude (Fable 5)_

## Resumen ejecutivo

La investigación pública ha topado con un límite técnico duro, verificado empíricamente:

| Proveedor | Acceso público automatizado | Evidencia |
|---|---|---|
| BigBuy | ❌ Bloqueado | `bigbuy.eu` devuelve **HTTP 403** a peticiones automatizadas; el precio mayorista solo es visible con cuenta |
| CJdropshipping | ❌ Bloqueado | Toda ficha `/product/*.html` redirige (302) a `frontend.cjdropshipping.com/egg/cj/validation.html` (verificación humana) |

**Política de este informe: ningún dato inventado.** Cada celda contiene solo información verificada
con fuente, o el marcador `⛔ API` (requiere API key / cuenta). Un SKU, EAN, precio de compra o
coste de envío inventado invalidaría toda la selección.

## Qué desbloquea la misión

| Opción | Qué habilita | Tiempo hasta informe completo |
|---|---|---|
| **A. API keys** (BigBuy: panel → API · CJ: developers.cjdropshipping.com) | Catálogo completo, precio mayorista, stock por almacén, EAN, envíos por país — todo automatizable con los adaptadores ya implementados en `src/lib/suppliers/` | ~1 hora |
| B. Enlaces manuales | El propietario navega ambos catálogos con su cuenta y pega 5 enlaces por producto; se extraen referencias e imágenes | Lento, sin precios mayoristas de BigBuy ni cálculo de envíos |

## Candidatos verificados hasta ahora (fuentes públicas)

### Producto 3 — Aspirador portátil de coche (CJdropshipping)

| # | Nombre exacto (según CJ) | PID | Enlace | Specs verificadas |
|---|---|---|---|---|
| 1 | Portable Handheld Vacuum Cleaner 120W Car Charger | `BB4DB2ED-B654-475B-9B9A-C7494DFCC639` | [ficha](https://cjdropshipping.com/product/portable-handheld-vacuum-cleaner-120w-car-charger-p-BB4DB2ED-B654-475B-9B9A-C7494DFCC639.html) | 120 W, negro/blanco · resto ⛔ API |
| 2 | Wireless Car Vacuum Cleaner | `C45CC908-5C1D-4104-BEA3-BFC82D3DA44C` | [ficha](https://cjdropshipping.com/product/wireless-car-vacuum-cleaner-p-C45CC908-5C1D-4104-BEA3-BFC82D3DA44C.html) | inalámbrico, multicolor · resto ⛔ API |
| 3 | Wireless Handheld Vacuum Cleaner | `9D4570FF-EFE9-40A8-ABEB-492A3867B34F` | [ficha](https://cjdropshipping.com/product/wireless-handheld-vacuum-cleaner-p-9D4570FF-EFE9-40A8-ABEB-492A3867B34F.html) | opciones bolsa/cable · resto ⛔ API |

⚠️ Nota del Director de Compras: el requisito es **≥12.000 Pa y USB-C**; ninguno de estos 3
candidatos tiene la succión verificada públicamente. Con API se filtrará el catálogo completo
(cientos de modelos) por esos criterios en vez de depender de lo que Google indexó.

### Productos 1, 2, 4, 5, 6, 7, 8

Sin candidatos verificables por vía pública (los buscadores no indexan fichas de CJ para esos
términos, y BigBuy es inaccesible sin cuenta). ⛔ API.

## Criterios de aceptación por producto (fijados, listos para ejecutar)

1. **Fuente mascotas** (CJ): acero inox 304 · silenciosa · ≥2 L · filtros reemplazables · enchufe EU · almacén EU preferente
2. **Robot aspirador** (BigBuy): LiDAR · fregado · app · ≥4.000 Pa · garantía EU · repuestos
3. **Aspirador coche** (CJ): ≥12.000 Pa · USB-C · filtro lavable · batería · accesorios
4. **Pistola masaje** (BigBuy): silenciosa · ≥4 cabezales · varias velocidades · batería larga · garantía EU
5. **Lámpara LED** (BigBuy): Alexa · Google Home · app · RGB · enchufe EU
6. **Power bank magnético** (BigBuy): ≥10.000 mAh · USB-C · carga rápida · inalámbrica · certificación EU
7. **Mochila antirrobo** (CJ): impermeable · 15,6" · cremalleras ocultas · bolsillo oculto · costuras reforzadas
8. **Mini proyector** (BigBuy): 1080p nativo · WiFi · Bluetooth · HDMI · USB · enchufe EU

## Metodología Tulsi Score (sobre 100)

| Factor | Peso | Fuente del dato |
|---|---|---|
| Calidad (specs vs. criterios) | 20 | ficha API |
| Cumplimiento europeo (CE, garantía, enchufe) | 20 | ficha API |
| Margen (PVP objetivo − coste − envío) | 15 | precio mayorista API |
| Coste total entregado | 15 | API envíos |
| Envío (tiempo medio 9 países) | 10 | API envíos |
| Stock | 10 | API stock |
| Devoluciones (política/almacén EU) | 5 | condiciones proveedor |
| Potencial comercial | 5 | análisis de mercado |

Envíos a calcular por candidato: NL · BE · DE · FR · ES · IT · PT · AT · PL, eligiendo
automáticamente el almacén óptimo por país.

## Tabla final (se rellena tras aprobación de candidatos)

| Producto | Modelo | Marca | SKU | ID | Proveedor | Compra | Envío NL | BE | DE | FR | ES | IT | Stock | Garantía | Score |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1-8 | ⛔ API | ⛔ API | ⛔ API | ⛔ API | fijado | ⛔ API | ⛔ API | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ API | ⛔ API | pendiente |

## Compromiso

Con las API keys cargadas en `.env`, el flujo es: consulta de catálogo por criterios → 5+ candidatos
por producto con datos completos → Tulsi Score → este informe reescrito con todo verificado →
**espera de aprobación del propietario** → solo entonces, mapeo de `supplierProductId` y sincronización.
Nada se importa ni publica sin aprobación explícita.
