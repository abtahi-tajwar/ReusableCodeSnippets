import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: Store.Config = {
    darkMode: false,
}

export const configSlice = createSlice({
    name: 'config',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        toggleDarkTheme: (state) => {
            state.darkMode = !state.darkMode
        },
        setDarkTheme: (state, action) => {
            state.darkMode = action.payload
        }
    }
})

export const { toggleDarkTheme, setDarkTheme } = configSlice.actions

export default configSlice.reducer