import { Box, FormHelperText, InputLabel, OutlinedInputProps } from '@mui/material'
import { Controller, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

interface ControlledDateTimeInputProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
}

const ControlledDateTimeInput = <TFieldValues extends FieldValues>({
  controller,
  label,
  sx
}: ControlledDateTimeInputProps<TFieldValues> & OutlinedInputProps) => {
  const {
    fieldState: { error }
  } = useController(controller)

  const tenYearsAgo = dayjs().subtract(10, 'year')

  return (
    <Box sx={{ ...sx, display: 'flex', flexDirection: 'column' }}>
      <InputLabel sx={{ color: '#000000' }}>{label}</InputLabel>
      <Box>
        <Controller
          control={controller.control}
          name={controller.name}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['day', 'month', 'year']}
                sx={{ width: '100%' }}
                format='DD/MM/YYYY'
                value={field.value}
                disableFuture
                onChange={field.onChange}
                maxDate={tenYearsAgo}
              />
            </LocalizationProvider>
          )}
        />
        {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
      </Box>
    </Box>
  )
}

export default ControlledDateTimeInput
