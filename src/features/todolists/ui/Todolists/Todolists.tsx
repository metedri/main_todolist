import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { Todolist } from './Todolist/Todolist';

export const Todolists = () => {
    const todolists = useAppSelector(state => state.todolists)

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