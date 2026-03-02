export type SubmissionStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "accepted"
  | "rejected"
  | "withdrawn";

export interface SubmissionAuthor {
  author_id: number;
  submission_id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  organization: string;
  webpage: string | null;
  author_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Submission {
  submission_id: number;
  user_id: number;
  title: string;
  keywords: string[];
  abstract_file_key: string | null;
  supplementary_file_key: string | null;
  status: SubmissionStatus;
  submitted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface SubmissionFull extends Submission {
  authors: SubmissionAuthor[];
}

export interface CreateAuthorDTO {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  organization: string;
  webpage?: string;
}

export interface CreateSubmissionDTO {
  title: string;
  keywords: string[];
  authors: CreateAuthorDTO[];
}

export interface UpdateSubmissionDTO {
  title?: string;
  keywords?: string[];
  authors?: CreateAuthorDTO[];
}

export interface SubmissionFileDTO {
  abstract_file_key?: string;
  supplementary_file_key?: string;
}
