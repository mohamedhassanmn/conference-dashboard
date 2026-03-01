export const useAuth = () => {
  const token = useCookie<string | null>("auth_token", {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, // must be false so JS can read it for Bearer header
  });

  const isLoggedIn = computed(() => !!token.value);

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const clearToken = () => {
    token.value = null;
  };

  const logout = () => {
    clearToken();
    navigateTo("/login");
  };

  return { token, setToken, clearToken, isLoggedIn, logout };
};
