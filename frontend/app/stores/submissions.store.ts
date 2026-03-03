import { defineStore } from "pinia";

export interface Author {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  organization: string;
  webpage: string | null;
}

export interface SubmissionState {
  submission_id: number | null;
  title: string;
  keywords: string[];
  authors: Author[];
  abstract_file_key: string | null;
  supplementary_file_key: string | null;
  status: string;
  isLoading: boolean;
  error: string | null;
}

const emptyAuthor = (): Author => ({
  first_name: "",
  last_name: "",
  email: "",
  country: "",
  organization: "",
  webpage: null,
});

export const useSubmissionStore = defineStore("submission", {
  state: (): SubmissionState => ({
    submission_id: null,
    title: "",
    keywords: [],
    authors: [emptyAuthor()],
    abstract_file_key: null,
    supplementary_file_key: null,
    status: "draft",
    isLoading: false,
    error: null,
  }),

  getters: {
    isSubmitted: (state: SubmissionState): boolean =>
      state.status === "submitted",
    hasSubmission: (state: SubmissionState): boolean =>
      state.submission_id !== null,
  },

  actions: {
    populate(data: Partial<SubmissionState>) {
      Object.assign(this, {
        submission_id: data.submission_id ?? null,
        title: data.title ?? "",
        keywords: data.keywords ?? [],
        authors: data.authors?.length ? data.authors : [emptyAuthor()],
        abstract_file_key: data.abstract_file_key ?? null,
        supplementary_file_key: data.supplementary_file_key ?? null,
        status: data.status ?? "draft",
      });
    },

    addAuthor() {
      this.authors.push(emptyAuthor());
    },

    removeAuthor(index: number) {
      if (this.authors.length > 1) this.authors.splice(index, 1);
    },

    setError(msg: string | null) {
      this.error = msg;
    },
  },
});
