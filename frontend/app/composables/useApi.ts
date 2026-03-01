import type { AsyncDataOptions } from "nuxt/app";
import type { FetchOptions } from "ofetch";

export const useApi = () => {
  const BASE = "/api";
  const { token } = useAuth();

  const getHeaders = (): Record<string, string> => {
    if (token.value) {
      return { Authorization: `Bearer ${token.value}` };
    }
    return {};
  };

  const get = <T>(endpoint: string, options?: AsyncDataOptions<T>) => {
    return useAsyncData<T>(
      endpoint,
      () =>
        $fetch<T>(`${BASE}${endpoint}`, {
          headers: getHeaders(),
        }),
      options,
    );
  };

  const mutate = async <T>(
    endpoint: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    body?: unknown,
  ): Promise<T> => {
    return $fetch<T>(`${BASE}${endpoint}`, {
      method,
      body: body as FetchOptions["body"],
      headers: getHeaders(),
    });
  };

  const post = <T>(endpoint: string, body?: unknown) =>
    mutate<T>(endpoint, "POST", body);

  const put = <T>(endpoint: string, body?: unknown) =>
    mutate<T>(endpoint, "PUT", body);

  const patch = <T>(endpoint: string, body?: unknown) =>
    mutate<T>(endpoint, "PATCH", body);

  const del = <T>(endpoint: string) => mutate<T>(endpoint, "DELETE");

  return { get, post, put, patch, del };
};
