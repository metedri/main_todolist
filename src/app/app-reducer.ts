const initialState = {
  themeMode: 'light' as ThemeMode,
}
 
export const appReducer = ( state: InitialState = initialState,  action: ActionsType): InitialState => {
  switch (action.type) {
    case 'CHAGE_THEME':
      return {...state, themeMode: action.payload.themeMode}
    default:
      return state
  }
}

// Action creaters

export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: 'CHAGE_THEME',
        payload: {themeMode}
    } as const
}

// Action types

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type ThemeMode = 'dark' | 'light'
type ActionsType = ChangeThemeActionType
type InitialState = typeof initialState