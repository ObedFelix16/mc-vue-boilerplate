// ===
// Permissions
// ===
export const permissions = [
  'security-user:insert',
  'security-user:update',
  'security-user:delete',
] as const

export type Permission = typeof permissions[number]
