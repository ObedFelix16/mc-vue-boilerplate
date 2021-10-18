declare module 'vue' {
  export interface GlobalComponents {
    BaseAlert: typeof import('@/components/_base/BaseAlert.vue').default
    BaseBadge: typeof import('@/components/_base/BaseBadge.vue').default
    BaseBanner: typeof import('@/components/_base/BaseBanner.vue').default
    BaseBox: typeof import('@/components/_base/BaseBox.vue').default
    BaseButton: typeof import('@/components/_base/BaseButton.vue').default
    BaseDate: typeof import('@/components/_base/BaseDate.vue').default
    BaseField: typeof import('@/components/_base/BaseField.vue').default
    BaseFieldLabel: typeof import('@/components/_base/BaseFieldLabel.vue').default
    BaseFieldMessage: typeof import('@/components/_base/BaseFieldMessage.vue').default
    BaseHeading: typeof import('@/components/_base/BaseHeading.vue').default
    BaseIcon: typeof import('@/components/_base/BaseIcon.vue').default
    BaseImage: typeof import('@/components/_base/BaseImage.vue').default
    BaseInputCheckbox: typeof import('@/components/_base/BaseInputCheckbox.vue').default
    BaseInputRadio: typeof import('@/components/_base/BaseInputRadio.vue').default
    BaseInputText: typeof import('@/components/_base/BaseInputText.vue').default
    BaseInputFile: typeof import('@/components/_base/BaseInputFile.vue').default
    BaseKbd: typeof import('@/components/_base/BaseKbd.vue').default
    BaseLink: typeof import('@/components/_base/BaseLink.vue').default
    BaseList: typeof import('@/components/_base/BaseList.vue').default
    BaseListItem: typeof import('@/components/_base/BaseListItem.vue').default
    BaseModal: typeof import('@/components/_base/BaseModal.vue').default
    BaseNotice: typeof import('@/components/_base/BaseNotice.vue').default
    BaseSecondary: typeof import('@/components/_base/BaseSecondary.vue').default
    BaseSegmentedControl: typeof import('@/components/_base/BaseSegmentedControl.vue').default
    BaseSelect: typeof import('@/components/_base/BaseSelect.vue').default
    BaseStrong: typeof import('@/components/_base/BaseStrong.vue').default
    BaseSwitch: typeof import('@/components/_base/BaseSwitch.vue').default
    BaseText: typeof import('@/components/_base/BaseText.vue').default
    BaseTextarea: typeof import('@/components/_base/BaseTextarea.vue').default
    BaseCalendar: typeof import('@/components/_base/BaseCalendar.vue').default
    BaseDatePicker: typeof import('@/components/_base/BaseDatePicker.vue').default

    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

export {}
