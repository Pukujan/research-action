import type { ProvEntityRef } from './contracts.js';

export const SOURCE_DECISIONS = [
  'ACCEPT',
  'WARN',
  'ABSTAIN',
  'REJECT',
  'HUMAN_REVIEW'
] as const;
export type SourceDecision = (typeof SOURCE_DECISIONS)[number];

export const DIMENSION_STATES = [
  'STRONG',
  'ADEQUATE',
  'WEAK',
  'UNKNOWN',
  'NOT_APPLICABLE'
] as const;
export type DimensionState = (typeof DIMENSION_STATES)[number];

export const CLAIM_CLASSES = [
  'SOFTWARE_SPECIFICATION',
  'SOFTWARE_RUNTIME_BEHAVIOR',
  'SECURITY_CLAIM',
  'PRODUCT_TECHNOLOGY_COMPARISON',
  'OTHER'
] as const;
export type ClaimClass = (typeof CLAIM_CLASSES)[number];

export const RISK_TIERS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export type RiskTier = (typeof RISK_TIERS)[number];

export interface IntendedUse {
  readonly category: string;
  readonly riskTier: RiskTier;
  readonly description?: string;
}

export interface AssessmentDimension {
  readonly state: DimensionState;
  /** Calibrated confidence is optional and never substitutes for the state. */
  readonly confidence?: number;
  readonly reasons: readonly string[];
  readonly evidenceRefs: readonly string[];
}

export interface SourceAssessmentDimensions {
  readonly authorityToClaim: AssessmentDimension;
  readonly directness: AssessmentDimension;
  readonly methodology: AssessmentDimension;
  readonly reproducibility: AssessmentDimension;
  readonly temporalFit: AssessmentDimension;
  readonly versionFit: AssessmentDimension;
  readonly independence: AssessmentDimension;
  readonly transparency: AssessmentDimension;
  readonly conflictOfInterest: AssessmentDimension;
}

/**
 * Layer 1 payload. Deliberately contains no universal source credibility score.
 * Sufficiency is relative to claim + source + intended use.
 */
export interface SourceAssessment {
  readonly claimRef: ProvEntityRef;
  readonly sourceRef: ProvEntityRef;
  readonly claimClass: ClaimClass;
  readonly intendedUse: IntendedUse;
  readonly sourceType: string;
  readonly evidenceRootId: string;
  readonly dimensions: SourceAssessmentDimensions;
  readonly decision: SourceDecision;
  readonly sufficientFor: readonly string[];
  readonly insufficientFor: readonly string[];
  readonly summary: string;
}
