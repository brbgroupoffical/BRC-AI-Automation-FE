import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    access: null,
    refresh: null,
    user: null,
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("Setting user:", action.payload)
            const { access, refresh, user } = action.payload
            state.access = access
            state.refresh = refresh
            state.user = user
            state.isAuthenticated = true
        },
        removeUser: (state) => {
            state.access = null
            state.refresh = null
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
