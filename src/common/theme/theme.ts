import { createTheme } from '@mui/material/styles'
import { ThemeMode } from '../../app/app-reducer'
 
export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
        mode: themeMode,
        primary: {
          main: '#adc0ff',
          dark: '#7289d8',
          contrastText: '#3b4c86',
        },
      },
      typography: {
        fontFamily: [
          'Nunito',
          'sans-serif',
        ].join(','),
      },
  })
}