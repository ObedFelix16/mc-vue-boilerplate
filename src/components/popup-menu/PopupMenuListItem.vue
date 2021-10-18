<template>
  <li class="PopupMenuListItem">
    <BaseLink
      :title="item.label"
      class="PopupMenuListItem__anchor"
      @click="onClick"
    >
      <BaseIcon
        v-if="item.icon"
        :name="item.icon"
        class="PopupMenuListItem__icon"
      />

      {{ item.label }}
    </BaseLink>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export interface PopupMenuListItemConfig {
  label: string
  icon?: string
  onClick?: () => void
}

export default Vue.extend({
  name: 'PopupMenuListItem',

  props: {
    item: {
      type: Object as PropType<PopupMenuListItemConfig>,
      default: null,
      required: true,
    },
  },

  methods: {
    onClick(): void {
      this.item.onClick && this.item.onClick()
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
.PopupMenuListItem {
  &__anchor {
    font-size: 0.8rem;
    padding: 1rem 1.5rem;
    display: block;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:not(.button) {
      color: inherit;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
