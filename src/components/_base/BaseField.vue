<template>
  <ValidationProvider
    v-slot="{ errors, validate }"
    :vid="vid || undefined"
    :name="name || label || undefined"
    :rules="rules || undefined"
    :mode="mode"
    tag="div"
    class="BaseField"
  >
    <div
      :class="[
        'BaseField__content',
        {
          'BaseField__content--vertical': vertical,
          'BaseField__content--center': center,
        },
      ]"
    >
      <div
        v-if="label && !labelRight"
        :class="labelClass"
        :data-prefix="labelPrefix"
        :data-suffix="labelSuffix"
      >
        <slot name="label">
          <label>{{ label }}</label>
        </slot>
      </div>
      <div
        :class="[
          'BaseField__control',
          {
            'BaseField__control--full-width': fullWidthControl,
            'BaseField__control--has-icon-left': Boolean(icon) && !iconRight,
            'BaseField__control--has-icon-right': Boolean(icon) && iconRight,
            'BaseField__control--invalid': Boolean(errors[0]),
          },
        ]"
      >
        <slot :errors="errors" :validate="validate" />
        <div
          v-if="icon"
          :class="[
            'BaseField__icon',
            {
              'BaseField__icon--right': iconRight,
            },
          ]"
          :style="{
            color: getIconFill(errors[0]),
          }"
        >
          <slot
            :icon="icon"
            :icon-right="iconRight"
            :icon-color="getIconFill(errors[0])"
            name="icon"
          >
            <BaseIcon :name="icon" />
          </slot>
        </div>
        <transition v-if="errorOverlay" name="BaseField__overlay">
          <div
            v-if="error"
            :class="[
              'BaseField__overlay',
              {
                'BaseField__overlay--error': Boolean(errors[0]),
              },
            ]"
          >
            <slot :icon="errorIcon" name="errorOverlay">
              <BaseIcon :name="errorIcon" />
            </slot>
          </div>
        </transition>
      </div>
      <div
        v-if="label && labelRight"
        :class="labelClass"
        :data-prefix="labelPrefix"
        :data-suffix="labelSuffix"
      >
        <slot name="label">
          <label>{{ label }}</label>
        </slot>
      </div>
    </div>
    <slot :hint="hint" name="hint">
      <p v-if="hint" class="BaseField__hint">
        <BaseIcon v-if="hintIcon" :name="hintIcon" />
        {{ hint }}
      </p>
    </slot>
    <slot :error="errors[0]" name="error">
      <Transition appear name="BaseField__error">
        <p v-if="errors[0]" class="BaseField__error">
          <span>{{ errors[0] }}</span>
        </p>
      </Transition>
    </slot>
  </ValidationProvider>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate'
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseField',

  components: {
    ValidationProvider,
  },

  inheritAttrs: false,

  props: {
    icon: {
      type: String,
      default: null,
    },

    iconRight: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '',
    },

    labelRight: {
      type: Boolean,
      default: false,
    },

    labelPrefix: {
      type: String,
      default: '',
    },

    labelSuffix: {
      type: String,
      default: '',
    },

    vertical: {
      type: Boolean,
      default: false,
    },

    center: {
      type: Boolean,
      default: false,
    },

    hint: {
      type: String,
      default: '',
    },

    hintIcon: {
      type: String,
      default: '',
    },

    errorIcon: {
      type: String,
      default: 'exclamation-circle',
    },

    errorOverlay: {
      type: Boolean,
      default: false,
    },

    iconColor: {
      type: String,
      default: 'var(--theme-color-secondary)',
    },

    fullWidthControl: {
      type: Boolean,
      default: false,
    },

    vid: {
      type: String,
      default: '',
    },

    mode: {
      type: String,
      default: 'eager',
    },

    name: {
      type: String,
      default: '',
    },

    rules: {
      type: [String, Object],
      default: '',
    },
  },

  computed: {
    labelClass(): (string | { [key: string]: boolean })[] {
      return [
        'BaseField__label',
        {
          'BaseField__label--vertical': this.vertical,
          'BaseField__label--prefixed': Boolean(this.labelPrefix),
          'BaseField__label--suffixed': Boolean(this.labelSuffix),
        },
      ]
    },
  },

  methods: {
    getIconFill(hasError: boolean): string {
      return hasError ? 'var(--theme-color-danger)' : this.iconColor
    },
  },
})
</script>

