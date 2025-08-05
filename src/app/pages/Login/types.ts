export enum LoginStep {
  email,

  // Login flow
  selectTenant,
  password,

  // Reset password flow
  resetPasswordVerifyToken,
  resetPassword,
}

export enum LoginFlow {
  login,
  changePassword,
}
