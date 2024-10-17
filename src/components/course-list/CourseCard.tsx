import { AccessTime, Book, Person, Receipt, Star, StarBorder, ViewColumn } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ICourseCard {
  title: string
  level: { title: string; color: string }
  price: number
  thumbnail: string
  instructorName: string
  instructorAvatar: string
  learnerLimit: number
  classNumber: number
  duration: number
  status: string
  rate: number
}

const CourseCard = (props: ICourseCard) => {
  const theme = useTheme()
  const {
    classNumber,
    instructorAvatar,
    instructorName,
    learnerLimit,
    level,
    price,
    thumbnail,
    title,
    duration,
    rate
  } = props
  const navigate = useNavigate()
  return (
    <Card onClick={() => navigate('/')} sx={{ borderRadius: 4, cursor: 'pointer' }}>
      <Box sx={{ position: 'relative', mx: 3, mt: 3 }}>
        <CardMedia sx={{ height: 250, borderRadius: 4, mb: 0 }} image={thumbnail} title='green iguana' />
        <Box
          sx={{
            display: 'inline-flex',
            p: 1,
            borderRadius: 2,
            gap: 0.5,
            position: 'absolute',
            background: level.color,
            color: 'white',
            bottom: 20,
            left: 20
          }}
        >
          <ViewColumn htmlColor='white' />
          <Typography variant='body1'>{level.title}</Typography>
        </Box>
      </Box>
      <CardContent sx={{ pt: 1.5, mx: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant='h5' sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='h6' sx={{ fontWeight: 400 }}>
              {rate}
            </Typography>
            <Star color='primary' />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Avatar sx={{ width: '1.75rem', height: '1.75rem' }} src={instructorAvatar} />
          <Typography variant='h6' sx={{ fontWeight: 500, color: theme.palette.primary.main }}>
            {instructorName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, ml: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Person fontSize='small' color='disabled' />
            <Typography variant='body2'>{learnerLimit} học viên</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Receipt fontSize='small' color='disabled' />
            <Typography variant='body2'>{duration * 2} buổi học</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Book fontSize='small' color='disabled' />
            <Typography variant='body2'>{classNumber} lớp học</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <AccessTime fontSize='small' color='disabled' />
            <Typography variant='body2'>{duration} tuần</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <StarBorder fontSize='small' color='disabled' />
            <Typography variant='body2'>Có chứng chỉ</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ mt: -1.5, mx: 4, mb: 2.5 }}>
        <Typography variant='h5' sx={{ fontWeight: 500 }} component='div'>
          {price.toLocaleString()}đ
        </Typography>
      </CardActions>
    </Card>
  )
}

export default CourseCard
