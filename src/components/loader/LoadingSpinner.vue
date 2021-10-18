<template>
  <svg :style="spinnerStyle" class="LoadingSpinner" viewBox="0 0 44 44">
    <circle
      :style="spinnerShapeStyle"
      :stroke-width="depth"
      class="LoadingSpinner__shape"
      cx="22"
      cy="22"
      r="20"
      fill="none"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export enum LoadingSpinnerDirection {
  Normal = 'normal',
  Reverse = 'reverse',
  Alternate = 'alternate',
  AlternateReverse = 'alternate-reverse',
}

export default Vue.extend({
  name: 'LoadingSpinner',

  props: {
    direction: {
      type: String,
      default: LoadingSpinnerDirection.Normal,
      validator: (value: string) =>
        Object.values(LoadingSpinnerDirection).includes(
          value as LoadingSpinnerDirection
        ),
    },

    size: {
      type: [String, Number],
      default: 50,
    },

    depth: {
      type: [String, Number],
      default: 4,
    },

    speed: {
      type: [String, Number],
      default: 2,
    },

    shapeSpeed: {
      type: [String, Number],
      default: 1.5,
    },

    color: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      defaultUnit: 'px',
      defaultSpeedUnit: 's',
    }
  },

  computed: {
    spinnerSize(): string {
      return this.getFormattedValue(this.size, this.defaultUnit)
    },

    spinnerDepth(): string {
      return this.getFormattedValue(this.depth, this.defaultUnit)
    },

    spinnerSpeed(): string {
      return this.getFormattedValue(this.speed, this.defaultSpeedUnit)
    },

    spinnerShapeSpeed(): string {
      return this.getFormattedValue(this.shapeSpeed, this.defaultSpeedUnit)
    },

    spinnerStyle(): Record<string, string | undefined> {
      return {
        width: this.spinnerSize,
        height: this.spinnerSize,
        color: this.color || undefined,
        animationDuration: this.spinnerSpeed,
        animationDirection: this.direction,
      }
    },

    spinnerShapeStyle(): Record<string, string> {
      return {
        animationDuration: this.spinnerShapeSpeed,
        animationDirection: this.direction,
      }
    },
  },

  methods: {
    getFormattedValue(value: string | number, defaultUnit: string): string {
      return typeof value === 'string' ? value : `${value}${defaultUnit}`
    },
  },
})
</script>

<style lang="scss" scoped>
.LoadingSpinner {
  animation: wrapperSpin 2s linear infinite;

  &__shape {
    stroke: currentColor;
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: shapeSpin 1.5s ease-in-out infinite;
  }
}

@keyframes wrapperSpin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes shapeSpin {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
