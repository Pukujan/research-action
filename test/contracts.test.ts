import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv2020, { type AnySchema } from 'ajv/dist/2020.js';
import { describe, expect, it } from 'vitest';

type Fixture = {
  subjectId: string;
  inputRefs: Array<{ id: string }>;
  provenance: Array<{
    relation: string;
    subjectId: string;
    objectId: string;
  }>;
  payload: unknown;
};

function readJson<T>(path: string): T {
  const parsed: unknown = JSON.parse(readFileSync(resolve(path), 'utf8'));
  return parsed as T;
}

describe('Gate A contracts', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const envelopeSchema = readJson<AnySchema>(
    'schemas/assurance-envelope.schema.json',
  );
  const sourceAssessmentSchema = readJson<AnySchema>(
    'schemas/layer1/source-assessment.schema.json',
  );
  const fixture = readJson<Fixture>(
    'fixtures/v1/layer1-source-assessment.json',
  );

  it('validates the canonical envelope fixture', () => {
    const validate = ajv.compile(envelopeSchema);
    expect(validate(fixture), JSON.stringify(validate.errors)).toBe(true);
  });

  it('validates the Layer 1 payload fixture', () => {
    const validate = ajv.compile(sourceAssessmentSchema);
    expect(validate(fixture.payload), JSON.stringify(validate.errors)).toBe(true);
  });

  it('preserves derivation paths from the assessment to every input entity', () => {
    const derivedFrom = fixture.provenance
      .filter(
        (link) =>
          link.relation === 'wasDerivedFrom' &&
          link.subjectId === fixture.subjectId,
      )
      .map((link) => link.objectId);

    for (const input of fixture.inputRefs) {
      expect(derivedFrom).toContain(input.id);
    }
  });
});
