import { yupResolver } from '@hookform/resolvers/yup'
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import banner from '~/assets/banner.jpg'
import ControlledDateTimeInput from '~/components/form/ControlledDateTimeInput'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { ILearnerRegisterFormPayload } from '~/data/register/register.dto'
import useRegisterApi from '~/hooks/api/useRegisterApi'
import { dismiss, notifyError, notifyLoading } from '~/utils/toastify'
import { learnerRegisterSchema } from '~/validation/register.validation'

const LearnerRegister = () => {
  const navigate = useNavigate()
  const { learnerRegister } = useRegisterApi()
  const { control, handleSubmit } = useForm<ILearnerRegisterFormPayload>({
    resolver: yupResolver(learnerRegisterSchema)
  })

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] = useState(false)

  const onSubmit = async (payload: ILearnerRegisterFormPayload) => {
    notifyLoading()
    const { data, error } = await learnerRegister(payload)
    if (data) {
      navigate('/otp-verify', { state: { email: payload.email } })
      dismiss()
    } else if (error) {
      notifyError(error!.message)
    }
  }

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleClickShowPasswordConfirmation = () => {
    setIsShowPasswordConfirmation(!isShowPasswordConfirmation)
  }

  const handleMouseDownPasswordConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box sx={{ width: '50%', height: '100vh', float: 'right', position: 'relative', overflowY: 'auto' }}>
        <IconButton sx={{ right: 0, m: 3, position: 'fixed' }} onClick={() => navigate(-1)}>
          <Close />
        </IconButton>
        <Box
          sx={{
            width: '65%',
            float: 'right',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <Typography variant='h4' textAlign='center' marginY={4} marginTop={10}>
            Đăng kí
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledOutlinedInput
              sx={{ my: 3 }}
              placeholder='Nhập họ và tên'
              fullWidth
              controller={{ name: 'name', control }}
              label='Họ và tên'
            />
            <ControlledOutlinedInput
              sx={{ my: 3 }}
              placeholder='Nhập email'
              fullWidth
              controller={{ name: 'email', control }}
              label='Email'
            />
            <ControlledOutlinedInput
              sx={{ my: 3 }}
              placeholder='Nhập số điện thoại'
              fullWidth
              controller={{ name: 'phone', control }}
              label='Số điện thoại'
            />
            <ControlledDateTimeInput label='Ngày sinh' controller={{ name: 'dateOfBirth', control }} />
            <ControlledOutlinedInput
              sx={{ my: 3 }}
              placeholder='Nhập mật khẩu'
              type={isShowPassword ? 'text' : 'password'}
              fullWidth
              controller={{ name: 'password', control }}
              label='Mật khẩu'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <ControlledOutlinedInput
              sx={{ my: 3 }}
              placeholder='Nhập mật khẩu'
              fullWidth
              controller={{ name: 'passwordConfirmation', control }}
              label='Xác nhận mật khẩu'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPasswordConfirmation}
                    onMouseDown={handleMouseDownPasswordConfirmation}
                    edge='end'
                  >
                    {isShowPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              type={isShowPasswordConfirmation ? 'text' : 'password'}
            />
            <Button size='large' sx={{ my: 3, marginBottom: 10 }} fullWidth type='submit'>
              Đăng kí
            </Button>
          </form>
        </Box>
      </Box>
      <Box sx={{ background: 'red', width: '50%', height: '100vh' }}>
        <img src={banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
    </Box>
  )
}

export default LearnerRegister
