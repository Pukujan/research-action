export const OTEL_ATTRIBUTES = {
  runId: 'research.run_id',
  layer: 'assurance.layer',
  subjectId: 'assurance.subject_id',
  epistemicState: 'assurance.epistemic_state',
  decision: 'assurance.decision',
  policyVersion: 'assurance.policy_version',
  evaluatorVersion: 'assurance.evaluator_version',
  hardFailureCount: 'assurance.hard_failure_count',
  provBundleId: 'prov.bundle_id',
  provEntityId: 'prov.entity_id',
  provActivityId: 'prov.activity_id'
} as const;

export const OTEL_SPAN_NAMES = {
  researchRequest: 'research.request',
  sourceRetrieve: 'source.retrieve',
  sourceCanonicalize: 'source.canonicalize',
  sourceLineage: 'source.lineage',
  sourceAssess: 'source.assess',
  hardFailureCheck: 'hard_failure.check',
  counterevidenceRetrieve: 'counterevidence.retrieve',
  policyDecide: 'policy.decide',
  humanReview: 'hitl.review',
  resultRelease: 'result.release'
} as const;

export function isW3CTraceId(value: string): boolean {
  return /^[0-9a-f]{32}$/.test(value) && value !== '00000000000000000000000000000000';
}

export function isW3CSpanId(value: string): boolean {
  return /^[0-9a-f]{16}$/.test(value) && value !== '0000000000000000';
}
