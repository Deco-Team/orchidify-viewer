import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import banner from '~/assets/banner.jpg'
import useRegisterApi from '~/hooks/api/useRegisterApi'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { successMessage } from '~/messages'
import { extractMessage } from '~/utils'
import { useTimer } from 'react-timer-hook'

const OtpVerify = () => {
  const expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 300)
  const [otp, setOtp] = useState('')
  const theme = useTheme()
  const { minutes, seconds, start, restart } = useTimer({ expiryTimestamp })
  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const { verifyOtpLearner, resendOtpLearner } = useRegisterApi()
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email)
    } else {
      navigate('/')
    }
  }, [email, location.state, navigate])

  useEffect(() => {
    start()
  }, [start])

  const handleSubmit = async () => {
    const { data, error } = await verifyOtpLearner({
      code: otp,
      email
    })
    if (data) {
      notifySuccess(extractMessage(successMessage.SSM032, ['Đăng kí']))
      navigate('/')
    } else if (error) {
      notifyError(error!.message)
    }
  }

  const handleResetOtp = async () => {
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 300)
    const { data, error } = await resendOtpLearner(email)
    if (data) {
      notifySuccess(extractMessage(successMessage.SSM032, ['Gửi lại OTP']))
      restart(expiryTimestamp)
    } else if (error) {
      notifyError(error!.message)
    }
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box sx={{ width: '50%', height: '100vh', float: 'right', position: 'relative', overflowY: 'auto' }}>
        <IconButton sx={{ right: 0, m: 3, position: 'fixed' }} onClick={() => navigate('/')}>
          <Close />
        </IconButton>
        <Box
          sx={{
            width: '55%',
            float: 'right',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant='h4' textAlign='center' marginY={4} marginTop={10}>
            Xác thực tài khoản
          </Typography>
          <Typography textAlign='center' marginY={3} variant='body1'>
            Mã xác minh đang được gửi tới email{' '}
            <Typography sx={{ display: 'inline', fontWeight: 700 }}>{email}</Typography>
          </Typography>
          <MuiOtpInput length={6} value={otp} onChange={handleChange} />
          <Typography textAlign='center' marginY={1.5} variant='body1'>
            Không nhận được mã?
          </Typography>
          <Box sx={{ my: 1, display: 'inline-flex', gap: 0.5, width: '100%', justifyContent: 'center', mb: 3 }}>
            <Typography
              variant='body1'
              onClick={() => (minutes || seconds ? null : handleResetOtp())}
              sx={{
                cursor: minutes || seconds ? undefined : 'pointer',
                color: theme.palette.grey[700],
                textDecoration: 'underline'
              }}
            >
              Gửi lại mã {minutes || seconds ? 'sau' : 'tại đây'}
            </Typography>
            {minutes || seconds ? (
              <Typography
                sx={{ color: theme.palette.primary.main }}
              >{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Typography>
            ) : null}
          </Box>
          <Button fullWidth onClick={handleSubmit}>
            Xác minh
          </Button>
        </Box>
      </Box>
      <Box sx={{ background: 'red', width: '50%', height: '100vh' }}>
        <img src={banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
    </Box>
  )
}

export default OtpVerify
