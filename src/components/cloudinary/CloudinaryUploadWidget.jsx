import { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { text } from './cloudinary-text'
import { FileSize } from '~/contracts'
import { extractMessage } from '~/utils'
import { errorMessage } from '~/messages'

const CloudinaryUploadWidget = ({
  onSuccess,
  minFile,
  maxFiles,
  clientAllowedFormats,
  maxFileSize,
  multiple,
  disabled,
  buttonStyle = {}
}) => {
  const [widget, setWidget] = useState(null)
  const initializeCloudinaryWidget = useCallback(() => {
    setWidget(
      window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          sources: ['local'],
          language: 'vi',
          singleUploadAutoClose: false,
          text: {
            ...text,
            vi: {
              ...text.vi,
              notifications: {
                ...text.vi.notifications,
                limit_reached: extractMessage(errorMessage.ERM012, [minFile, maxFiles])
              },
              uploader: {
                ...text.vi.uploader,
                errors: {
                  ...text.vi.uploader.errors,
                  unavailable: 'Không có sẵn',
                  max_number_of_files: extractMessage(errorMessage.ERM012, [minFile, maxFiles]),
                  allowed_formats: extractMessage(errorMessage.ERM012, [
                    clientAllowedFormats.join(', '),
                    maxFileSize.text
                  ]),
                  max_file_size: extractMessage(errorMessage.ERM012, [
                    clientAllowedFormats.join(', '),
                    maxFileSize.text
                  ]),
                  min_file_size: extractMessage(errorMessage.ERM012, [
                    clientAllowedFormats.join(', '),
                    maxFileSize.text
                  ])
                }
              }
            }
          },
          clientAllowedFormats: clientAllowedFormats ? clientAllowedFormats : null,
          maxFiles: maxFiles ? maxFiles : null,
          maxFileSize: maxFileSize ? maxFileSize.size : 'unlimited',
          maxImageFileSize: FileSize['5MB'].size,
          maxVideoFileSize: FileSize['100MB'].size,
          multiple: !!multiple
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            onSuccess(result.info)
          }
        }
      )
    )
  }, [])

  useEffect(() => {
    initializeCloudinaryWidget()
    return () => {
      if (widget) widget.destroy()
    }
  }, [])

  return (
    <Button
      id='upload_widget'
      sx={buttonStyle}
      onClick={() => {
        widget.update({ maxFiles: maxFiles })
        widget.open()
      }}
      disabled={disabled}
    >
      Tải lên
    </Button>
  )
}

export default CloudinaryUploadWidget
