// ===
// Roles
// ===
export const roles = ['super-admin', 'vive-admin', 'vive-agent'] as const

export type Role = typeof roles[number]
