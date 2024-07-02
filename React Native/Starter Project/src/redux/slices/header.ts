import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: Store.Navigation = {
    goBackFunc: null,
}

export const navigationSlice = createSlice({
    name: 'navigation',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setGoBackFunction: (state, action) => {
            state.goBackFunc = action.payload
        }
    }
})

export const { setGoBackFunction } = navigationSlice.actions

export default navigationSlice.reducer