import { lazy } from 'react'

const Welcome = lazy(() => import('~/pages/Welcome'))
const CourseList = lazy(() => import('~/pages/CourseList'))
const LearnerRegister = lazy(() => import('~/pages/LearnerRegister'))
const InstructorRegister = lazy(() => import('~/pages/InstructorRegister'))

export const publicRoute = {
  login: {
    name: 'Orchidify',
    path: '/',
    Component: Welcome
  },
  courseList: {
    name: 'Danh sách khóa học',
    path: '/courses',
    Component: CourseList
  }
}

export const withoutHeaderRoute = {
  login: {
    name: 'Đăng kí học viên - Orchidify',
    path: '/learner-register',
    Component: LearnerRegister
  },
  courseList: {
    name: 'Đăng kí giảng viên - Orchidify',
    path: '/instructor-register',
    Component: InstructorRegister
  }
}
