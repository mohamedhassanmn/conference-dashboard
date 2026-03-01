export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth();

  const PUBLIC_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
    ROUTES.VERIFY,
  ];
  if (PUBLIC_ROUTES.includes(to.path as typeof PUBLIC_ROUTES[number])) return;

  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
});
