import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import { Todolist } from './Todolist/Todolist'
import { useGetTodolistsQuery } from '../../api/todolistsApi'
import { TodolistSkeleton } from '../skeletons/TodolistSkeleton/TodolistSkeleton'
import { useAppSelector } from '../../../../common/hooks'
import { selectIsLoggedIn } from '../../../../app/appSlice'

export const Todolists = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, { skip: !isLoggedIn })

  if (!isLoggedIn) {
    return null
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
        {Array(9)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

  return (
    <>
      {todolists?.map(tl => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: '0 20px 20px 20px' }} elevation={6}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
