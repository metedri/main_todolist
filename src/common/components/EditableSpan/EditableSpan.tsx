import TextField from '@mui/material/TextField'
import { ChangeEvent, useState, KeyboardEvent } from 'react'

type Props = {
  value: string
  onChange: (title: string) => void
  disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled = false }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [newValue, setNewValue] = useState(value)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.currentTarget.value)
  }

  const onBlurHandler = () => {
    setEditMode(false)
    onChange(newValue)
  }

  const onDoubleClickHandler = () => {
    if (disabled) {
      return
    }
    setEditMode(true)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange(newValue)
      setEditMode(false)
    }
  }

  return editMode ? (
    <TextField
      value={newValue}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onKeyDown={onKeyDownHandler}
      autoFocus
      size="small"
      variant="standard"
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{value}</span>
  )
}
