import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import logo from '~/assets/logo.png'

function Header() {
  const pages = [
    { title: 'Ứng tuyển', variant: 'text', href: '/instructor-register' },
    { title: 'Đăng kí', variant: 'contained', href: '/learner-register' }
  ]
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (href: string) => {
    setAnchorElNav(null)
    navigate(href)
  }

  return (
    <AppBar position='static' sx={{ background: 'transparent', color: 'black' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} width={75}>
              <img src={logo} width={75} onClick={() => navigate('/')} />
            </Box>
            <Typography
              variant='h5'
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Orchidify
            </Typography>
          </Box>

          <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} width={75}>
              <img src={logo} width={75} onClick={() => navigate('/')} />
            </Box>
            <Typography
              variant='h5'
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Orchidify
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon color='action' />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={() => handleCloseNavMenu(page.href)}>
                  <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                variant={page.variant as 'text' | 'outlined' | 'contained'}
                key={i}
                onClick={() => handleCloseNavMenu(page.href)}
                sx={{ my: 2, display: 'block', mx: 1 }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
