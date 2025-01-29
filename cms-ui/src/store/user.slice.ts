import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "@/lib/interfaces.ts";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null,
    } as UserState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        clearUser: state => {
            state.value = null
        }
    }
})

export default userSlice.reducer

export const {setUser, clearUser}= userSlice.actions