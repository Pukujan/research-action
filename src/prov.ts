import type { ProvRelation } from './contracts.js';

export const PROV_NAMESPACE = 'http://www.w3.org/ns/prov#';

export const PROV_O_RELATION_IRI = {
  used: `${PROV_NAMESPACE}used`,
  wasGeneratedBy: `${PROV_NAMESPACE}wasGeneratedBy`,
  wasDerivedFrom: `${PROV_NAMESPACE}wasDerivedFrom`,
  wasAttributedTo: `${PROV_NAMESPACE}wasAttributedTo`,
  wasAssociatedWith: `${PROV_NAMESPACE}wasAssociatedWith`,
  hadPrimarySource: `${PROV_NAMESPACE}hadPrimarySource`,
  wasQuotedFrom: `${PROV_NAMESPACE}wasQuotedFrom`,
  wasRevisionOf: `${PROV_NAMESPACE}wasRevisionOf`,
  alternateOf: `${PROV_NAMESPACE}alternateOf`,
  specializationOf: `${PROV_NAMESPACE}specializationOf`
} satisfies Readonly<Record<ProvRelation, string>>;

export function researchActionUrn(kind: string, ...parts: readonly string[]): string {
  const encoded = parts.map((part) => encodeURIComponent(part)).join(':');
  return `urn:research-action:${kind}:${encoded}`;
}
