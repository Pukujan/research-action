export const LAYER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type LayerId = (typeof LAYER_IDS)[number];

export const EPISTEMIC_STATES = [
  'UNASSESSED',
  'IN_PROGRESS',
  'SUPPORTED',
  'CONTESTED',
  'INSUFFICIENT_EVIDENCE',
  'HARD_FAILED',
  'HUMAN_REVIEW_REQUIRED',
  'HUMAN_VERIFIED',
  'SUPERSEDED'
] as const;
export type EpistemicState = (typeof EPISTEMIC_STATES)[number];

export const FAILURE_CLASSES = [
  'TRANSPORT_ERROR',
  'DEPENDENCY_UNAVAILABLE',
  'MALFORMED_INPUT',
  'MALFORMED_EVALUATOR_OUTPUT',
  'POLICY_REJECTED',
  'EPISTEMIC_ABSTENTION',
  'EVIDENCE_HARD_FAILURE'
] as const;
export type FailureClass = (typeof FAILURE_CLASSES)[number];

export interface Failure {
  readonly code: string;
  readonly class: FailureClass;
  readonly message: string;
  readonly retryable: boolean;
  readonly details?: Readonly<Record<string, unknown>>;
}

export interface ProvEntityRef {
  /** Stable URI/URN identifying a W3C PROV Entity. */
  readonly id: string;
  readonly type: string;
  readonly contentHash?: string;
  readonly uri?: string;
  readonly version?: string;
}

export interface ProvActivityRef {
  /** Stable URI/URN identifying a W3C PROV Activity. */
  readonly id: string;
  readonly type: string;
}

export interface ProvAgentRef {
  /** Stable URI/URN identifying a W3C PROV Agent. */
  readonly id: string;
  readonly type: 'PERSON' | 'SOFTWARE_AGENT' | 'ORGANIZATION';
  readonly version?: string;
}

export const PROV_RELATIONS = [
  'used',
  'wasGeneratedBy',
  'wasDerivedFrom',
  'wasAttributedTo',
  'wasAssociatedWith',
  'hadPrimarySource',
  'wasQuotedFrom',
  'wasRevisionOf',
  'alternateOf',
  'specializationOf'
] as const;
export type ProvRelation = (typeof PROV_RELATIONS)[number];

export interface ProvenanceLink {
  readonly relation: ProvRelation;
  readonly subjectId: string;
  readonly objectId: string;
  readonly activityId?: string;
}

export interface TraceContext {
  /** W3C Trace Context trace-id, 32 lowercase hex characters. */
  readonly traceId: string;
  /** Optional span that produced this envelope, 16 lowercase hex characters. */
  readonly spanId?: string;
}

/**
 * Canonical cross-layer wire envelope.
 *
 * Layer payloads remain independent. Provenance uses compact references whose
 * semantics map to W3C PROV-DM / PROV-O; runtime tracing uses W3C Trace Context.
 */
export interface AssuranceEnvelope<TPayload> {
  readonly schemaVersion: '1.0.0';
  readonly layerId: LayerId;
  readonly runId: string;
  readonly trace: TraceContext;
  readonly provBundleId: string;
  readonly subjectId: string;
  readonly inputRefs: readonly ProvEntityRef[];
  readonly epistemicState: EpistemicState;
  readonly failures: readonly Failure[];
  readonly provenance: readonly ProvenanceLink[];
  readonly policyVersion: string;
  readonly evaluatorVersion: string;
  readonly producedAt: string;
  readonly payload: TPayload;
}
