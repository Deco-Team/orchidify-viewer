export interface ICourseListResponse {
  _id: string
  code: string
  title: string
  price: number
  level: string
  type: string[]
  duration: number
  thumbnail: string
  status: string
  learnerLimit: number
  rate: number
  discount: number
  instructorId: string
  isPublished: true
  createdAt: string
  updatedAt: string
  instructor: {
    _id: string
    name: string
    bio: string
    idCardPhoto: string
    avatar: string
  }
  classesCount: number
}

export interface ICourseType {
  groupName: string
  groupItems: string[]
}
