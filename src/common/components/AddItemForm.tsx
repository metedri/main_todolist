import AddBoxIcon from '@mui/icons-material/AddBox';
import { ChangeEvent, useState, KeyboardEvent } from "react"
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';

type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: Props) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const newValueOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const newValueOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') { addItemHandler() }
    }

    const addItemHandler = () => {
        if (inputValue.trim() !== '') {
            addItem(inputValue)
            setInputValue('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField value={inputValue} onChange={newValueOnChangeHandler} onKeyDown={newValueOnKeyUpHandler} 
            size='small' label='Enter a title' error={!!error} helperText={error}/>
            <IconButton onClick={addItemHandler}>
                <AddBoxIcon color='primary'/>
            </IconButton>
        </div>

    )
}