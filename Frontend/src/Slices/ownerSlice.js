import { createSlice } from "@reduxjs/toolkit";

const initialState={
    owner: {
        name: '',
        email: '',
        ownerId:''
    }
}

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwner:(state, action) =>{
            state.owner.name = action.payload.name,
            state.owner.email = action.payload.email,
            state.owner.ownerId = action.payload.ownerId
        }
    }
})


export const {setOwner} = ownerSlice.actions

export default ownerSlice.reducer