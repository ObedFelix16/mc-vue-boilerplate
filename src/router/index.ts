import appConfig from '@/app.config.json'
import { auth } from '@/composition/auth'
import { Permission } from '@/composition/auth/permissions'
import { Role } from '@/composition/auth/roles'
import NProgress from '@/setup/nprogress'
import { ref } from '@vue/composition-api'
import Vue from 'vue'
import Router, {
  NavigationGuard,
  Route,
  RouteConfig,
  RouteRecord,
} from 'vue-router'
import routes from './routes'

type Position = { x: number; y: number }
type PositionResult =
  | Position
  | { selector: string; offset?: Position; behavior?: ScrollBehavior }
  | void

Vue.use(Router)

export const currentRoute = ref<Route | null>(null)

export interface AppRoute extends Route {
  meta?: AppRouteMeta
}

export interface AppRouteRecord extends RouteRecord {
  meta: AppRouteMeta
}

export type AppRouteConfig = RouteConfig & {
  meta?: AppRouteMeta
}

export interface AppRouteMeta {
  beforeResolve?: NavigationGuard
  savedPosition?: Position
  authRequired?: boolean
  requiredRoles?: Role[]
  anyRoles?: Role[]
  requiredPermissions?: Permission[]
  anyPermissions?: Permission[]
  i18n?: string
  layout?: string
}

const router = new Router({
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // https://router.vuejs.org/en/essentials/history-mode.html
  mode: 'history',
  // The base URL of the app.  For example, if the entire single page application is
  // served under /app/, then base should use the value "/app/"
  base: appConfig.router.baseUrl,
  // Route config
  routes,
  // Returning the savedPosition will result in a native-like behavior
  // when navigating with back/forward buttons
  // https://router.vuejs.org/en/advanced/scroll-behavior.html
  scrollBehavior(to: AppRoute, from: AppRoute, savedPosition) {
    let position: PositionResult = { x: 0, y: 0 }

    if (to.hash) {
      position = {
        selector: to.hash,
      }
    } else if (savedPosition) {
      position = savedPosition
    } else if (to.meta && to.meta.savedPosition) {
      position = to.meta.savedPosition
    }

    return new Promise((resolve) => {
      resolve(position)
    })
  },
})

// Before each route evaluates...
router.beforeEach((routeTo: AppRoute, routeFrom: AppRoute, next) => {
  // If this isn't an initial page load...
  if (routeFrom.name) {
    // Start the route progress bar.
    NProgress.start()
  }

  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  // If auth isn't required for the route, just continue.
  if (!authRequired || routeTo.name === 'Logout') return next()

  // If auth is required and the user is logged in...
  if (auth.loggedIn.value) {
    // Validate the local user token...
    return auth.validate().then((validUser) => {
      // Then redirect to login if the token does not represent a valid user
      if (!validUser) return redirectToLogin()

      // Continue if the token represents a valid user and does not require role validation
      if (
        !routeTo.meta ||
        (!routeTo.meta.requiredRoles && !routeTo.meta.anyRoles)
      )
        return next()

      // Perform roles & permissions validation
      if (
        (routeTo.meta.requiredRoles &&
          !auth.isInRoles(routeTo.meta.requiredRoles)) ||
        (routeTo.meta.anyRoles && !auth.isInAnyRole(routeTo.meta.anyRoles)) ||
        (routeTo.meta.requiredPermissions &&
          !auth.hasAllPermissions(routeTo.meta.requiredPermissions)) ||
        (routeTo.meta.anyPermissions &&
          !auth.hasAnyPermission(routeTo.meta.anyPermissions))
      ) {
        // If the user is missing a required role,
        // redirect to forbidden
        return next({
          name: 'Forbidden',
          query: { redirectedFrom: routeTo.fullPath },
          params: {
            resource: routeTo.path,
          },
        })
      }

      next()
    })
  }

  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  redirectToLogin()

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ name: 'Login', query: { redirectedFrom: routeTo.fullPath } })
  }
})

// Before each route resolves...
// Resolve guards will be called right before the navigation is confirmed,
// after all in-component guards and async route components are resolved.
router.beforeResolve(async (routeTo: AppRoute, routeFrom: AppRoute, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    const matchedRoutes: AppRouteRecord[] = routeTo.matched
    for (const route of matchedRoutes) {
      await new Promise<void>((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args: any[]) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              if (routeFrom.name === args[0].name) {
                // Complete the animation of the route progress bar.
                NProgress.done()
              }
              // Complete the redirect.
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          // Otherwise, continue resolving the route.
          resolve()
        }
      })
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return
  }

  // If we reach this point, continue resolving the route.
  next()
})

// When each route is finished evaluating...
router.afterEach((routeTo: AppRoute) => {
  // Save currentRoute state for Composition API
  // Change once we upgrade to Vue 3, vue-router has useRoute
  // https://next.router.vuejs.org/api/#useroute
  currentRoute.value = routeTo

  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
