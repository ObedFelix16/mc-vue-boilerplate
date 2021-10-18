<template>
  <span
    :aria-checked="value.toString()"
    :data-state="currentState"
    :data-disabled="disabled"
    :data-readonly="readonly"
    :data-round="round"
    :style="switchStyles"
    class="BaseSwitch"
    role="checkbox"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <span :style="backgroundStyles" class="BaseSwitch__background" />
    <span :style="indicatorStyles" class="BaseSwitch__indicator" />
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

/**
 * A switch component used to provide a visual toggle between two mutually exclusive states, on and off.
 */
export default Vue.extend({
  name: 'BaseSwitch',

  model: {
    event: 'update',
  },

  props: {
    /**
     * The switch value that provides two way binding.
     * Works with v-model.
     */
    value: {
      type: Boolean,
      default: false,
    },

    /**
     *  Changes the switch style to look rounded.
     */
    round: {
      type: Boolean,
      default: true,
    },

    /**
     * Indicates that the switch is disabled, probably until some other condition has been met.
     * Allows or disallows the user from using the switch.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Allows or disallows the user from editing the switch value.
     */
    readonly: {
      type: Boolean,
      default: false,
    },

    /**
     * The cursor used when the switch is enabled.
     */
    cursor: {
      type: String,
      default: 'pointer',
    },

    /**
     * The cursor used when the switch is disabled.
     */
    disabledCursor: {
      type: String,
      default: 'not-allowed',
    },

    /**
     * The cursor used when the switch is readonly.
     */
    readonlyCursor: {
      type: String,
      default: 'default',
    },

    /**
     * The background color when the switch is in the on state.
     */
    onBackgroundColor: {
      type: String,
      default: 'var(--theme-color-secondary)',
    },

    /**
     * The background color when the switch is in the off state.
     */
    offBackgroundColor: {
      type: String,
      default: 'var(--theme-background-input)',
    },

    /**
     * The background color of the switch indicator when it is in the on state.
     */
    onIndicatorBackgroundColor: {
      type: String,
      default: '#ffffff',
    },

    /**
     * The background color of the switch indicator when it is in the off state.
     */
    offIndicatorBackgroundColor: {
      type: String,
      default: 'rgba(0,0,0,0.4)',
    },
  },

  computed: {
    currentState(): string {
      return this.value ? 'on' : 'off'
    },

    switchCursor(): string {
      if (this.disabled) {
        return this.disabledCursor
      } else if (this.readonly) {
        return this.readonlyCursor
      }
      return this.cursor
    },

    switchStyles(): { [key: string]: string } {
      return {
        cursor: this.switchCursor,
      }
    },

    backgroundStyles(): { [key: string]: string } {
      return {
        backgroundColor: this.value
          ? this.onBackgroundColor
          : this.offBackgroundColor,
      }
    },

    indicatorStyles(): { [key: string]: string } {
      return {
        transform: `translate(${this.value ? '2rem' : '0'}, -50%)`,
        backgroundColor: this.value
          ? this.onIndicatorBackgroundColor
          : this.offIndicatorBackgroundColor,
      }
    },
  },

  methods: {
    toggle(): void {
      if (!this.disabled && !this.readonly) {
        this.$emit('update', !this.value)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.BaseSwitch {
  display: inline-block;
  position: relative;
  height: 32px;
  width: 64px;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 4px var(--theme-color-secondary-transparent);
  }

  &[data-disabled] {
    opacity: 0.8;
  }

  &[data-round] {
    border-radius: 9999px;
  }

  &__background {
    display: inline-block;
    border-radius: inherit;
    height: 100%;
    width: 100%;
    // box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 200ms ease;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  &__indicator {
    position: absolute;
    top: 50%;
    left: 2px;
    height: 24px;
    width: 24px;
    border-radius: inherit;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-50%);
    transition: transform 200ms ease;
  }
}
</style>
