import { serviceUrl } from '../../utils'
import { api } from '../../client'

const controller = serviceUrl('security')

export const securityService = {
  validate() {
    return api.security.get<string>(controller.action('validate'))
  },

  login(model: LoginModel) {
    return api.security.post<string>(controller.action('login'), model)
  },

  phoneLogin(model: PhoneLoginModel) {
    return api.security.post<string | null>(
      controller.action('phoneLogin'),
      model
    )
  },

  register(model: UserInsertModel) {
    return api.security.post<void>(controller.action('register'), model)
  },

  logout() {
    return api.security.post<void>(controller.action('logout'))
  },

  forgotPassword(model: ForgotPasswordModel) {
    return api.security.post<void>(controller.action('forgotPassword'), model)
  },

  resetPassword(model: ResetPasswordModel) {
    return api.security.post<void>(controller.action('resetPassword'), model)
  },

  userUpdate(model: UserUpdateModel) {
    return api.security.post<void>(controller.action('userUpdate'), model)
  },

  userActivate(model: UserActivateModel) {
    return api.security.post<void>(controller.action('userActivate'), model)
  },

  reSendConfirmationEmail(model: UserConfirmModel) {
    return api.security.post<void>(
      controller.action('reSendConfirmationEmail'),
      model
    )
  },
}

//===
// Security interfaces
//===
export interface LoginModel {
  username: string
  password: string
  rememberMe: boolean
  applicationId: string
}

export interface PhoneLoginModel {
  phoneNumber: string
  code?: string
  redirectedFrom?: string
  applicationId: string
}

export interface ForgotPasswordModel {
  email: string
  applicationId: string
  languageId: string
}

export interface RegisterModel {
  username: string
  password: string
  confirmPassword: string
  email: string
  firstName: string
  lastName: string
  maidenName: string
  phoneNumber: number
  profilePicture: string | File
}

export interface ResetPasswordModel {
  email: string
  code: string
  password: string
  confirmPassword: string
}

export interface UserConfirmModel {
  userId: string
  applicationId: string
  languageId: string
}

export interface UserActivateModel {
  userId: string
}

export interface UserInsertModel extends UserUpdateModel {
  applicationId: string
  languageId: string
}

export interface UserUpdateModel {
  user: UserModel
  roleList: string[]
  claimList: Claim[]
  applicationId: string
}

export interface UserModel {
  userId?: string
  firstName: string
  middleName: string | null
  lastName: string
  maidenName: string
  userName: string
  email: string
  phoneNumber: string | null
  avatar: string | null | File
  profilePicture: string | null | File
  assignedMachineName: string | null
  birthDate: string | Date | null
  hireDate: string | Date | null
  socialSecurityNumber: string | null
  terminationDate: string | Date | null
  agreementDate: string | Date | null
  abbreviation: string | null
}

export interface Claim {
  type: string
  value: string
}
