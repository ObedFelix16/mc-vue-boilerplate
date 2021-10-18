import { api } from '@/services/client'
import { LoginModel, securityService } from '@/services/modules/security'
import appStorage from '@/utils/appStorage'
import { computed, ref, watch } from '@vue/composition-api'
import jwtDecode from 'jwt-decode'
import { RouteConfig } from 'vue-router'
import { Permission } from './permissions'
import { Role } from './roles'

export const auth = useAuth({
  localStorageKey: 'auth-token',
  securityScheme: 'bearer',
})

export function useAuth({
  localStorageKey,
  securityScheme,
}: UseAuthParameters) {
  const appStorageKey = appStorage.createNamespacedKey(localStorageKey)
  const token = ref(appStorage.getItem(appStorageKey) || '')
  setDefaultAuthHeaders(token.value)

  function setToken(newValue: string) {
    token.value = newValue
  }

  watch(token, (newVal, oldVal) => {
    if (!newVal) {
      appStorage.removeItem(appStorageKey)
    } else if (newVal !== oldVal) {
      appStorage.setItem(appStorageKey, newVal)
    }
    setDefaultAuthHeaders(newVal)
  })

  const currentUser = computed(() => getCurrentUserFromToken(token.value))

  const loggedIn = computed(() => Boolean(token.value))

  // Whether the user is in a specific role.
  function isInRole(role: Role): boolean {
    return (
      !!currentUser.value &&
      (isInRole('super-admin') || currentUser.value.roles.includes(role))
    )
  }

  // Whether the user is in every role specified.
  function isInRoles(roles: Role[]): boolean {
    return isInRole('super-admin') || roles.every((role) => isInRole(role))
  }

  // Whether the user is in any of the roles specified.
  function isInAnyRole(roles: Role[]): boolean {
    return isInRole('super-admin') || roles.some((role) => isInRole(role))
  }

  // Whether the user has a specific permission.
  function hasPermission(permission: Permission): boolean {
    return (
      !!currentUser.value &&
      (isInRole('super-admin') ||
        currentUser.value.permissions.includes(permission))
    )
  }

  // Whether the user has every permission specified.
  function hasAllPermissions(permissions: Permission[]): boolean {
    return (
      isInRole('super-admin') ||
      permissions.every((permission) => hasPermission(permission))
    )
  }

  // Whether the user has any of the permissions specified.
  function hasAnyPermission(permissions: Permission[]): boolean {
    return (
      isInRole('super-admin') ||
      permissions.some((permission) => hasPermission(permission))
    )
  }

  // Set authorization headers
  function setDefaultAuthHeaders(token: string): void {
    const authorization = token ? `${securityScheme} ${token}` : undefined
    api.base.defaults.headers.common.Authorization = authorization
    api.security.defaults.headers.common.Authorization = authorization
  }

  async function login(model: LoginModel) {
    if (loggedIn.value) return validate()
    const { data: token } = await securityService.login(model)
    setToken(token)
    return currentUser.value
  }

  function logout() {
    setToken('')
  }

  async function validate() {
    if (!token.value) return Promise.resolve(null)

    try {
      const { data: token } = await securityService.validate()
      setToken(token)
      return currentUser.value
    } catch (e) {
      logout()
      return null
    }
  }

  return {
    token,
    setToken,
    currentUser,
    loggedIn,
    isInRole,
    isInRoles,
    isInAnyRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    login,
    logout,
    validate,
  }
}

function getCurrentUserFromToken(token: string): User | null {
  const decodedToken: DecodedToken | null = jwtDecode(token)

  if (!decodedToken) return null

  const { id, firstName, lastName, maidenName, sub, email, permission } =
    decodedToken

  const roles = normalizeClaimList(getSchemaClaimValue(decodedToken, 'role'))

  const permissions = normalizeClaimList(permission)

  return {
    id: id || '',
    firstName: firstName || '',
    lastName: lastName || '',
    maidenName: maidenName || '',
    fullName: [firstName, lastName, maidenName].join(' ').trim(),
    userName: sub,
    email: email || '',
    roles,
    permissions,
    // TODO: Dynamic route registration
    routes: [], // getUserRoutes(routes, roles, permissions),
  }
}

function normalizeClaimList(list: string | string[] | null) {
  return typeof list === 'string' ? [list] : list || []
}

function getSchemaClaimValue(
  decodedToken: DecodedToken & Record<string, any>,
  claimName: string
): string | string[] | null {
  const claimKey = getSchemaClaimKey(decodedToken, claimName)
  return claimKey ? decodedToken[claimKey] : null
}

function getSchemaClaimKey(
  decodedToken: DecodedToken | null,
  claimName: string
) {
  return (
    decodedToken &&
    Object.keys(decodedToken).find((key) => key.includes(claimName))
  )
}

export interface UseAuthParameters {
  localStorageKey: string
  securityScheme: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  maidenName: string
  fullName: string
  userName: string
  email: string
  roles: string[]
  permissions: string[]
  routes: RouteConfig[]
}

export interface DecodedToken {
  id: string
  sub: string
  jti: string
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role':
    | string
    | string[]
  email: string
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string
  firstName: string
  lastName: string
  maidenName: string
  permission: string | string[]
  exp: number
  iss: string
  aud: string
}
