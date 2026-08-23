# HANDOFF.md — Research → Action Verification

## Checkpoint
- Date: 2026-08-23
- Repository: `Pukujan/research-action`
- Branch: `main`
- Current program gate: **Gate A — contract foundation**
- Current epistemic state: **IMPLEMENTED / NOT YET EXECUTION-VERIFIED**

## Last known relevant commits
- `d1131978674f6b43adc68bf4d04d91013c596a0f` — Ajv type import correction; latest program code commit before continuity files.
- `5c044b5baec7b320c534eeffed13ad7ebd46e462` — adds `AGENTS.md` continuity/operating contract.

## What exists
- Canonical 9-layer program plan and methodology in issues #1–#4.
- Canonical `AssuranceEnvelope<T>` and shared epistemic/failure vocabularies.
- W3C PROV-compatible provenance references and relation vocabulary.
- W3C trace-context / OTel semantic conventions.
- Layer 1 `SourceAssessment` contract/schema.
- Canonical fixture and initial schema/provenance contract tests.
- Strict TypeScript / ESLint / Prettier / Vitest scaffolding.
- CI workflow scaffold.

## Methodology status
Planned and mandatory/conditional placement is recorded in issue #2:
- SDD: contract/state/API/provenance/policy surfaces before implementation.
- PDD: protocol/gate/state invariants.
- TDD: deterministic implementation logic.
- property/fuzz and metamorphic tests: broad-input and semantic invariants.
- mutation testing: safety-critical deterministic gates.
- hidden holdouts: empirical/LLM/IR release evaluation.
- IR metrics: retrieval layers independently from verification.
- HITL: benchmark adjudication and risk/uncertainty escalations.
- OTel: first executable slice onward.
- W3C PROV: durable cross-layer provenance.
- TLA+: only when distributed/asynchronous protocol complexity justifies it.
- Lean 4: only if a small pure formal calculus becomes valuable.
- fault injection: before enforcement/production.
- full chaos: only after meaningful distributed deployment exists.

## Verified vs unverified
### Observed/implemented
- Files and contracts have been committed to GitHub.
- Issue logs contain methodology and acceptance gates.

### NOT YET VERIFIED
No local/inspectable execution result has yet proven that the current program package passes:
- formatting
- lint
- strict TypeScript
- schema tests
- provenance tests
- build

Do not promote Gate A to VERIFIED until these are actually run and observed.

## Active issues
- #1 Shared contracts / CI / telemetry / adapters
- #2 9-layer plan + methodology
- #3 W3C PROV canonical model
- #4 agent/session continuity protocol

## Architecture decisions
- `research-action` owns cross-layer contracts; layer repos consume them.
- W3C PROV-DM/PROV-O is canonical durable provenance semantics.
- OTel/W3C Trace Context is runtime observability/correlation, not the durable evidence ledger.
- External systems such as INITE Brain remain adapters, not canonical schema owners.
- Code-quality gates and epistemic benchmark gates are separate.

## Exact next steps
1. Run locally or in an inspectable execution environment:
   ```bash
   npm install
   npx prettier --write .
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```
2. Fix all observed failures without weakening the contract/invariants.
3. Commit `package-lock.json`; switch CI to `npm ci` and enable caching only after lockfile verification.
4. Mark Gate A VERIFIED only after commands are observed green.
5. Then continue the Layer 1 observable vertical slice in `Pukujan/source-ranker`.

## Do not repeat / avoid
- Do not invent a parallel provenance model instead of W3C PROV.
- Do not add a large shared framework before reuse requires it.
- Do not claim GitHub CI/local checks passed without observed execution.
- Do not let implementation-specific Brain/OpenCode/ChatGPT types enter canonical contracts.

## New-agent handoff
Start by reading `AGENTS.md`, this file, and issues #1–#4. The next task is execution verification, not adding new architecture.
