import { ChangeEvent, useState, KeyboardEvent } from "react"

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
        if (e.key === 'Enter') {addItemHandler()}
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
            <input value={inputValue} onChange={newValueOnChangeHandler} onKeyDown={newValueOnKeyUpHandler}/>
            <button onClick={addItemHandler}>+</button>
            {error && <div>{error}</div> }
        </div>

    )
}