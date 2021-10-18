<template>
  <a
    v-if="isPresentationalLink"
    v-bind="$attrs"
    :href="href || undefined"
    :target="linkTarget"
    :rel="linkRel"
    :class="computedClass"
    v-on="$listeners"
  >
    <slot />
  </a>
  <RouterLink v-else v-slot="routerLinkCtx" :to="routerLinkTo" custom>
    <a
      :href="routerLinkCtx.href"
      :class="[
        ...computedClass,
        routerLinkCtx.isActive ? activeClass : inactiveClass,
        routerLinkCtx.isExactActive && exactActiveClass,
      ]"
      :[ariaCurrentIf(routerLinkCtx.isExactActive)]="'page'"
      v-bind="$attrs"
      @click="routerLinkCtx.navigate"
      v-on="$listeners"
    >
      <slot />
    </a>
  </RouterLink>
</template>

<script lang="ts">
import { Color, colors } from '@/design/system/helpers'
import { Location } from 'vue-router'
import { computed, defineComponent, PropType } from '@vue/composition-api'
import {
  ButtonVariant,
  buttonBaseClasses,
  buttonToneConfig,
  buttonVariantConfig,
} from './BaseButton.vue'

export default defineComponent({
  name: 'BaseLink',

  inheritAttrs: false,

  props: {
    href: {
      type: String,
      default: '',
    },

    allowInsecure: {
      type: Boolean,
      default: false,
    },

    to: {
      type: Object as PropType<Location | null>,
      default: null,
    },

    name: {
      type: String,
      default: '',
    },

    params: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },

    activeClass: {
      type: String,
      default: 'router-link-active',
    },

    inactiveClass: {
      type: String,
      default: '',
    },

    exactActiveClass: {
      type: String,
      default: 'router-link-exact-active',
    },

    tone: {
      type: String as PropType<Color | null>,
      default: null,
      validator: (value: Color | null) => !value || colors.includes(value),
    },

    variant: {
      type: String as PropType<ButtonVariant | null>,
      default: null,
      validator: (value: string | null) =>
        !value || ['solid', 'ghost', 'soft', 'transparent'].includes(value),
    },
  },

  setup(props) {
    const computedClass = computed(() =>
      props.tone && props.variant
        ? [
            'inline-block',
            ...buttonBaseClasses,
            ...buttonToneConfig[props.tone][props.variant],
            ...buttonVariantConfig[props.variant],
          ]
        : []
    )

    return {
      computedClass,
    }
  },

  computed: {
    routerLinkTo(): Location {
      return {
        name: this.name,
        params: this.params,
        ...(this.to || {}),
      }
    },

    isRouterLink(): boolean {
      return Boolean(this.name || this.to)
    },

    isFragmentIdentifier(): boolean {
      return Boolean(this.href) && this.href.startsWith('#')
    },

    isPhoneLink(): boolean {
      return Boolean(this.href) && this.href.startsWith('tel:')
    },

    isMailLink(): boolean {
      return Boolean(this.href) && this.href.startsWith('mailto:')
    },

    isExternalLink(): boolean {
      return /^\w+:/.test(this.href)
    },

    isPresentationalLink(): boolean {
      return (
        !this.isRouterLink ||
        this.isFragmentIdentifier ||
        this.isPhoneLink ||
        this.isMailLink
      )
    },

    linkTarget(): string | undefined {
      return this.isExternalLink ? '_blank' : undefined
    },

    linkRel(): string | undefined {
      return this.isExternalLink ? 'noopener' : undefined
    },
  },

  created() {
    this.validateProps()
  },

  methods: {
    ariaCurrentIf(isExactActive: boolean): string | null {
      return isExactActive ? 'aria-current' : null
    },

    // Perform more complex prop validations than is possible
    // inside individual validator functions for each prop.
    validateProps(): void {
      if (process.env.NODE_ENV === 'production') return

      if (this.href && !this.isFragmentIdentifier) {
        // Check for non-external URL in href.
        if (!/^\w+:/.test(this.href)) {
          return console.warn(
            `Invalid <BaseLink> href: ${this.href}.\nIf you're trying to link to a local URL, specify provide at least a name or to`
          )
        }
        // Check for insecure URL in href.
        if (!this.allowInsecure && !/^(https|mailto|tel):/.test(this.href)) {
          return console.warn(
            `Insecure <BaseLink> href: ${this.href}.\nWhen linking to external sites, always prefer https URLs. If this site does not offer SSL, explicitly add the allow-insecure attribute on <BaseLink>.`
          )
        }
      }
    },
  },
})
</script>
