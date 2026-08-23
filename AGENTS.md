# AGENTS.md — Research → Action Verification

This repository is the canonical program/control-plane repository for the 9-layer Research → Action Verification system.

## First read
Before changing behavior, read:
1. `README.md`
2. `HANDOFF.md`
3. GitHub issues #1–#8
4. relevant schemas/tests/fixtures

Current architecture status is recorded in issue #2 and issue #8. Do not rely on prior chat/session memory when repository state and observed execution disagree.

## Epistemic discipline
Never collapse:
- `IMPLEMENTED` ≠ `VERIFIED`
- `PROJECT_CLAIMED` ≠ `REPRODUCED`
- `REPRODUCED` ≠ `TASK_MATCHED`
- `TASK_MATCHED` ≠ `BENCHMARKED`
- passing software tests ≠ epistemic-quality proof
- client/plugin integration success ≠ Layer quality

Never claim a test, benchmark, service, integration, slice, or behavior passed unless the execution result was observed and recorded.

## Three independent axes
Do not mix these:

### Delivery stage
`A -> B0 -> B1 -> B2 -> C -> D -> E -> F`

### Validation profile
Use only the A1–A5 taxonomy in issue #6. Layer 5 eventually selects the required profile for the risk/change class; Layer 8 checks verification sufficiency.

### Runtime mode
`observe | warn | enforce`

Do not invent a second assurance ladder.

## Agent work allocation
When practical, separate assurance/spec/test authoring from execution evidence.

### Assurance/spec/test-authoring role
Owns SDD/PDD, acceptance criteria, deterministic tests, adversarial fixtures, property/fuzz/metamorphic specifications, mutation targets, benchmark/holdout design, interface decisions, and review of observed failures.

Artifacts authored here remain `IMPLEMENTED / UNVERIFIED` until a command-capable environment produces evidence.

### Local execution role
Luna, local Codex/OpenCode, or another command-capable executor owns dependency installation, lockfiles, format/lint/typecheck/test/build runs, runtime property/fuzz/mutation runs, service bring-up, live OTel/Phoenix verification, client smoke tests, runtime fault injection, and exact result/version/trace recording.

Executors may fix implementation defects but MUST NOT weaken schemas, protocol invariants, hard-failure semantics, holdout protections, or epistemic gates merely to make tests pass. Semantic changes return to SDD/PDD first.

Layer 1 details: `Pukujan/source-ranker` issue #10.

## Policy ownership rule
Freeze decision ownership early; do not wait for the final E2E build.

**Signals/tests may overlap. Authoritative decision ownership may not.**

Every consequential decision must identify:
- owning layer
- decision scope
- policy id/version
- authority: `AUTHORITATIVE | SHADOW | DIAGNOSTIC`

A downstream layer may consume/preserve/recompute signals for comparison but may not silently overwrite an upstream authoritative decision. Changes of ownership require a recorded, versioned transition.

Canonical ownership/DAG: issue #5.

Important Layer-7 distinction:
- candidate disposition: `ADOPT | EXTEND | COMPOSE | REJECT`
- portfolio conclusion: `REUSE_SUFFICIENT | GREENFIELD_REQUIRED | INSUFFICIENT_EVIDENCE`

Rejecting one candidate does not prove greenfield is required.

## LLM-as-judge rule
Issue #7 is canonical.

Use deterministic/executable oracles when mechanically decidable. Use LLM judges only for bounded semantic/qualitative ambiguity with versioned rubric, structured output, abstention, hidden-holdout calibration, and trace/provenance.

- L1: bounded semantic source dimensions; deterministic failures dominate.
- L2: advisory for fuzzy grounding assistance; deterministic grounding authoritative.
- L3: primary semantic-support judge layer.
- L4: non-authoritative for ingestion policy.
- L5: classification aid into fixed taxonomy; policy remains deterministic.
- L6: LLM prohibited as final release oracle.
- L7: advisory comparator; task-matched benchmark + policy/human gate own disposition.
- L8: rubric-bounded plan/test sufficiency; cannot claim an execution passed.
- L9: explanatory only; provenance integrity deterministic.

