/**
 * The public UI must never infer truth or confidence from a source URL alone.
 * Content review and publication approval are independent states.
 */
export type EvidenceType =
  | "measured-observation"
  | "documented-incident"
  | "experimental-demonstration"
  | "research-finding"
  | "reported-allegation"
  | "modeled-estimate"
  | "forecast"
  | "expert-assessment"
  | "hypothesis";

export type ReviewStatus = "candidate" | "source-checked" | "reviewed" | "approved" | "retired";

export interface SourceRecord {
  sourceId: string;
  canonicalUrl: string;
  title: string;
  publisher: string;
  authors?: string[];
  publishedAt?: string;
  checkedAt?: string;
  documentType: string;
  sourceClass: "primary" | "secondary";
  accessNotes?: string;
}

export interface ClaimRecord {
  claimId: string;
  wording: string;
  sourceIds: string[];
  evidenceType: EvidenceType;
  reviewStatus: ReviewStatus;
  lastVerified?: string;
  observationPeriod?: string;
  geography?: string;
  units?: string;
  denominator?: string;
  limitations: string[];
}

export interface CaseRecord {
  caseId: string;
  occurredAt: string;
  summary: string;
  sourceIds: string[];
  evidenceType: EvidenceType;
  attribution: "confirmed" | "contested" | "unknown";
  reviewStatus: ReviewStatus;
  limitations: string[];
}

export interface FigureRecord {
  figureId: string;
  title: string;
  claimIds: string[];
  units?: string;
  period?: string;
  geography?: string;
  baseline?: string;
  dataTransformations: string[];
  altDescription: string;
  reviewStatus: ReviewStatus;
}

/** Content may render publicly only after explicit human editorial approval. */
export function isApproved(item: { reviewStatus: ReviewStatus }): boolean {
  return item.reviewStatus === "approved";
}
