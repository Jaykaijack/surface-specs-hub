# Map: Surface Specs Hub Core

Wayfinding tracking for the Surface Specs Hub implementation.

## Decisions So Far
- Architecture: 100% offline self-contained SPA, dual-axis sticky table, client hash routing (see ADR-0001).
- Zero-Hallucination: 4 parameter states (`VALID`, `NOT_DISCLOSED`, `NOT_APPLICABLE`, `NULL`) (see ADR-0002).
- Product Taxonomy: 8 series, 46 models, Pro 13 (12th Gen) commercial double architecture (Intel & Snapdragon decoupled) & Laptop 8 commercial decoupled, Pro 12-inch consumer officially included.
- Official Assets & Strict Colors: Commercial models strictly restricted to Platinum & Black; consumer models support fashion colorways; offline WebP base64 in standalone bundle.

## Tickets
- [01-data-model-and-lineup.md](./issues/01-data-model-and-lineup.md) - Status: resolved
- [02-dual-axis-sticky-comparison-table.md](./issues/02-dual-axis-sticky-comparison-table.md) - Status: resolved
- [03-analysis-tools-and-calculators.md](./issues/03-analysis-tools-and-calculators.md) - Status: resolved
- [04-official-assets-and-color-variants.md](./issues/04-official-assets-and-color-variants.md) - Status: resolved