LLM trajectory judges are secondary defense. Deterministic permissions/hidden-test custody/diff/sandbox controls come first.

## Program methodology
### SDD / PDD
Required before changes to contracts, states, failure semantics, APIs, provenance, policy, ownership, escalation, retries/idempotency, or promotion rules.

### TDD
Required for deterministic parsers/canonicalization/version logic/hard failures/schema validation/policy/adapters/provenance/state transitions.

### Advanced validation
Risk/failure triggered, not universal. Issue #6 defines A1–A5; issue #8 defines scope-control questions.

Use as justified:
- property/fuzz for broad input spaces
- metamorphic for semantic invariants
- mutation for critical gates/evaluators
- hidden acceptance/holdouts for independent empirical evidence
- repeated trials for stochastic components
- differential/state-machine/idempotency for matching failure models
- fault/security/trajectory tests before affected enforce/production paths
- TLA+/formal proof/chaos only when their specific failure models exist

## HITL
Human review is targeted:
- benchmark labeling/adjudication
- sampled development calibration in observe/warn
- risk-policy-required high-risk/enforce escalation
- lineage/authority corrections
- architecture adoption/portfolio decisions

`ABSTAIN` does not automatically create a human-review task.

## W3C PROV + OTel
- W3C PROV-DM/PROV-O = durable semantic derivation/provenance.
- OTel/W3C Trace Context = runtime observability/correlation.

Every important output points backward to its exact inputs. No private chain-of-thought in telemetry/provenance.

## Slice verification
Every behavior-bearing slice gets a `SliceVerificationRecord` with actual executed checks/smokes/traces/PROV/human annotations and explicit `proves` / `doesNotProve` fields.

A pre-execution record MUST remain `NOT_RUN`/`PARTIAL`; do not mark `VERIFIED` by editing prose.

Human verification path:
- Gate A: inspect schema/adversarial cases + actual CI result.
- B0: inspect real Brain-backed source assessments in Phoenix, including positive and failure/abstain cases.
- B1: inspect one explicit assured client workflow.
- B2: verify a second client consumes the same contract without core semantic changes.

## Client/platform boundaries
Host integrations are adapters, never canonical semantics.

- ChatGPT: guaranteed coverage uses an explicit custom MCP/App workflow; do not claim global interception of native tools/web.
- Codex: plugin/app-backed workflow may reuse the same canonical service.
- OpenCode: hook/event interception is version-specific/experimental. Pin runtime/plugin/SDK, capability-probe exact installed behavior, and use an explicit assured MCP/tool path until coverage is proven.

## Operational safety before canary/enforce
Must have assigned owners and verification for:
- service/client authentication and least privilege
- secret/PII/sensitive-data minimization/redaction and trace retention/export policy
- untrusted source content treated as data, not instructions
- assessment freshness/revalidation/supersession policy
- pinned runtime/plugin/model/policy configs
- rollback/disable path

These are cross-cutting platform requirements, not extra epistemic layers.

## Shared contract rules
- machine-readable schemas at boundaries
- pre-release contract may evolve during `PRE_LOCK_AUDIT`; after lock/release, additive evolution by default and breaking changes require major version
- historical records/provenance are preserved
- system/dependency failures remain distinct from epistemic failures/policy decisions
- external OSS/vendor types never become canonical cross-layer types

## Verification commands
Current TypeScript baseline:
```bash
npm install
npx prettier --write .
npm run lint
npm run typecheck
npm run test
npm run build
```
After a lockfile is verified and committed, prefer `npm ci` in CI.

## Continuity protocol
`AGENTS.md` is the stable operating contract. `HANDOFF.md` is live checkpoint state.

Before ending substantive work:
1. record commands actually run and outcomes;
2. update `HANDOFF.md` with verified vs unverified state;
3. update any applicable `SliceVerificationRecord` from observed evidence only;
4. make the next action executable without conversation history;
5. reference relevant issues/commits.

Issue #4 is the continuity standard; issue #8 is the current plan-lock audit.