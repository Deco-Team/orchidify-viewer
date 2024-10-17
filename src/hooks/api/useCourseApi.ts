import { useCallback } from 'react'
import { ErrorResponseDto } from '~/data/common/error.dto'
import { IPagination } from '~/data/common/response.dto'
import { ICourseListResponse, ICourseType } from '~/data/courses'
import { errorMessage } from '~/messages'
import { callApi } from '~/utils/api.caller'

const useCourseApi = () => {
  const getCourseList = useCallback(
    async (title?: string, type?: string, level?: string[], page?: number, limit?: number, sort?: string) => {
      const { response, error } = await callApi(
        '/courses',
        'GET',
        {},
        {
          title,
          type,
          level,
          page,
          limit,
          sort
        }
      )
      if (response) {
        return {
          courseData: response.data.data as unknown as IPagination<ICourseListResponse>,
          courseError: null
        }
      } else if (error!.response) {
        return {
          courseData: null,
          courseError: error!.response.data as ErrorResponseDto
        }
      } else {
        return {
          courseData: null,
          courseError: { message: errorMessage.ERM033 } as ErrorResponseDto
        }
      }
    },
    []
  )

  const getCourseTypes = useCallback(async () => {
    const { response, error } = await callApi('/settings/course-types', 'GET')
    if (response) {
      return {
        typeData: response.data.data.docs as unknown as ICourseType[],
        typeError: null
      }
    } else if (error!.response) {
      return {
        typeData: null,
        typeError: error!.response.data as ErrorResponseDto
      }
    } else {
      return {
        typeData: null,
        typeError: { message: errorMessage.ERM033 } as ErrorResponseDto
      }
    }
  }, [])

  return { getCourseList, getCourseTypes }
}

export default useCourseApi
