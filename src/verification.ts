export const DELIVERY_GATES = ['A', 'B0', 'B1', 'B2', 'C', 'D', 'E', 'F'] as const;
export type DeliveryGate = (typeof DELIVERY_GATES)[number];

export const RUNTIME_MODES = ['observe', 'warn', 'enforce'] as const;
export type RuntimeMode = (typeof RUNTIME_MODES)[number];

export const VALIDATION_PROFILES = ['A1', 'A2', 'A3', 'A4', 'A5'] as const;
export type ValidationProfile = (typeof VALIDATION_PROFILES)[number];

export const VERIFICATION_STATES = [
  'NOT_RUN',
  'PARTIAL',
  'VERIFIED',
  'FAILED'
] as const;
export type VerificationState = (typeof VERIFICATION_STATES)[number];

export const CHECK_STATUSES = ['PASS', 'FAIL', 'NOT_RUN', 'NOT_APPLICABLE'] as const;
export type CheckStatus = (typeof CHECK_STATUSES)[number];

export interface VerificationCheck {
  readonly name: string;
  readonly kind: string;
  readonly status: CheckStatus;
  readonly evidenceRef?: string;
  readonly summary?: string;
}

export interface SmokeScenario {
  readonly name: string;
  readonly expected: string;
  readonly observed?: string;
  readonly status: CheckStatus;
  readonly traceId?: string;
}

export interface ComponentVersion {
  readonly component: string;
  readonly version: string;
}

export interface HumanVerificationRef {
  readonly reviewerId?: string;
  readonly verdict: 'EXPECTED' | 'INCORRECT' | 'UNCLEAR';
  readonly evidenceRef?: string;
  readonly notes?: string;
}

/**
 * Engineering evidence that a delivery slice was actually exercised.
 * This is not a research epistemic state and does not replace AssuranceEnvelope.
 */
export interface SliceVerificationRecord {
  readonly schemaVersion: '1.0.0';
  readonly sliceId: string;
  readonly sliceVersion: string;
  readonly gate: DeliveryGate;
  readonly mode: RuntimeMode;
  readonly verificationState: VerificationState;
  readonly requiredValidationProfile?: ValidationProfile;
  readonly achievedValidationProfile?: ValidationProfile;
  readonly requirementRefs: readonly string[];
  readonly commitRefs: readonly string[];
  readonly componentVersions: readonly ComponentVersion[];
  readonly environmentFingerprint?: string;
  readonly checks: readonly VerificationCheck[];
  readonly smokeScenarios: readonly SmokeScenario[];
  readonly traceIds: readonly string[];
  readonly provRefs: readonly string[];
  readonly humanVerifications: readonly HumanVerificationRef[];
  readonly knownGaps: readonly string[];
  readonly proves: readonly string[];
  readonly doesNotProve: readonly string[];
  readonly producedAt: string;
}
