import { CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import MuiTheme from './themes/MuiTheme'
import { Route, Routes } from 'react-router-dom'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { publicRoute, withoutHeaderRoute } from './routes/routes'
import { Suspense } from 'react'
import Loading from './components/common/Loading'
import Page from './components/common/Page'
import Header from './components/common/Header'

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <MuiTheme>
        <Routes>
          {Object.entries(publicRoute).map(([, { path, Component, name }]) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Loading fullViewport />}>
                  <Header />
                  <Page title={name} children={<Component />}></Page>
                </Suspense>
              }
            />
          ))}
          {Object.entries(withoutHeaderRoute).map(([, { path, Component, name }]) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Loading fullViewport />}>
                  <Page title={name} children={<Component />}></Page>
                </Suspense>
              }
            />
          ))}
        </Routes>
      </MuiTheme>
    </>
  )
}

export default App
