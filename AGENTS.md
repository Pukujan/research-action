# AGENTS.md — Research → Action Verification

This repository is the canonical program/control-plane repository for the 9-layer Research → Action Verification system.

## First read
Before changing behavior, read:
1. `README.md`
2. `HANDOFF.md`
3. GitHub issues #1–#7
4. relevant schemas/tests

Do not rely on prior chat/session memory when repo state and chat disagree. The repository and observed execution results are authoritative.

## Epistemic discipline
Never collapse these states:
- `IMPLEMENTED` ≠ `VERIFIED`
- `PROJECT_CLAIMED` ≠ `REPRODUCED`
- `REPRODUCED` ≠ `TASK_MATCHED`
- `TASK_MATCHED` ≠ `BENCHMARKED`
- passing software tests ≠ good epistemic performance

Do not claim a test, benchmark, integration, service, or behavior passed unless the execution result was actually observed.

## Agent work allocation
When practical, separate assurance/spec/test authoring from execution evidence.

### Assurance/spec/test-authoring role
Owns program/layer SDD/PDD, acceptance criteria, deterministic test design/implementation, adversarial fixtures, property/fuzz/metamorphic specifications, mutation targets, benchmark/hidden-holdout design, interface decisions, and review of observed execution failures/results.

Artifacts authored in this role remain `IMPLEMENTED / UNVERIFIED` until an execution-capable environment produces observed evidence.

### Local execution role
Luna, local Codex/OpenCode, or another command-capable executor owns dependency installation, lockfiles, format/lint/typecheck/test/build execution, runtime property/fuzz/mutation runs, Docker/service bring-up, live OTel/Phoenix verification, integration smoke tests, runtime fault injection, and recording exact outputs/versions/trace identifiers in the layer `HANDOFF.md`.

Executors may repair implementation defects but must not weaken protocol invariants, schemas, hard failures, hidden-holdout protections, or epistemic gates merely to make tests pass. Semantic changes return to SDD/PDD first.

Layer-specific issue logs may define more exact role allocation. For Layer 1 see `Pukujan/source-ranker` issue #10.

## Policy ownership rule
Policy boundaries are frozen early, not deferred until the final end-to-end pipeline.

Core rule: **overlap is allowed for evidence/signals, shadow evaluation, diagnostics, and tests; consequential decision authority has exactly one canonical owner.**

- A layer may preserve or recompute a neighboring signal for comparison, but the shadow output is non-authoritative.
- A downstream layer must not silently re-decide or overwrite an upstream layer's canonical assessment.
- Policy ownership changes require a recorded architectural decision, versioned contract transition, and compatibility tests.
- Cross-layer tests must prove upstream hard failures and required review states cannot be bypassed downstream.

Canonical ownership matrix is in issue #5.

## LLM-as-judge rule
Use deterministic/executable oracles whenever a question is mechanically decidable. Use LLM judges only for semantic or qualitative ambiguity, with a versioned rubric, structured output, abstention, hidden-holdout calibration, and full trace/provenance.

- L1: bounded semantic source dimensions only; deterministic hard failures dominate.
- L2: advisory for fuzzy span/location mapping; deterministic grounding is authoritative.
- L3: primary intended LLM-judge layer for semantic support/contradiction, calibrated against human-labeled hidden data.
- L4: non-authoritative; ingestion policy is deterministic.
- L5: may classify ambiguous intended-use text into a fixed taxonomy; policy thresholds remain deterministic.
- L6: LLM judge is prohibited as the final release oracle.
- L7: advisory comparator; benchmark evidence and human-approved policy own adoption decisions.
- L8: strong rubric-bounded use for plan/test sufficiency, but actual execution results remain separate evidence.
- L9: explanatory only; provenance completeness/integrity is deterministic.

LLM trajectory judges are secondary detectors; deterministic sandbox/test/permission protections come first. Never let majority votes from correlated judges masquerade as independent evidence. See issue #7.

## Program methodology
### SDD — mandatory before implementation at contract surfaces
Use for cross-layer schemas, state meanings, hard failures, API/MCP/plugin contracts, error vocabulary, provenance, policy, and versioning.

### PDD / property-driven protocol design — mandatory at boundaries and gates
Specify invariants for state transitions, retries/idempotency, evidence-root independence, release gates, and HITL escalation. Make properties executable where practical.

