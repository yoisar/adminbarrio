export interface Role {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  pivot: {
    model_type: string
    model_id: number
    role_id: number
  }
}

export interface Barrio {
  id: number
  nombre: string
  direccion: string
  descripcion: string
  created_at: string
  updated_at: string
  pivot?: {
    user_id: number
    barrio_id: number
  }
}

export interface Persona {
  id: number
  nombre: string
  apellido: string
  telefono: string
  direccion: string
  user_id: number
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  role: string
  avatar: string | null
  roles: Role[]
  barrios_administrados: Barrio[]
  barrios_empleado: Barrio[]
  persona: Persona
}

export interface AuthModel {
  api_token: string
  access_token: string
  token_type: string
  refreshToken?: string
  barrio: Barrio
  user: User
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  first_name: string
  last_name: string
  fullname?: string
  occupation?: string
  companyName?: string
  phone?: string
  roles?: Array<number>
  pic?: string
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  timeZone?: string
  website?: 'https://keenthemes.com'
  emailSettings?: UserEmailSettingsModel
  auth?: AuthModel
  communication?: UserCommunicationModel
  address?: UserAddressModel
  socialNetworks?: UserSocialNetworksModel
}
