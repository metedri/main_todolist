import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { Todolist } from './Todolist/Todolist';
import { selectTodolists } from '../../model/todolistsSelectors';

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return <>
        {todolists.map(tl => {
            return (
                <Grid key={tl.id}>
                    <Paper sx={{ p: '0 20px 20px 20px' }} elevation={6}>
                        <Todolist todolist={tl} />
                    </Paper>
                </Grid>
            )
        })}
    </>
}