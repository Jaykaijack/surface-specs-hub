# Domain Docs

How engineering and agent skills consume this repository's domain documentation.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — defines core hardware specifications, product taxonomy, zero-hallucination policy, and architectural constraints for Surface Specs Hub.
- **`docs/adr/`** — read Architecture Decision Records (ADRs) before modifying layout, spec structures, or comparison logic.

If any of these files don't exist, proceed silently.

## File structure

Single-context repository layout:

```
/
├── AGENTS.md                                # Agent skills & workflow standards
├── CONTEXT.md                               # Surface Specs Hub domain model & constraints
├── README.md                                # Workspace index & user guide
├── index.html                               # Primary deliverable (100% offline self-contained SPA)
├── css/                                     # Fluent tokens, layout, table & tool stylesheets
├── js/                                      # Data store, comparison engine, tools & app router
├── assets/                                  # Official product renders and assets
├── tests/                                   # Automated test runner and verification suites
├── docs/
│   ├── agents/                              # Matt Pocock skill configuration
│   ├── adr/                                 # Architecture Decision Records
│   ├── architecture.md                      # Technical architecture documentation
│   ├── data-model.md                        # Product & spec schemas
│   ├── data-source-policy.md                # Zero-hallucination policy
│   ├── reference-audit.md                   # HubWeb.cn reverse engineering audit
│   ├── surface-taxonomy.md                  # 8-series product taxonomy & lifecycle
│   └── testing.md                           # Automated test documentation
└── .scratch/                                # Local issue tracking and task tickets
```

## Use the glossary's vocabulary

When your output names a domain concept (hardware model, display size, processor, promotion policy), use the term as defined in `CONTEXT.md`.
- Always use **Surface Pro 13 英寸（第 12 代）** and **Surface Laptop（第 8 代）** as current flagships.
- Never include the 12-inch variant.
- Strictly adhere to the zero-hallucination data governance standards (`VALID`, `NOT_DISCLOSED`, `NOT_APPLICABLE`, `NULL`).

## Flag ADR conflicts

If your plan, code, or output contradicts an existing ADR in `docs/adr/`, surface it explicitly rather than silently overriding:

> _Contradicts ADR-000X (title) — but worth reopening because…_
