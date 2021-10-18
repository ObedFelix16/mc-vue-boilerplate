<template>
  <div
    :class="[
      'segmented-control',
      {
        'segmented-control--round': round,
      },
    ]"
  >
    <transition>
      <ul
        :class="[
          'segmented-control__list',
          {
            'segmented-control__list--vertical': vertical,
          },
        ]"
      >
        <li
          v-for="option in options"
          :key="option.label"
          :data-selected="
            !multiple
              ? internalValue === option.value
              : internalValue.includes(option.value)
          "
          :class="[
            'segmented-control__item',
            {
              'segmented-control__item--vertical': vertical,
            },
          ]"
        >
          <label
            :for="getOptionUniqueId(option)"
            :data-selected="
              !multiple
                ? internalValue === option.value
                : internalValue.includes(option.value)
            "
            :class="[
              'segmented-control__label',
              {
                [`button--${variant}`]: !multiple
                  ? internalValue === option.value
                  : internalValue.includes(option.value),
                'segmented-control__label--vertical': vertical,
              },
            ]"
            tabindex="0"
            @keydown.space="handleLabelKeydown"
          >
            {{ option.label }}
          </label>
          <input
            :id="getOptionUniqueId(option)"
            v-model="internalValue"
            :type="control"
            :value="option.value"
            class="segmented-control__input"
          />
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { ThemeVariant } from '@/enums/ThemeVariant'
import { TranslateResult } from 'vue-i18n'
import { Prop } from 'vue/types/options'
import Vue from 'vue'
import { HTMLElementEvent } from '@/types/HTMLElementEvent'

export type SegmentedControlOption = {
  id: string
  label: string | TranslateResult
  value: any
  default?: boolean
  disabled?: boolean
}

let uid = 0

// TODO: Support Object and Array values for SegmentedControlOption
export default Vue.extend({
  name: 'BaseSegmentedControl',

  model: {
    event: 'update',
  },

  props: {
    name: {
      type: String,
      default: '',
    },

    value: {
      type: [String, Boolean, Number, Object, Array],
      default: () => [],
    },

    options: {
      type: Array as Prop<SegmentedControlOption[]>,
      default: () => [],
    },

    variant: {
      type: String as () => ThemeVariant,
      default: ThemeVariant.Secondary,
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    round: {
      type: Boolean,
      default: false,
    },

    vertical: {
      type: Boolean,
      default: false,
    },

    trackBy: {
      type: String,
      default: 'id',
    },
  },

  data() {
    return {
      uid: 0,
    }
  },

  computed: {
    control(): string {
      return this.multiple ? 'checkbox' : 'radio'
    },

    internalValue: {
      get(): any[] {
        if (this.multiple) {
          return Array.isArray(this.value) ? this.value : [this.value]
        }
        return this.value
      },
      set(value: any) {
        this.emitValue(value)
      },
    },
  },

  created() {
    this.assignUniqueId()
  },

  methods: {
    assignUniqueId() {
      this.uid = uid += 1
    },

    getOptionUniqueId(option: SegmentedControlOption): string {
      return `sc-${this.uid}-o-${option.id}`
    },

    getDefaultOptionValue(): SegmentedControlOption {
      const defaultOption = this.options.find((option) => !!option.default)
      return defaultOption ? defaultOption.value : null
    },

    emitValue(value: any) {
      if (this.multiple) {
        this.$emit('update', this.internalValue.concat(value))
      } else {
        this.$emit('update', value)
      }
    },

    handleLabelKeydown(ev: HTMLElementEvent<HTMLLabelElement>): void {
      ev.target.click()
    },
  },
})
</script>

<style lang="scss" scoped>
.segmented-control {
  background-color: var(--theme-background-input);
  position: relative;
  padding: 2px;

  &--round {
    border-radius: 290486px;
  }

  &__list {
    display: flex;
    border-radius: inherit;

    &--vertical {
      flex-direction: column;
    }
  }

  &__item {
    flex: 1;
    display: flex;
    text-align: center;
    border-radius: inherit;
  }

  &__label {
    flex: 1;
    padding: 5px 15px;
    border-radius: inherit;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-width: 1px;
    border-style: solid;

    &--vertical {
      padding: 15px 5px;
    }

    &:not([data-selected]) {
      color: var(--theme-color-input);
      cursor: pointer;
      border-color: transparent;

      &:focus {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    &[data-selected] {
      &:hover {
        transform: none;
      }
    }
  }

  &__input {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
