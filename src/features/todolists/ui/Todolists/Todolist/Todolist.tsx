import { useState } from 'react'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { Tasks } from './Tasks/Tasks'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { AddItemForm } from '../../../../../common/components'
import { useAddTaskMutation } from '../../../api/tasksApi'
import { DomainTodolist } from '../../../lib/types/types'

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [collapsed, setCollapsed] = useState(true)

  const [addTask] = useAddTaskMutation()

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId: todolist.id })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} collapsed={collapsed} setCollapsed={setCollapsed} />
      {collapsed ? (
        <>
          <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
          <Tasks todolist={todolist} />
          <FilterTasksButtons todolist={todolist} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
