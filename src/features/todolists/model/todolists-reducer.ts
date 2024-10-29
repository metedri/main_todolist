import { v1 } from "uuid";

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: Actiontype): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.listID)
        }
        case 'ADD_TODOLIST': {
            return [...state, { id: action.payload.listID, title: action.payload.title, filter: 'all' }]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => tl.id === action.payload.listID ? { ...tl, title: action.payload.title } : tl)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(tl => tl.id === action.payload.listID ? { ...tl, filter: action.payload.filter } : tl)
        }
        case "REMOVE_ALL_TODOLIST": {
            return initialState
        }
        default:
            return state;
    }
}

// Action creaters

export const removeTodolistAC = (listID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            listID,
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            listID: v1(),
            title
        }
    } as const
}

export const changeTodolistTitleAC = (payload: { title: string, listID: string }) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: { filter: FilterValues, listID: string }) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload
    } as const
}

export const removeAllTodolistAC = () => {
    return {
        type: 'REMOVE_ALL_TODOLIST',
    } as const
}

// Action types

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveAllTodolistACActionType = ReturnType<typeof removeAllTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type Actiontype = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | RemoveAllTodolistACActionType

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'


