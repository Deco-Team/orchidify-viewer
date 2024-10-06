//#region learner

import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'

export interface ILearnerRegisterFormPayload extends ILearnerRegisterPayload {
  passwordConfirmation: string
}

export interface ILearnerRegisterPayload {
  email: string
  name: string
  password: string
  dateOfBirth: Date
  phone: string
}

export interface IResendOtpPayload {
  email: string
}

export interface IVerifyOtpPayload extends IResendOtpPayload {
  code: string
}

export interface IVerifyOtpPayload {
  email: string
  code: string
}
//#endregion

//#region instructor

export interface IInstructorRegisterFormPayload {
  email: string
  name: string
  phone: string
  cv: CloudinaryFileUploadedInfo[]
  note?: string
}

export interface IInstructorRegisterPayload {
  email: string
  name: string
  phone: string
  cv: string
  note?: string
}

//#endregion
