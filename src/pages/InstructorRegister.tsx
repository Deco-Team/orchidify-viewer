import { zodResolver } from '@hookform/resolvers/zod'
import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ControlledFileFieldUpload } from '~/components/form/ControlledFileFieldUpload'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { FileFormat, FileSize } from '~/contracts'
import { IInstructorRegisterFormPayload } from '~/data/register/register.dto'
import useRegisterApi from '~/hooks/api/useRegisterApi'
import { successMessage } from '~/messages'
import { extractMessage } from '~/utils'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { instructorRegisterSchema } from '~/validation/register.validation'

const InstructorRegister = () => {
  const navigate = useNavigate()
  const { instructorRegister } = useRegisterApi()
  const { control, handleSubmit } = useForm<IInstructorRegisterFormPayload>({
    resolver: zodResolver(instructorRegisterSchema)
  })

  const onSubmit = async (payload: IInstructorRegisterFormPayload) => {
    notifyLoading()
    const { data, error } = await instructorRegister({
      ...payload,
      cv: payload.cv[0].url
    })
    if (data) {
      navigate('/')
      notifySuccess(extractMessage(successMessage.SSM032, ['Ứng tuyển']))
    } else if (error) {
      notifyError(error!.message)
    }
  }

  return (
    <Box sx={{ position: 'relative', pt: 10 }}>
      <IconButton sx={{ position: 'absolute', m: 3, right: 0, top: 0 }} onClick={() => navigate(-1)}>
        <Close />
      </IconButton>
      <Box
        sx={{
          width: { xs: '80%', md: '50%' },
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          mb: 5
        }}
      >
        <Typography textAlign='center' variant='h4'>
          Ứng tuyển giảng viên giảng dạy
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '80px' }}>
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
          <ControlledFileFieldUpload
            clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png, FileFormat.pdf]}
            minFile={1}
            label='CV'
            maxFileSize={FileSize['5MB']}
            controller={{ name: 'cv', control }}
          />
          <ControlledOutlinedInput
            sx={{ my: 3 }}
            placeholder='Nhập ghi chú'
            fullWidth
            rows={5}
            multiline
            controller={{ name: 'note', control }}
            label='Ghi chú'
          />
          <Button fullWidth type='submit'>
            Gửi đơn
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default InstructorRegister
