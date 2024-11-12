import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type Props = {
    background?: string
  }
 
export const MenuButton = styled(Button)<Props>(({ background, theme }) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `2px 2px 0 0 ${theme.palette.primary.dark}`,
    borderRadius: '5px',
    border: `1px solid ${theme.palette.primary.dark}`,
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    background: background || theme.palette.primary.light,
  }))