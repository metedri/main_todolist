import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { useAppSelector } from '../../../../../../common/hooks'
import { Task } from './Task/Task'
import { DomainTodolist } from '../../../../lib/types/types'
import { useState } from 'react'
import { PAGE_SIZE, useGetTasksQuery } from '../../../../api/tasksApi'
import { TaskStatus } from '../../../../../../common/enums'
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton/TasksSkeleton'
import { TasksPagination } from '../TasksPagination/TasksPagination'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

  let tasksForTodolist = data?.items

  if (todolist.filter === 'active') {
    tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.New)
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <Box sx={{ padding: '10px 0' }}>Задач нет</Box>
      ) : (
        <>
          <List>
            {tasksForTodolist?.map(task => (
              <Task key={task.id} task={task} todolist={todolist} />
            ))}
          </List>
          {data?.totalCount != undefined && data?.totalCount >= PAGE_SIZE && (
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
          )}
        </>
      )}
    </>
  )
}
