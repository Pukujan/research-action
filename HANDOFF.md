# HANDOFF.md — Research → Action Verification

## Checkpoint
- Date: 2026-08-23
- Repository: `Pukujan/research-action`
- Branch: `main`
- Current program gate: **Gate A — contract foundation**
- Current epistemic state: **IMPLEMENTED / POLICY OWNERSHIP + VALIDATION METHOD EXPANDED / NOT YET EXECUTION-VERIFIED**

## What exists
- Canonical 9-layer program plan and methodology in issues #1–#6.
- Canonical `AssuranceEnvelope<T>` and shared epistemic/failure vocabularies.
- W3C PROV-compatible provenance references and relation vocabulary.
- W3C trace-context / OTel semantic conventions.
- Layer 1 `SourceAssessment` contract/schema.
- Canonical fixture and initial schema/provenance contract tests.
- Strict TypeScript / ESLint / Prettier / Vitest scaffolding.
- CI workflow scaffold.
- Stable agent work-allocation rule in `AGENTS.md`.
- Canonical non-overlapping policy ownership matrix in issue #5.
- Program-wide agentic coding validation standard in issue #6.

## New architecture decisions
### Policy ownership
Issue #5 is canonical.

Rule: **overlap is allowed for evidence/signals/shadow evaluation/diagnostics; consequential decision authority has exactly one canonical owning layer.**

Do not defer semantic ownership until the final E2E build. Boundaries are specified now; enforcement and cross-layer non-bypass tests become executable as the E2E slice appears.

Layer summary:
- L1 source suitability
- L2 exact artifact/evidence grounding
- L3 semantic claim support
- L4 trusted-knowledge ingestion eligibility/integrity
- L5 risk-tier and required-assurance policy
- L6 research-to-action release gate
- L7 build-vs-reuse decision
- L8 evidence sufficiency of plans/methods/tests
- L9 provenance/assurance-chain completeness

Layer 9 is cross-cutting but does not re-decide Layers 1–8.

### Agentic coding validation
Issue #6 extends the methodology with:
- independent hidden acceptance + regression (`FAIL_TO_PASS` / `PASS_TO_PASS`)
- reproducible sandbox/configuration
- differential/oracle testing
- repeated-run reliability / uncertainty / cost and latency
- trajectory/tamper validation
- idempotency testing
- executable state-machine/sequence testing
- evaluator mutation testing
- security/adversarial validation
- performance/resource regression checks
- long-horizon reliability evaluation when relevant

Suggested internal assurance levels are A1 Development through A5 Critical. Layer 5 chooses the required level by risk; Layer 8 verifies the proposed verification plan satisfies it; actual execution results remain evidence artifacts; Layer 6 consumes them for action/deployment gating; Layer 9 preserves provenance.

## Methodology status
- SDD/PDD: active now for contracts, policy semantics, state transitions and ownership boundaries.
- TDD: active now for deterministic code.
- hidden acceptance/regression: required for consequential behavior-changing coding tasks where feasible.
- property/fuzz/metamorphic: required as corresponding modules become executable.
- differential: use when a trusted oracle/reference exists.
- repeated-run reliability: for agent/model-dependent empirical evaluation, not every deterministic CI test.
- mutation: critical product gates and critical evaluators/tests.
- trajectory/tamper validation: protect tests, schemas, policies and hidden holdouts in agentic coding workflows.
- idempotency/state-machine testing: for side-effecting/stateful workflows before relying only on formal methods.
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
- Files/contracts/issues are committed to GitHub.
- Policy ownership and expanded validation methodology are documented.

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
- #5 policy ownership matrix / non-overlapping decision authority
- #6 agentic coding validation standard

## Exact next steps
1. Luna/local executor verifies `research-action` and `source-ranker` using their handoffs.
2. Fix only observed failures; semantic changes return to SDD/PDD.
3. Commit verified lockfiles and switch CI to `npm ci` only after successful execution.
4. Run the first real INITE Brain → SourceAssessment → OTel/Phoenix slice.
5. Add OpenCode observe-mode and inspect one real research query.
6. As cross-layer mocks/implementations appear, add tests proving downstream layers cannot bypass upstream hard-failure/review states and that each policy decision reports its canonical owning layer.

## Do not repeat / avoid
- Do not invent a parallel provenance model instead of W3C PROV.
- Do not make multiple layers authoritative for the same policy question.
- Do not prohibit useful diagnostic/shadow overlap; mark it non-authoritative instead.
- Do not let implementation-specific Brain/OpenCode/ChatGPT types enter canonical contracts.
- Do not treat agent-authored tests as the sole independent oracle for consequential changes.
- Do not claim tests/benchmarks/integrations passed without observed execution.

## New-agent handoff
Start by reading `AGENTS.md`, this file, and issues #1–#6. Current priority remains execution verification, then the observable Layer 1 vertical slice. Policy ownership is already specified and should not be postponed until the final E2E implementation.
