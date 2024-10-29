import { Box, Button, Container, Typography, useTheme } from '@mui/material'
import QRCode from 'react-qr-code'
import { useNavigate } from 'react-router-dom'
import phone from '~/assets/phone.png'
const Welcome = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        py: 5
      }}
    >
      <Box>
        <img src={phone} width={275} />
      </Box>
      <Box sx={{ display: 'flex', gap: 5, flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            mt: { xs: 5, md: 0 }
          }}
        >
          <Typography
            sx={{ display: 'inline', fontSize: { xs: 35 }, textAlign: { xs: 'center' } }}
            variant='h3'
            fontWeight={500}
          >
            Tải ứng dụng
            <Typography
              sx={{ display: 'inline', fontSize: { xs: 35 }, textAlign: { xs: 'center' } }}
              variant='h3'
              fontWeight={700}
              color={theme.palette.primary.main}
            >
              {' '}
              Orchidify
            </Typography>
          </Typography>
        </Box>
        <Typography>Tải Orchidify cho IOS và Android. Ứng dụng hỗ trợ học tập chăm sóc hoa lan.</Typography>
        <QRCode value='https://orchidify.com/' />
        <Button color='primary' onClick={() => navigate('/courses')}>
          Tham khảo khóa học
        </Button>
      </Box>
    </Container>
  )
}

export default Welcome
