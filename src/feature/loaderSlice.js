
import { createSlice } from "@reduxjs/toolkit"

const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        oneToOneLoader: false,
        oneToManyLoader: false,
        manyToManyLoader: false,
    },
    reducers: {
        setLoading: (state, action) => {
            const { key, value } = action.payload
            if (state.hasOwnProperty(key)) {
                state[key] = value
            }
        },
        resetLoaders: () => initialState,
    },
})

export const { setLoading } = loaderSlice.actions
export default loaderSlice.reducer
