<template>
  <div class="VerificationCode">
    <input
      v-for="n in length"
      :key="n"
      ref="inputs"
      v-model="inputValues[n - 1]"
      :readonly="readonly"
      :disabled="disabled"
      :data-index="n - 1"
      :autofocus="autofocus && n === 1"
      :aria-label="getInputAriaLabel(n)"
      :inputmode="inputmode"
      :pattern="pattern"
      type="text"
      required
      maxlength="1"
      autocorrect="off"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      dir="ltr"
      class="VerificationCode__input"
      @keydown="onInputKeyDown"
      @input="onInputInput"
      @click="onInputClick"
    />
  </div>
</template>

<script lang="ts">
import { HTMLElementEvent } from '@/types/HTMLElementEvent'
import Vue from 'vue'

enum VerificationCodeType {
  Numeric = 'numeric',
  Alphabetical = 'alphabetical',
  AlphaNumeric = 'alphanumeric',
}

enum VerificationCodeKeyCode {
  Backspace = 8,
  Tab = 9,
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
}

enum VerificationCodeEvent {
  Update = 'update',
  Complete = 'complete',
}

export default Vue.extend({
  name: 'VerificationCode',

  model: {
    event: VerificationCodeEvent.Update,
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },

    type: {
      type: String,
      default: VerificationCodeType.Numeric,
      validator: (value: string) =>
        Object.values(VerificationCodeType).includes(
          value as VerificationCodeType
        ),
    },

    length: {
      type: Number,
      default: 4,
    },

    autofocus: {
      type: Boolean,
      default: false,
    },

    lazy: {
      type: Boolean,
      default: false,
    },

    srContext: {
      type: [String, Function],
      default: () => {
        return (inputNumber: number, verificationCodeType: string) => {
          let text: string

          switch (verificationCodeType) {
            case VerificationCodeType.Numeric:
              text = 'Digit'
              break
            case VerificationCodeType.Alphabetical:
              text = 'Character'
              break
            case VerificationCodeType.AlphaNumeric:
              text = 'Digit Or Character'
              break
            default:
              text = ''
              break
          }

          return `Enter Verification Code ${text} ${inputNumber}`
        }
      },
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      inputValues: [] as string[],
    }
  },

  computed: {
    verificationCode(): string | number {
      return this.inputValues.join('')
    },

    isValidVerificationCode(): boolean {
      return this.isValidVerificationLength && this.isValidVerificationPattern
    },

    isValidVerificationLength(): boolean {
      return this.verificationCode.toString().length === this.length
    },

    isValidVerificationPattern(): boolean {
      return (
        this.inputValues.every(Boolean) &&
        this.inputElements.every((inputEl) => inputEl.validity.valid)
      )
    },

    inputElements(): HTMLInputElement[] {
      return (this.$refs.inputs || []) as HTMLInputElement[]
    },

    nativeEventName(): string {
      return !this.lazy ? 'input' : 'change'
    },

    inputmode(): string {
      return this.type === VerificationCodeType.Numeric ? 'numeric' : ''
    },

    pattern(): string {
      return this.type === VerificationCodeType.Numeric ? '[0-9]' : '[a-zA-Z]'
    },

    patternRegex(): RegExp {
      return new RegExp(this.pattern)
    },
  },

  watch: {
    length: {
      handler(length: number | null) {
        let values: string[] = []

        if (length) {
          if (this.value !== '') {
            values = this.value.toString().substr(0, length).split('')
          } else {
            values = new Array(length).fill('')
          }
        }

        this.inputValues = values
      },
      immediate: true,
    },

    verificationCode(newVal: string) {
      this.$emit(VerificationCodeEvent.Update, newVal)
      this.$emit(this.nativeEventName, newVal)
    },

    isValidVerificationCode(newVal: boolean) {
      if (!newVal) return
      this.$emit(VerificationCodeEvent.Complete, newVal)
    },
  },

  methods: {
    getInputAriaLabel(inputNumber: number): string {
      return typeof this.srContext === 'string'
        ? this.srContext
        : this.srContext(inputNumber, this.type)
    },

    onInputClick(event: MouseEvent) {
      const { target } = event
      const inputEl = target as HTMLInputElement

      inputEl.focus()
      inputEl.select()
    },

    onInputInput(event: HTMLElementEvent<HTMLInputElement>) {
      const { target } = event

      if (!target.value) return

      const inputIndex = Number.parseInt(target.dataset.index || '0', 10)
      const nextInputIndex = inputIndex + 1
      const nextInputEl = this.inputElements[nextInputIndex]

      if (nextInputEl) {
        nextInputEl.focus()
        nextInputEl.select()
      }
    },

    onInputKeyDown(event: KeyboardEvent) {
      const { key, target, shiftKey } = event
      const inputEl = target as HTMLInputElement
      const inputIndex = Number.parseInt(inputEl.dataset.index || '0', 10)
      const prevInputIndex = inputIndex - 1
      const nextInputIndex = inputIndex + 1
      const prevInputEl = this.inputElements[prevInputIndex]
      const nextInputEl = this.inputElements[nextInputIndex]

      switch (event.keyCode) {
        case VerificationCodeKeyCode.Backspace:
          if (!this.inputValues[inputIndex] && prevInputEl) {
            this.inputValues[prevInputIndex] = ''
            prevInputEl.focus()
          }
          break
        case VerificationCodeKeyCode.Tab:
          break
        case VerificationCodeKeyCode.Left:
          if (shiftKey) return
          event.preventDefault()
          if (prevInputEl) {
            prevInputEl.focus()
            prevInputEl.select()
          }
          break
        case VerificationCodeKeyCode.Right:
          if (shiftKey) return
          event.preventDefault()
          if (nextInputEl) {
            nextInputEl.focus()
            nextInputEl.select()
          }
          break
        default:
          if (key.length !== 1 || !this.patternRegex.test(key)) {
            event.preventDefault()
          }
          break
      }
    },
  },
})
</script>
