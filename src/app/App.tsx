import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../common/hooks'
import { selectThemeMode, setIsLoggedIn } from './appSlice'
import { Routing } from '../common/components/Routing/Routing'
import { ErrorSnackbar, Header } from '../common/components'
import { getTheme } from '../common/theme'
import { useEffect, useState } from 'react'
import { useMeQuery } from '../features/auth/api/authAPI'
import { ResultCode } from '../common/enums'
import { CircularProgress } from '@mui/material'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data, isLoading } = useMeQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {isInitialized && (
        <>
          <Header />
          <Routing />
        </>
      )}
      {!isInitialized && (
        <div className={'circularProgressContainer'}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
