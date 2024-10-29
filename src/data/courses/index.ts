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
  ratingSummary: {
    totalSum: number
    totalCount: number
    totalCountByRate: {
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
    }
  }
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
