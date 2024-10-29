import { v1 } from "uuid"
import { AddTodolistActionType, RemoveAllTodolistACActionType, RemoveTodolistActionType } from "../model/todolists-reducer"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: Actiontype): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].filter(t => t.id !== action.payload.id)
            }
        }
        case 'ADD_TASK': {
            const newTask = { id: v1(), title: action.payload.title, isDone: false }
            return { ...state, [action.payload.listID]: [newTask, ...state[action.payload.listID]] }
        }
        case 'CHANGE_TASK_STATUS': {
            return { ...state, [action.payload.listID]: state[action.payload.listID].map(t => t.id === action.payload.id ? { ...t, isDone: action.payload.status } : t) }
        }
        case 'CHANGE_TASK_TITLE': {
            return { ...state, [action.payload.listID]: state[action.payload.listID].map(t => t.id === action.payload.id ? { ...t, title: action.payload.title } : t) }
        }
        case 'ADD_TODOLIST': {
            return { ...state, [action.payload.listID]: [] }
        }
        case 'REMOVE_TODOLIST': {
            let copyState = { ...state }
            delete copyState[action.payload.listID]
            return copyState
        }
        case 'REMOVE_ALL_TODOLIST': {
            return initialState
        }
        default:
            return state
    }
}

// Action creaters

export const removeTaskAC = (payload: { id: string, listID: string }) => {
    return {
        type: 'REMOVE_TASK',
        payload
    } as const
}

export const addTaskAC = (payload: { title: string, listID: string }) => {
    return {
        type: 'ADD_TASK',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: { id: string, status: boolean, listID: string }) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: { id: string, title: string, listID: string }) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload
    } as const
}

// Action types

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type Actiontype = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | RemoveAllTodolistACActionType

