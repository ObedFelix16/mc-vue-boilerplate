import { api } from '@/services/client'
import { serviceUrl } from '@/services/utils'
import { AxiosInstance } from 'axios'

const controller = serviceUrl('contact')

function createMcContactService(client: AxiosInstance) {
  return {
    send(data: ContactModel) {
      return client.post<void>(controller.action('send'), data)
    },
  }
}

export const contactService = createMcContactService(api.contact)

export interface ContactModel {
  applicationId: string
  firstName: string
  lastName?: string
  phoneNumber?: string
  emailAddress: string
  company?: string
  country?: string
  message: string
  languageKey?: number
  templateTypeKey?: number
  to?: string
}
