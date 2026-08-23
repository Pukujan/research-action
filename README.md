# Research → Action Verification

This repository is the canonical control plane for the 9-layer Research → Action Verification program.

It owns **cross-layer contracts and assurance methodology**, not layer-specific business logic.

## Current gate

**Gate A — Contract ready**

Before Layer 1 implementation deepens, this repo must define and test:

- the versioned `AssuranceEnvelope<T>` wire contract;
- shared epistemic-state and failure vocabularies;
- W3C PROV-compatible provenance identifiers and relations;
- OpenTelemetry correlation conventions;
- schema/version compatibility rules;
- canonical cross-layer fixtures.

See issues #1–#3 for the SWE foundation, program methodology, and W3C PROV decision.

## Architecture rule

Each layer is independently replaceable. External systems such as INITE Brain, ChatGPT, OpenCode, Veriscope, or future implementations integrate through adapters and must not redefine the cross-layer contract.

```text
client / layer implementation
          |
          v
      adapter
          |
          v
AssuranceEnvelope<T>
          |
          +--> W3C PROV semantic mapping
          +--> W3C trace context / OTel
          +--> downstream assurance layer
```

## Nine layers

1. Source suitability / assurance
2. Exact artifact/evidence grounding
3. Semantic claim-support verification
4. Deterministic trusted-knowledge ingestion
5. Risk-tier policy
6. Research-to-action gate
7. Build-vs-reuse verification
8. Evidence behind plans, methods, and tests
9. Cross-layer provenance / assurance chain

## Development rule

Build vertical, inspectable slices. A slice is not complete until inputs, outputs, provenance, trace IDs, evaluator/policy versions, and human intervention are visible.

Architecture and reuse decisions remain provisional until task-matched benchmark evidence exists.
