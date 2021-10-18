import { CommuniqueComponentConfig } from 'vue-communique'

export default [
  {
    name: 'BaseNotification',
    component: () =>
      import(
        /* webpackChunkName: 'BaseNotification.vue' */
        './BaseNotification.vue'
      ),
  },
] as CommuniqueComponentConfig[]
