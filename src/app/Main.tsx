import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { addTodolistAC, removeAllTodolistAC } from '../features/todolists/model/todolists-reducer';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
import { Todolists } from '../features/todolists/ui/Todolists/Todolists';

export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => dispatch(addTodolistAC(title)) 
    const removeAllTodolist = () => dispatch(removeAllTodolistAC()) 

    return (
        <Container fixed>
            <Grid container spacing={3} sx={{ mb: '30px' }}>
                <AddItemForm addItem={addTodolist} />
                <Button onClick={removeAllTodolist} variant='outlined' startIcon={<DeleteIcon />} disableElevation>Remove all</Button>
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}