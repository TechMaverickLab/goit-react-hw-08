export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => Boolean(state.auth.token);
export const selectAuthError = (state) => state.auth.error;
export const selectLoading = (state) => state.auth.loading;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;