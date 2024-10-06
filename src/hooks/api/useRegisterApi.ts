import { useCallback } from 'react'
import { ErrorResponseDto } from '~/data/common/error.dto'
import { IInstructorRegisterPayload, ILearnerRegisterPayload, IVerifyOtpPayload } from '~/data/register/register.dto'
import { errorMessage } from '~/messages'
import { callApi } from '~/utils/api.caller'

const useRegisterApi = () => {
  const instructorEndpoint = '/auth/instructor'
  const learnerEndpoint = '/auth/learner'

  const instructorRegister = useCallback(async (instructorRegisterPayload: IInstructorRegisterPayload) => {
    const { response, error } = await callApi(
      `${instructorEndpoint}/register`,
      'POST',
      {},
      {},
      instructorRegisterPayload
    )
    if (response) {
      return {
        data: response,
        error: null
      }
    } else if (error!.response) {
      return {
        data: null,
        error: error!.response.data as ErrorResponseDto
      }
    } else {
      return {
        data: null,
        error: { message: errorMessage.ERM033 } as ErrorResponseDto
      }
    }
  }, [])

  const learnerRegister = useCallback(async (learnerRegisterPayload: ILearnerRegisterPayload) => {
    const { response, error } = await callApi(`${learnerEndpoint}/register`, 'POST', {}, {}, learnerRegisterPayload)
    if (response) {
      return {
        data: response,
        error: null
      }
    } else if (error!.response) {
      return {
        data: null,
        error: error!.response.data as ErrorResponseDto
      }
    } else {
      return {
        data: null,
        error: { message: errorMessage.ERM033 } as ErrorResponseDto
      }
    }
  }, [])

  const verifyOtpLearner = useCallback(async (verifyOtpPayload: IVerifyOtpPayload) => {
    const { response, error } = await callApi(`${learnerEndpoint}/verify-otp`, 'POST', {}, {}, verifyOtpPayload)
    if (response) {
      return {
        data: response,
        error: null
      }
    } else if (error!.response) {
      return {
        data: null,
        error: error!.response.data as ErrorResponseDto
      }
    } else {
      return {
        data: null,
        error: { message: errorMessage.ERM033 } as ErrorResponseDto
      }
    }
  }, [])

  const resendOtpLearner = useCallback(async (email: string) => {
    const { response, error } = await callApi(`${learnerEndpoint}/resend-otp`, 'POST', {}, {}, { email })
    if (response) {
      return {
        data: response,
        error: null
      }
    } else if (error!.response) {
      return {
        data: null,
        error: error!.response.data as ErrorResponseDto
      }
    } else {
      return {
        data: null,
        error: { message: errorMessage.ERM033 } as ErrorResponseDto
      }
    }
  }, [])

  return { instructorRegister, learnerRegister, verifyOtpLearner, resendOtpLearner }
}

export default useRegisterApi
