import { Box, Pagination } from '@mui/material'
import CourseCard from '~/components/course-list/CourseCard'
import HeaderBar from '~/components/course-list/HeaderBar'
import Grid from '@mui/material/Grid2'
import { useEffect, useState } from 'react'
import { ICourseListResponse, ICourseType } from '~/data/courses'
import useCourseApi from '~/hooks/api/useCourseApi'
import { notifyError } from '~/utils/toastify'
import { IPagination } from '~/data/common/response.dto'
import { extractLevel } from '~/utils'
import { LEVEL } from '~/contracts'

const CourseList = () => {
  const [courseList, setCourseList] = useState<IPagination<ICourseListResponse> | null>(null)
  const [courseTypeList, setCourseTypeList] = useState<ICourseType[] | null>(null)
  const { getCourseList, getCourseTypes } = useCourseApi()

  const [searchKeyword, setSearchKeyword] = useState('')
  const [level, setLevel] = useState<string[]>([])
  const [sortTarget, setSortTarget] = useState('')
  const [courseType, setCourseType] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [{ courseData, courseError }, { typeData, typeError }] = await Promise.all([
        getCourseList(),
        getCourseTypes()
      ])
      if (courseData) {
        setCourseList(courseData)
      } else if (courseError) {
        notifyError(courseError!.message)
      }
      if (typeData) {
        setCourseTypeList(typeData)
      } else if (typeError) {
        notifyError(typeError!.message)
      }
    }
    fetchData()
  }, [getCourseList, getCourseTypes])

  useEffect(() => {
    const fetchData = async () => {
      const courseTypeToString = courseType.join(', ')
      const { courseData, courseError } = await getCourseList(
        searchKeyword,
        courseTypeToString,
        level,
        undefined,
        undefined,
        sortTarget
      )
      if (courseData) {
        setCourseList(courseData)
      } else if (courseError) {
        notifyError(courseError!.message)
      }
    }
    fetchData()
  }, [courseType, getCourseList, level, searchKeyword, sortTarget])

  return (
    <Box sx={{ pb: 10, display: 'flex', flexDirection: 'column' }}>
      <HeaderBar
        courseType={courseType}
        setCourseType={setCourseType}
        level={level}
        setLevel={setLevel}
        setSortTarget={setSortTarget}
        sortTarget={sortTarget}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        courseTypeList={courseTypeList || []}
      />
      <Grid
        container
        sx={{ pt: 2.5, px: { xs: 2.5, md: 10 }, mx: { xs: 2.5, md: 10 }, mt: 2.5 }}
        spacing={{ xs: 4, md: 6 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {courseList &&
          courseList.docs.map((data, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <CourseCard
                title={data.title}
                price={data.price}
                duration={data.duration}
                instructorAvatar={data.instructor.avatar}
                instructorName={data.instructor.name}
                learnerLimit={data.learnerLimit}
                level={extractLevel(data.level as LEVEL)}
                classNumber={data.classesCount}
                status={data.status}
                thumbnail={data.thumbnail}
                rate={data.rate}
              />
            </Grid>
          ))}
      </Grid>
      <Pagination sx={{ my: 5, mx: 'auto' }} color='primary' count={courseList?.pagingCounter} shape='rounded' />
    </Box>
  )
}

export default CourseList
