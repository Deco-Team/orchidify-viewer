import * as zod from 'zod'
import * as yup from 'yup'
import { errorMessage } from '~/messages'
import { extractMessage } from '~/utils'

export const learnerRegisterSchema = yup.object().shape({
  email: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Email']))
    .email(errorMessage.ERM018)
    .max(50, extractMessage(errorMessage.ERM009, ['Email', '50'])),

  phone: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Số điện thoại']))
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, errorMessage.ERM023),

  password: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Mật khẩu']))
    .min(8, extractMessage(errorMessage.ERM020, ['Mật khẩu', '8']))
    .max(50, extractMessage(errorMessage.ERM009, ['Mật khẩu', '50']))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g, errorMessage.ERM021),

  passwordConfirmation: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Xác nhận mật khẩu']))
    .oneOf([yup.ref('password')], errorMessage.ERM030),

  dateOfBirth: yup.date().required(extractMessage(errorMessage.ERM002, ['Ngày sinh'])),

  name: yup
    .string()
    .required(extractMessage(errorMessage.ERM002, ['Họ và tên']))
    .max(50, extractMessage(errorMessage.ERM009, ['Họ và tên', '50']))
})

export const instructorRegisterSchema = zod.object({
  email: zod
    .string()
    .min(1, extractMessage(errorMessage.ERM002, ['Email']))
    .email(errorMessage.ERM018)
    .max(50, extractMessage(errorMessage.ERM009, ['Email', '50'])),

  phone: zod
    .string()
    .min(1, extractMessage(errorMessage.ERM002, ['Số điện thoại']))
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, errorMessage.ERM023),

  name: zod
    .string()
    .min(1, extractMessage(errorMessage.ERM002, ['Họ và tên']))
    .max(50, extractMessage(errorMessage.ERM009, ['Họ và tên', '50'])),

  note: zod
    .string()
    .max(50, extractMessage(errorMessage.ERM009, ['Ghi chú', '50']))
    .optional(),

  cv: zod.array(zod.object({}).passthrough()).nonempty(extractMessage(errorMessage.ERM002, ['CV']))
})
