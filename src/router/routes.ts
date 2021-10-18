import { AppRouteConfig } from '.'

const routes: AppRouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      lazyLoadView(
        import(
          /* webpackChunkName: 'Home.vue' */
          '@/views/Home.vue'
        )
      ),
    meta: {
      i18n: 'routes.home',
    },
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () =>
      lazyLoadView(
        import(
          /* webpackChunkName: 'Forbidden.vue' */
          '@/views/Forbidden.vue'
        )
      ),
    meta: {
      i18n: 'routes.forbidden',
    },
  },
  {
    path: '/not-found',
    name: 'ErrorNotFound',
    component: () =>
      lazyLoadView(
        import(
          /* webpackChunkName: 'ErrorNotFound.vue' */
          '@/views/ErrorNotFound.vue'
        )
      ),
    meta: {
      i18n: 'routes.errorNotFound',
    },
  },
  {
    path: '*',
    redirect: {
      name: 'Home',
      params: {
        resource: '',
      },
    },
  },
]

export default routes

//===
// Private helpers
//===

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@/views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@/views/my-view')
//
function lazyLoadView(AsyncView: Promise<any>) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@/views/states/Loading.vue').default,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@/views/states/Timeout.vue').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h: any, { data, children }: any) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
