import { FilterList, Search, SpaceDashboardOutlined, ViewColumn } from '@mui/icons-material'
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { LEVEL } from '~/contracts'
import { ICourseType } from '~/data/courses'

interface IHeaderBar {
  courseTypeList: ICourseType[]
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  level: string[]
  setLevel: (level: string[]) => void
  sortTarget: string
  setSortTarget: (sortTarget: string) => void
  courseType: string[]
  setCourseType: (courseType: string[]) => void
}

const HeaderBar = (props: IHeaderBar) => {
  const { courseTypeList, setSearchKeyword, level, setLevel, setSortTarget, sortTarget, courseType, setCourseType } =
    props

  const handleLevelFilter = (event: SelectChangeEvent<typeof level>) => {
    const {
      target: { value }
    } = event
    setLevel(typeof value === 'string' ? value.split(',') : value)
  }

  const handleCourseTypeFilter = (event: SelectChangeEvent<typeof courseType>) => {
    const {
      target: { value }
    } = event
    setCourseType(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSortTargetFilter = (event: SelectChangeEvent) => {
    setSortTarget(event.target.value)
  }

  const renderGroupedItems = () => {
    return courseTypeList.reduce((acc, group) => {
      acc.push(
        <ListSubheader key={group.groupName} sx={{ color: '#000000', fontWeight: '500' }}>
          {group.groupName}
        </ListSubheader>
      )
      group.groupItems.forEach((item) => {
        acc.push(
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        )
      })
      return acc
    }, [] as JSX.Element[])
  }

  return (
    <Box
      sx={{
        pt: 4.5,
        px: { xs: 5, md: 15 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <TextField
        size='small'
        sx={{ width: '20rem', my: 2.5 }}
        placeholder='Tên khóa học'
        onBlur={(event) => setSearchKeyword(event.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <Search />
              </InputAdornment>
            )
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <FormControl size='small' fullWidth sx={{ width: '10rem' }}>
          <InputLabel id='level-label'>Cấp độ</InputLabel>
          <Select
            startAdornment={
              <InputAdornment position='start'>
                <ViewColumn />
              </InputAdornment>
            }
            labelId='level-label'
            onChange={handleLevelFilter}
            value={level}
            multiple
            label='Cấp độ'
          >
            <MenuItem value={LEVEL.BASIC}>Cơ bản</MenuItem>
            <MenuItem value={LEVEL.INTERMEDIATE}>Trung bình</MenuItem>
            <MenuItem value={LEVEL.ADVANCED}>Nâng cao</MenuItem>
          </Select>
        </FormControl>
        <FormControl size='small' fullWidth sx={{ width: '10rem' }}>
          <InputLabel id='level-label'>Thể loại</InputLabel>
          <Select
            startAdornment={
              <InputAdornment position='start'>
                <SpaceDashboardOutlined />
              </InputAdornment>
            }
            multiple
            labelId='level-label'
            onChange={handleCourseTypeFilter}
            value={courseType}
            label='Thể loại'
          >
            {renderGroupedItems()}
          </Select>
        </FormControl>
        <FormControl size='small' fullWidth sx={{ width: '10rem' }}>
          <InputLabel id='level-label'>Sắp xếp theo</InputLabel>
          <Select
            startAdornment={
              <InputAdornment position='start'>
                <FilterList />
              </InputAdornment>
            }
            labelId='level-label'
            onChange={handleSortTargetFilter}
            value={sortTarget}
            label='Sắp xếp theo'
          >
            <MenuItem value='title.asc'>Tên từ A-Z</MenuItem>
            <MenuItem value='title.desc'>Tên từ Z-A</MenuItem>
            <MenuItem value='price.asc'>Giá tăng dần</MenuItem>
            <MenuItem value='price.desc'>Giá giảm dần</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default HeaderBar
