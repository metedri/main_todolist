import TextField from "@mui/material/TextField"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type Props = {
    value: string
    changeTitle: (title: string) => void
}

export const EditableSpan = ({ value, changeTitle }: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [newValue, setNewValue] = useState(value)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        setEditMode(false)
        changeTitle(newValue)
    }

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeTitle(newValue)
            setEditMode(false)
        }
    };



    return (
        editMode
            ? <TextField
                value={newValue}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyDown={onKeyDownHandler}
                autoFocus
                size='small'
                variant='standard'
            />
            : <span onDoubleClick={onDoubleClickHandler}>{value}</span>

    )
}