<style lang="scss" scoped>
.BaseField {
  text-align: left;

  &__content {
    display: flex;
    align-items: center;

    &--center {
      justify-content: center;
    }

    &--vertical {
      flex-direction: column;
      align-items: initial;
    }
  }

  &__label {
    font-size: small;
    padding: 0.25em 0.5em;

    &--vertical {
      padding-left: 0;
    }

    &--prefixed {
      &::before {
        content: attr(data-prefix);
        font-size: 0.85em;
        font-style: italic;
      }
    }

    &--suffixed {
      &::after {
        content: attr(data-suffix);
        font-size: 0.85em;
        font-style: italic;
      }
    }
  }

  ::v-deep &__control {
    position: relative;

    &--full-width {
      flex: 1;
    }

    &--has-icon {
      $paddingLeftRight: calc(1em + 25px);

      &-left {
        & input[type='text'],
        & input[type='tel'],
        & input[type='search'],
        & input[type='password'],
        & input[type='number'],
        & textarea {
          padding-left: $paddingLeftRight;
        }
      }

      &-right {
        & input[type='text'],
        & input[type='tel'],
        & input[type='search'],
        & input[type='password'],
        & input[type='number'],
        & textarea {
          padding-right: $paddingLeftRight;
        }
      }
    }

    &--invalid {
      animation: shake 500ms var(--global-timing-function-base);

      & input[type='text'],
      & input[type='tel'],
      & input[type='search'],
      & input[type='password'],
      & input[type='number'],
      & textarea {
        border-color: var(--theme-color-danger-transparent);

        &:focus {
          box-shadow: 0 0 0 0.1rem var(--theme-color-danger-transparent);
        }
      }
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    pointer-events: none;
    transition: color var(--global-duration-animation-base)
      var(--global-duration-animation-base) var(--global-timing-function-base);

    &--right {
      left: initial;
      right: 15px;
    }
  }

  &__hint {
    padding: 0.25em 0;
    font-size: smaller;
    color: var(--theme-color-base-light);
  }

  &__error {
    padding: 0.25em 0;
    font-size: smaller;
    color: var(--theme-color-danger);
    text-transform: lowercase;

    &::first-letter {
      text-transform: uppercase;
    }

    &-enter {
      opacity: 0;
      transform: translateY(-5px);

      &-active {
        transition-property: opacity, transform;
        transition-duration: var(--global-duration-animation-base);
        transition-timing-function: var(--global-timing-function-base);
      }

      &-to {
        opacity: 1;
        transform: none;
      }
    }

    &-leave {
      &-active {
        transition-property: opacity, transform;
        transition-duration: var(--global-duration-animation-base);
        transition-timing-function: var(--global-timing-function-base);
      }

      &-to {
        opacity: 0;
        transform: translateY(5px);
      }
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 10px;
    // border-top-left-radius: $size-input-border-radius;
    // border-bottom-left-radius: $size-input-border-radius;
    display: flex;
    align-items: center;
    pointer-events: none;

    &-enter {
      transform: perspective(100px) rotateY(90deg);

      &-active {
        transition: transform var(--global-duration-animation-base)
          var(--global-timing-function-base);
        transform-origin: 0 50% 0;
      }

      &-to {
        transform: none;
      }
    }

    &-leave {
      &-active {
        transition: transform var(--global-duration-animation-base)
          var(--global-timing-function-base);
        transform-origin: 0 50% 0;
      }

      &-to {
        transform: perspective(100px) rotateY(90deg);
      }
    }

    &--error {
      background-color: var(--theme-color-danger-light);
      color: var(--theme-color-danger-dark);
    }
  }
}

@keyframes shake {
  8%,
  41% {
    transform: translateX(-5px);
  }
  25%,
  58% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-2.5px);
  }
  92% {
    transform: translateX(2.5px);
  }
  0%,
  100% {
    transform: translateX(0);
  }
}
</style>
