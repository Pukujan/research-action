# HANDOFF.md — Research → Action Verification

## Checkpoint
- Date: 2026-08-23
- Repository: `Pukujan/research-action`
- Branch: `main`
- Architecture/methodology plan: **LOCKED_V1**
- Adversarial audit: **issue #8 completed/closed**
- Current delivery gate: **Gate A — implemented / NOT execution-verified**

`LOCKED_V1` locks the architecture/methodology plan only. It does **not** verify Gate A, INITE Brain, Layer 1, any client integration, or epistemic quality.

## Current canonical issues
- #1 shared contracts / SWE / adapters / operational trust/freshness ownership
- #2 LOCKED_V1 program plan and Gate A/B0/B1/B2/C/D/E/F sequence
- #3 W3C PROV
- #4 session continuity
- #5 policy ownership + assurance DAG
- #6 agentic coding validation A1–A5
- #7 LLM-as-judge governance
- #8 completed adversarial audit / scope control

## What the adversarial audit changed
The audit reduced scope and corrected contradictions rather than adding a universal validation checklist:
- L1 source suitability vs L2 exact grounding ownership separated.
- L6 is final action gate over a typed assurance DAG; L7/L8 may feed it.
- host milestones split B0 runtime / B1 one client / B2 second-client portability.
- OpenCode auto-interception is version/capability-probe dependent; explicit assured MCP/tool is fallback.
- protected holdout requires grader custody outside normal implementation-agent access.
- `ABSTAIN` does not automatically become human review.
- source-ranker shared-foundation issue is conformance-only.
- A1–A5 is the only validation-profile taxonomy; methods are failure/risk triggered.
- Layer-7 candidate disposition is distinct from portfolio greenfield conclusion.
- auth/least privilege, telemetry/provenance data safety, retention and assessment freshness have explicit pre-enforcement ownership.
- same-agent visible tests are development evidence, not independent hidden acceptance.

## Shared contract state — IMPLEMENTED / UNVERIFIED
The current pre-release contract includes:
- `DecisionContext` on every assurance envelope:
  - `owningLayer`
  - `scope`
  - `policyId`
  - `authority: AUTHORITATIVE | SHADOW | DIAGNOSTIC`
- JSON Schema for the decision context.
- canonical L1 fixture identifies authoritative Layer-1 `source-suitability` scope.
- `SliceVerificationRecord` type/schema.
- pre-execution Gate-A fixture deliberately set to `NOT_RUN` with `proves[]` and `doesNotProve[]`.
- contract tests for decision identity and verification-record anti-self-certification.

Exact shared contract revision currently consumed by `source-ranker`:
- `67af56a17f1616e289e4e709facdec3098280b97`

Later documentation commits do not change that pinned runtime contract unless explicitly advanced and tested.

## Verification state
### Observed/implemented in Git
- architecture issues/specs audited and locked
- decision identity committed
- slice-verification type/schema/fixture committed
- canonical contract fixture/tests updated
- layer/client handoff sequence updated

### NOT execution-verified
No command-capable run has yet established current `research-action` passes:
- dependency install/lockfile resolution
- formatting
- lint
- strict TypeScript
- schema/contract tests
- build

Gate A remains **IMPLEMENTED / NOT VERIFIED**.

## Exact next work for Luna/local executor
1. Read `AGENTS.md`, this file, issues #1–#8, and `source-ranker/LOCAL-CODEX-HANDOFF.md`.
2. Execute Gate A:
   ```bash
   npm install
   npx prettier --write .
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```
3. Fix only observed implementation/tooling defects. Any semantic architecture change requires explicit LOCKED_V1 change control / SDD/PDD.
4. Commit/inspect `package-lock.json`; only then move CI to `npm ci`/cache.
5. Update/create the Gate-A `SliceVerificationRecord` using actual execution evidence. Never promote `NOT_RUN` through prose.
6. Verify `source-ranker` against its exact contract pin and current visible tests.
7. After both repos are green, run B0: real Brain-backed assessment -> OTel/Phoenix, positive + failure/abstain, human-inspectable.
8. After B0, choose exactly one B1 client. B2 second-client portability is later.

## Change control after LOCKED_V1
Architecture/methodology changes must:
1. name the failure/evidence motivating the change;
2. identify affected owner/layer/contracts;
3. update SDD/PDD acceptance criteria;
4. version compatibility semantics if required;
5. update tests/fixtures/handoffs;
6. explicitly supersede LOCKED_V1 rather than silently drifting it.

Implementation details inside an already-owned boundary do not require a new architecture-plan version unless they change externally observable semantics.

## Do not repeat
- no second validation ladder
- no universal advanced-test checklist
- no L1/L2 grounding ownership collapse
- no multi-client requirement for B1
- no assumed OpenCode hook coverage
- no visible-test-as-hidden-oracle claim
- no extra DB for slice records yet
- no Brain-is-solved claim
- no runtime `VERIFIED` claim before observed evidence