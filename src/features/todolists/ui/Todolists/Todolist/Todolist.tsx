import { useState } from "react"
import { TodolistType } from "../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { addTaskAC } from "../../../model/tasks-reducer"

type Props = {
    todolist: TodolistType
}

export const Todolist = ({ todolist }: Props) => {
    const dispatch = useAppDispatch()
    const [collapsed, setCollapsed] = useState(true)

    const addTask = (title: string) => {
        dispatch(addTaskAC({ title, listID: todolist.id }))
    }

    return <>
        <TodolistTitle todolist={todolist} collapsed={collapsed} setCollapsed={setCollapsed} />
        {collapsed ? <>
            <AddItemForm addItem={addTask} />
            <Tasks todolist={todolist} />
            <FilterTasksButtons todolist={todolist} />
        </> : <></> }
    </>
}