# Gate A verification

Gate A is **implemented but not verified** until CI proves the contract package can install, format-check, lint, typecheck, validate fixtures, test provenance invariants, and build.

Required before promotion:

- [ ] dependencies install successfully
- [ ] formatting check passes
- [ ] lint passes
- [ ] strict TypeScript passes
- [ ] canonical envelope fixture validates
- [ ] Layer 1 SourceAssessment fixture validates
- [ ] provenance derivation invariant passes
- [ ] contract package builds
- [ ] a reproducible lockfile is committed after the first verified install

W3C PROV is the semantic provenance model; OTel is runtime correlation. Passing this gate does not validate Layer 1 epistemic quality.
