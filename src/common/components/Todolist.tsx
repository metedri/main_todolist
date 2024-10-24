import { ChangeEvent } from "react"
import { FilterValues, TaskType } from "../../App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"

type Props = {
    title: string
    tasks: TaskType[]
    listID: string
    removeTask: (id: string, listID: string) => void
    changeFilter: (filter: FilterValues, listID: string) => void
    addTask: (title: string, listID: string) => void
    changeTaskStatus: (id: string, status: boolean, listID: string) => void
    removeTodolist: (listID: string) => void
    changeTaskTitle: (id: string, title: string, listID: string) => void
    changeTodolistTitle: (title: string, listID: string) => void
}

export const Todolist = (props: Props) => {
    const { title, tasks, listID, removeTask, addTask, changeTaskTitle, changeTodolistTitle, changeFilter, changeTaskStatus, removeTodolist } = props

    const addTaskHandler = (title: string) => {
        addTask(title, listID)
    }

    const changeTodolistHandler = (title: string) => {
        changeTodolistTitle(title, listID)
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan changeTitle={changeTodolistHandler} value={title}/>
                    </h3>
                <button onClick={() => removeTodolist(listID)}>X</button>
            </div>
            <AddItemForm addItem={addTaskHandler} />
            {tasks.length === 0
                ? <div>Задач нет</div>
                : <ul>
                    {tasks.map(t => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, listID)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(t.id, title, listID)
                        }

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                            <EditableSpan changeTitle={changeTaskTitleHandler} value={t.title}/>
                            <button onClick={() => removeTask(t.id, listID)}>X</button>
                        </li>
                    })}
                </ul>
            }
            <div>
                <button onClick={() => changeFilter('all', listID)}>All</button>
                <button onClick={() => changeFilter('active', listID)}>Active</button>
                <button onClick={() => changeFilter('completed', listID)}>Completed</button>
            </div>
        </div>

    )
}