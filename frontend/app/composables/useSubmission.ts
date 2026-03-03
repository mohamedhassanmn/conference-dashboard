import { useSubmissionStore } from "~/stores/submissions.store";

export const useSubmission = () => {
  const api = useApi();
  const store = useSubmissionStore();

  const getErrorMessage = (err: any): string => {
    if (err?.data?.message) return err.data.message;
    if (import.meta.env.DEV && err?.message) return err.message;
    return "Something went wrong. Please try again.";
  };

  const validateAuthors = (): string | null => {
    if (store.authors.length === 0) return "At least one author is required";
    for (let i = 0; i < store.authors.length; i++) {
      const a = store.authors[i];
      if (!a?.first_name?.trim())
        return `Author ${i + 1}: First name is required`;
      if (!a?.last_name?.trim())
        return `Author ${i + 1}: Last name is required`;
      if (!a?.email?.trim()) return `Author ${i + 1}: Email is required`;
      if (!a?.country?.trim()) return `Author ${i + 1}: Country is required`;
      if (!a?.organization?.trim())
        return `Author ${i + 1}: Organization is required`;
    }
    return null;
  };

  const validateTitle = (title: string): string | null => {
    if (!title.trim()) return "Title is required";
    return null;
  };

  const validateKeywords = (keywords: string[]): string | null => {
    if (keywords.length === 0) return "At least one keyword is required";
    return null;
  };

  const validateAbstract = (): string | null => {
    if (!store.abstract_file_key) return "Abstract file is required";
    return null;
  };

  const fetchMySubmission = async () => {
    store.isLoading = true;
    store.error = null;
    try {
      const result = await $fetch<any>("/api/submissions/me", {
        headers: { Authorization: `Bearer ${useAuth().token.value}` },
      });
      if (result) store.populate(result);
    } catch (err: any) {
      if (err?.response?.status !== 404) {
        store.setError(getErrorMessage(err));
      }
    } finally {
      store.isLoading = false;
    }
  };

  const saveAuthors = async () => {
    const err = validateAuthors();
    if (err) {
      store.setError(err);
      return;
    }
    store.isLoading = true;
    store.error = null;
    try {
      const authors = store.authors.map(({ webpage, ...rest }) => ({
        ...rest,
        ...(webpage ? { webpage } : {}),
      }));

      if (store.hasSubmission) {
        await api.patch("/submissions/me", { authors });
      } else {
        // First step — create the submission with authors
        // title and keywords can be empty strings for now, filled in later steps
        const result = await api.post<any>("/submissions", {
          title: store.title || "Draft",
          keywords: store.keywords.length ? store.keywords : ["draft"],
          authors,
        });
        store.populate(result);
      }
    } catch (err: any) {
      store.setError(getErrorMessage(err));
      throw err;
    } finally {
      store.isLoading = false;
    }
  };

  const saveTitleAndAbstract = async (title: string, abstractFile?: File) => {
    const err = validateTitle(title);
    if (err) {
      store.setError(err);
      return;
    }
    if (!abstractFile && !store.abstract_file_key) {
      store.setError("Abstract file is required");
      return;
    }
    store.isLoading = true;
    store.error = null;
    try {
      await api.patch("/submissions/me", { title });
      store.title = title;

      if (abstractFile) {
        const formData = new FormData();
        formData.append("file", abstractFile);
        const result = await $fetch<any>("/api/submissions/me/abstract", {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${useAuth().token.value}` },
        });
        store.abstract_file_key = result.abstract_file_key;
      }
    } catch (err: any) {
      store.setError(getErrorMessage(err));
      throw err;
    } finally {
      store.isLoading = false;
    }
  };

  const saveKeywords = async (keywords: string[]) => {
    const err = validateKeywords(keywords);
    if (err) {
      store.setError(err);
      return;
    }
    store.isLoading = true;
    store.error = null;
    try {
      await api.patch("/submissions/me", { keywords });
      store.keywords = keywords;
    } catch (err: any) {
      store.setError(getErrorMessage(err));
      throw err;
    } finally {
      store.isLoading = false;
    }
  };

  const saveSupplementary = async (file: File) => {
    store.isLoading = true;
    store.error = null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await $fetch<any>("/api/submissions/me/supplementary", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${useAuth().token.value}` },
      });
      store.supplementary_file_key = result.supplementary_file_key;
    } catch (err: any) {
      store.setError(getErrorMessage(err));
      throw err;
    } finally {
      store.isLoading = false;
    }
  };

  const submitSubmission = async () => {
    const authorsErr = validateAuthors();
    if (authorsErr) {
      store.setError(authorsErr);
      return;
    }

    const titleErr = validateTitle(store.title);
    if (titleErr) {
      store.setError(titleErr);
      return;
    }

    const keywordsErr = validateKeywords(store.keywords);
    if (keywordsErr) {
      store.setError(keywordsErr);
      return;
    }

    const abstractErr = validateAbstract();
    if (abstractErr) {
      store.setError(abstractErr);
      return;
    }
    store.isLoading = true;
    store.error = null;
    try {
      const result = await api.post<any>("/submissions/me/submit", {});
      store.populate(result);
    } catch (err: any) {
      store.setError(getErrorMessage(err));
      throw err;
    } finally {
      store.isLoading = false;
    }
  };

  return {
    fetchMySubmission,
    saveAuthors,
    saveTitleAndAbstract,
    saveKeywords,
    saveSupplementary,
    submitSubmission,
  };
};
