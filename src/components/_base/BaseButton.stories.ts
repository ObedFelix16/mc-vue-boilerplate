import { Meta, Story } from '@storybook/vue'
import BaseButton from '@/components/_base/BaseButton.vue'
import { defineComponent, h } from '@vue/composition-api'

export default {
  title: 'BaseButton',
  component: BaseButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
    weight: {
      control: {
        type: 'select',
        options: ['strong', 'regular', 'weak'],
      },
    },
  },
} as Meta

const Template: Story = (args, { argTypes }) => {
  return defineComponent({
    props: Object.keys(argTypes),
    setup(props) {
      return () =>
        h(
          BaseButton,
          {
            key: Math.random(),
            props,
          },
          ['Button']
        )
    },
  })
}

export const Default = Template.bind({})
Default.args = {}
