import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { AnySchema } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";

type Fixture = {
  layerId: number;
  subjectId: string;
  inputRefs: Array<{ id: string }>;
  decisionContext: {
    owningLayer: number;
    scope: string;
    policyId: string;
    authority: string;
  };
  provenance: Array<{
    relation: string;
    subjectId: string;
    objectId: string;
  }>;
  payload: unknown;
};

type SliceFixture = {
  verificationState: string;
  checks: Array<{ status: string }>;
  proves: string[];
  doesNotProve: string[];
};

type ExecutedSliceFixture = SliceFixture & {
  commitRefs: string[];
  requiredValidationProfile: string;
  achievedValidationProfile: string;
};

type B0Fixture = SliceFixture & {
  traceIds: string[];
  knownGaps: string[];
  humanVerifications: Array<{
    verdict: string;
    reviewerId?: string;
    evidenceRef?: string;
    notes?: string;
  }>;
};

function readJson<T>(path: string): T {
  const parsed: unknown = JSON.parse(readFileSync(resolve(path), "utf8"));
  return parsed as T;
}

describe("Gate A contracts", () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const envelopeSchema = readJson<AnySchema>(
    "schemas/assurance-envelope.schema.json",
  );
  const sourceAssessmentSchema = readJson<AnySchema>(
    "schemas/layer1/source-assessment.schema.json",
  );
  const sliceVerificationSchema = readJson<AnySchema>(
    "schemas/slice-verification-record.schema.json",
  );
  const fixture = readJson<Fixture>(
    "fixtures/v1/layer1-source-assessment.json",
  );
  const sliceFixture = readJson<SliceFixture>(
    "fixtures/v1/slice-verification-gate-a.json",
  );
  const executedFixture = readJson<ExecutedSliceFixture>(
    "fixtures/v1/slice-verification-gate-a-executed.json",
  );

  it("validates the canonical envelope fixture", () => {
    const validate = ajv.compile(envelopeSchema);
    expect(validate(fixture), JSON.stringify(validate.errors)).toBe(true);
  });

  it("validates the Layer 1 payload fixture", () => {
    const validate = ajv.compile(sourceAssessmentSchema);
    expect(validate(fixture.payload), JSON.stringify(validate.errors)).toBe(
      true,
    );
  });

  it("preserves derivation paths from the assessment to every input entity", () => {
    const derivedFrom = fixture.provenance
      .filter(
        (link) =>
          link.relation === "wasDerivedFrom" &&
          link.subjectId === fixture.subjectId,
      )
      .map((link) => link.objectId);

    for (const input of fixture.inputRefs) {
      expect(derivedFrom).toContain(input.id);
    }
  });

  it("makes authoritative decision ownership explicit and layer-consistent", () => {
    expect(fixture.decisionContext.authority).toBe("AUTHORITATIVE");
    expect(fixture.decisionContext.owningLayer).toBe(fixture.layerId);
    expect(fixture.decisionContext.scope.length).toBeGreaterThan(0);
    expect(fixture.decisionContext.policyId.length).toBeGreaterThan(0);
  });

  it("validates the pre-execution slice verification fixture", () => {
    const validate = ajv.compile(sliceVerificationSchema);
    expect(validate(sliceFixture), JSON.stringify(validate.errors)).toBe(true);
  });

  it("does not let the pre-execution fixture pretend Gate A has run", () => {
    expect(sliceFixture.verificationState).toBe("NOT_RUN");
    expect(
      sliceFixture.checks.every((check) => check.status === "NOT_RUN"),
    ).toBe(true);
    expect(sliceFixture.doesNotProve.length).toBeGreaterThan(0);
  });

  it("validates the executed slice verification fixture", () => {
    const validate = ajv.compile(sliceVerificationSchema);
    expect(validate(executedFixture), JSON.stringify(validate.errors)).toBe(
      true,
    );
  });

  it("validates the human-annotated B0 slice verification fixture", () => {
    const b0Fixture = readJson<B0Fixture>(
      "fixtures/v1/slice-verification-b0-executed.json",
    );
    const validate = ajv.compile(sliceVerificationSchema);
    expect(validate(b0Fixture), JSON.stringify(validate.errors)).toBe(true);
    expect(b0Fixture.verificationState).toBe("VERIFIED");
    expect(b0Fixture.checks.every((check) => check.status === "PASS")).toBe(
      true,
    );
    expect(b0Fixture.traceIds.length).toBeGreaterThan(0);
    expect(b0Fixture.doesNotProve.length).toBeGreaterThan(0);
  });

  it("keeps B0 VERIFIED only while every observed trace carries a human EXPECTED verdict", () => {
    const b0Fixture = readJson<B0Fixture>(
      "fixtures/v1/slice-verification-b0-executed.json",
    );
    expect(b0Fixture.humanVerifications.length).toBe(b0Fixture.traceIds.length);
    for (const verification of b0Fixture.humanVerifications) {
      expect(verification.verdict).toBe("EXPECTED");
      expect(verification.reviewerId).toBeTruthy();
      expect(verification.evidenceRef).toBeTruthy();
      expect(b0Fixture.traceIds).toContain(
        (verification.evidenceRef ?? "").split("/").pop(),
      );
    }
    expect(
      b0Fixture.humanVerifications.every((verification) =>
        (verification.notes ?? "").includes("blind span-by-span audit"),
      ),
    ).toBe(true);
  });

  it("keeps the executed fixture's VERIFIED claim backed by commit refs and passing checks", () => {
    expect(executedFixture.verificationState).toBe("VERIFIED");
    expect(executedFixture.requiredValidationProfile).toBe("A1");
    expect(executedFixture.achievedValidationProfile).toBe("A1");
    expect(executedFixture.commitRefs.length).toBeGreaterThan(0);
    expect(
      executedFixture.checks.every((check) => check.status === "PASS"),
    ).toBe(true);
    expect(executedFixture.doesNotProve.length).toBeGreaterThan(0);
  });
});
