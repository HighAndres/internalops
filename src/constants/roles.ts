export type UserRole = 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'VIEWER'

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  MANAGER: 'Gerente',
  TECHNICIAN: 'Técnico',
  VIEWER: 'Viewer',
}

export const ROLE_COLORS: Record<UserRole, string> = {
  ADMIN: 'text-[#38D84E] bg-[#38D84E]/10',
  MANAGER: 'text-blue-400 bg-blue-400/10',
  TECHNICIAN: 'text-yellow-400 bg-yellow-400/10',
  VIEWER: 'text-gray-400 bg-gray-400/10',
}
