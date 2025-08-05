type MakeAvatarFromUserId = (
  tenantUrl: string,
  userId: number,
  // TODO: add typed size string literal
  size?: string
) => string;

const makeAvatarFromUserId: MakeAvatarFromUserId = (
  tenantUrl,
  userId,
  size = 'large'
) => `${tenantUrl}/api/v1/avatar/${userId}?size=${size}`;

export default makeAvatarFromUserId;
