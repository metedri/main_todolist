import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from '../../../app/appSlice'
import { useLogoutMutation } from '../../../features/auth/api/authAPI'
import { baseApi } from '../../../app/baseApi'
import LinearProgress from '@mui/material/LinearProgress'
import { MenuButton } from '../MenuButton/MenuButton'
import { ResultCode } from '../../enums'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getTheme } from '../../theme'

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [logout] = useLogoutMutation()

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode == 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    logout()
      .then(res => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem('sn-token')
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
        console.log('invalidateTags')
      })
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          To Do List
        </Typography>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
