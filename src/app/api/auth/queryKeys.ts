const MODULE_KEY = 'auth';

export default {
  badges: (userId: number) => [MODULE_KEY, 'user-badges', userId],
  authenticatedUser: () => [MODULE_KEY, 'authenticated-user'],
  getEnabledModules: () => [MODULE_KEY, 'get-enabled-modules'],
};
