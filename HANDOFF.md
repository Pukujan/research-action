# HANDOFF.md — Research → Action Verification

## Checkpoint
- Date: 2026-08-23
- Repository: `Pukujan/research-action`
- Branch: `main`
- Plan status: **PRE_LOCK_AUDIT — design corrections substantially complete, not yet LOCKED_V1**
- Current delivery gate: **Gate A — implemented / NOT execution-verified**

## Current canonical issues
- #1 shared contracts / SWE / adapters / verification record
- #2 program plan and Gate A/B0/B1/B2/C/D/E/F sequence
- #3 W3C PROV
- #4 session continuity
- #5 policy ownership + assurance DAG
- #6 agentic coding validation A1–A5
- #7 LLM-as-judge governance
- #8 adversarial pre-lock audit / scope control

## Adversarial audit result
The audit found real contradictions and reduced scope rather than adding a universal validation checklist.

Resolved/high-priority findings:
- L1 source suitability vs L2 exact grounding failure ownership separated.
- L6 is the final action gate over an assurance DAG, not a fixed linear step before L7/L8.
- first live host work split into B0 runtime, B1 one client, B2 second-client portability.
- OpenCode automatic interception is version/capability-probe dependent; explicit assured MCP/tool path is fallback.
- hidden holdout requires grader custody outside normal implementation-agent access.
- `ABSTAIN` does not automatically mean human review.
- `source-ranker` shared-foundation issue is conformance-only.
- A1–A5 is the only validation-profile taxonomy; advanced validation is failure/risk triggered.
- Layer-7 candidate disposition is distinct from portfolio `GREENFIELD_REQUIRED` conclusion.
- operational pre-enforcement requirements now include auth/least privilege, trace/provenance redaction/retention, and assessment freshness/revalidation.

Canonical audit: issue #8.

## Shared contract changes — IMPLEMENTED / UNVERIFIED
Latest contract implementation sequence includes:
- `DecisionContext` on every `AssuranceEnvelope<T>`:
  - `owningLayer`
  - `scope`
  - `policyId`
  - `authority: AUTHORITATIVE | SHADOW | DIAGNOSTIC`
- JSON Schema requires that context.
- canonical Layer-1 fixture now identifies its decision as authoritative Layer-1 `source-suitability`.
- new `SliceVerificationRecord` type/schema.
- pre-execution Gate-A fixture deliberately says `NOT_RUN` and lists what it does **not** prove.
- contract tests now test decision identity and that the pre-execution record cannot masquerade as verified.

Important shared contract commit consumed by Layer 1:
- `67af56a17f1616e289e4e709facdec3098280b97` — contract tests + audited decision/verification schema state used by `source-ranker`.

Later documentation commits do not change that pinned runtime contract unless explicitly advanced and tested.

## Current verification state
### Implemented/observed in Git
- issues/specs updated
- shared decision identity committed
- slice verification type/schema/fixture committed
- canonical fixture/tests updated

### NOT execution-verified
No command-capable run has yet proven current `research-action` passes:
- install/lockfile resolution
- formatting
- lint
- strict TypeScript
- schema/contract tests
- build

Do not promote Gate A or the pre-execution slice record to `VERIFIED` until those results are observed.

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
3. Fix only observed implementation/tooling defects. Semantic changes return to SDD/PDD and issue #8.
4. Commit/inspect `package-lock.json`; only then move CI to `npm ci`/cache.
5. Update `fixtures/v1/slice-verification-gate-a.json` (or create an observed successor record) with exact execution evidence; never overwrite `NOT_RUN` with `VERIFIED` without actual evidence refs/results.
6. Verify `source-ranker` against exact contracts commit and its current tests.
7. Only after both repos are green, execute B0: real Brain-backed assessment -> OTel/Phoenix, positive + failure/abstain, human-inspectable.
8. After B0, choose exactly one B1 client. A second client is B2, not a prerequisite for B1.

## Plan-lock criteria still to close
Before marking `LOCKED_V1`:
- read back machine-readable decision context + SliceVerificationRecord for static consistency;
- ensure source/local handoffs use post-audit sequence and current test count;
- ensure operational safety/freshness has an assigned pre-enforcement owner (currently shared platform/L5/L6 as specified in issues #1/#2/#8);
- then update issue #2 status to `LOCKED_V1` and record the lock decision/version.

Actual B0/B1 runtime execution is **not** required to lock the architecture design; those gates become verified only through their later observed verification records.

## Do not repeat
- do not reintroduce a second validation ladder;
- do not make every advanced validation method mandatory everywhere;
- do not conflate L1 source applicability with L2 citation/span existence;
- do not force ChatGPT + OpenCode + Codex into the first client milestone;
- do not assume OpenCode hook names/coverage without a capability probe;
- do not treat visible agent-authored tests as a protected hidden oracle;
- do not add a DB for slice verification records yet;
- do not claim Brain solves complete Layer 1 or that any current test suite passed before execution.