import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeThemeAC } from '../../../app/app-reducer';
import { MenuButton } from '../MenuButton/MenuButton';
import { selectThemeMode } from '../../../app/appSelectors';


export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode == 'light' ? 'dark' : 'light'))
  }

  return (
    <AppBar position='static' sx={{ mb: '30px' }}>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }} >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          To Do List
        </Typography>
        <MenuButton>Login</MenuButton>
        <MenuButton>Logout</MenuButton>
        <MenuButton>Faq</MenuButton>
        <Switch color={'default'} onChange={changeModeHandler} />
      </Toolbar>
    </AppBar>

  )
}