### TDD — mandatory for deterministic code
Use for parsers, canonicalization, version/time checks, hard failures, schema validation, policy, state transitions, adapters, provenance construction, and migrations.

### Property/fuzz testing — required where input spaces are broad
URLs, identifiers, dates/versions, schema parsing, malformed provider output, adapters, and state machines.

### Metamorphic testing — required for semantic invariants
Examples: duplicate origins cannot increase independence; adding a hard failure cannot improve admissibility; stale/wrong-version evidence cannot improve fit.

### Mutation testing — required for safety-critical deterministic gates
Hard failures, policy thresholds, evidence-root accounting, escalation, ACCEPT/ABSTAIN/REJECT transitions, and provenance enforcement. Do not waste mutation budget on trivial DTOs/generated glue.

### Hidden holdouts — required for empirical/LLM/IR components
Never tune prompts/models/thresholds against protected release-gate labels. Keep visible dev data and hidden holdouts separate.

### IR evaluation — required wherever evidence is retrieved
Measure retrieval separately from verification: Recall@k, MRR/NDCG, primary-source recall, counterevidence recall, temporal/version errors, lineage clustering.

### HITL — selective
Use for benchmark adjudication, high-risk uncertainty, credible-source conflict, lineage merge/split, authority overrides, and final ADOPT/EXTEND/COMPOSE/REJECT decisions.

### OTel — mandatory from first executable slice
Use W3C trace context. Record structured inputs/outputs, evidence refs, decisions, versions, failures, and human interventions. Never record private chain-of-thought.

### W3C PROV — canonical durable provenance semantics
Use PROV-DM / PROV-O concepts for Entity, Activity, Agent and derivation/attribution relations. OTel is operational tracing; PROV is durable semantic provenance.

### Agentic coding validation — risk-gated
Issue #6 defines the shared coding-agent validation stack. Use as applicable:
- independent hidden acceptance + regression (`FAIL_TO_PASS` / `PASS_TO_PASS`)
- reproducible sandbox/configuration
- differential/oracle testing
- repeated-run reliability and uncertainty
- trajectory/tamper validation
- idempotency and state-machine/sequence tests
- mutation testing of critical evaluators
- security/adversarial checks
- performance/resource regression checks
- long-horizon reliability evaluation for autonomous coding workflows

Layer 5 chooses the required assurance level for the risk/change class; Layer 8 verifies the plan/tests satisfy it; actual execution results remain evidence artifacts, not opinions.

### TLA+ — conditional
Use for meaningful async/distributed state protocols, retries, queues, leases, stale completions, or multi-stage promotion. Do not use it to prove empirical ranking quality.

### Lean 4 — optional / not initial
Only if a small pure evidence/admissibility calculus emerges whose mathematical properties are worth proving.

### Fault injection — required before enforcement/production
Dependency outages, timeouts, malformed outputs, retries, stale cache, DB conflicts, telemetry outages, worker crashes. Assurance dependency failure must not become ACCEPT.

### Chaos engineering — later/conditional
Only after a real distributed production topology exists. Prefer deterministic fault injection first.

## Cross-layer architecture
- This repo owns canonical contracts, methodology, provenance semantics, telemetry conventions, compatibility rules, policy vocabulary/ownership rules, agentic-validation vocabulary, LLM-judge governance, and cross-layer fixtures.
- Layer repos own layer-specific implementation and live handoff state.
- External OSS/services are behind adapters and must not define canonical cross-layer types.
- Keep layer implementations replaceable.

## Shared contract rules
- Machine-readable schemas at boundaries.
- Additive evolution by default; breaking changes require a major schema version.
- Preserve historical records and provenance; do not silently rewrite past assessments.
- Keep runtime/system failures distinct from epistemic failures and policy decisions.
- Every important output must point back to exact upstream artifacts/assessments.

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
`AGENTS.md` is the stable operating contract. Do not edit it mechanically every commit.

`HANDOFF.md` is the live checkpoint. Update it whenever substantive work changes architecture, observable behavior, verification state, benchmark state, blockers, or next steps. Tiny formatting/comment-only changes do not require handoff churn.

Before ending substantive work:
1. record commands/tests actually run and outcomes;
2. update `HANDOFF.md` with verified vs unverified state;
3. make the next step executable without conversation history;
4. reference active issue(s) and relevant commits.

See GitHub issue #4 for the continuity standard.
