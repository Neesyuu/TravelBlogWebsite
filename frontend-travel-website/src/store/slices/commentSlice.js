import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cData: [],
    isCLoading: false,
    isCError: false
}

export const fetchComment = createAsyncThunk('story/fetchComment', async (storyID)=>{
    try{
        const host = "http://localhost:5000";
        const res = await fetch(`${host}/api/comment/${storyID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if(!res.ok){
            throw Error('Error on server');
        }
        const jsonData = await res.json();
        return jsonData;
    }catch(err){
        return err;
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers:{
        [fetchComment.pending]: (state)=>{
            state.isCLoading = true;
        },
        [fetchComment.fulfilled]: (state, action)=>{
            state.isCLoading = false;
            state.cData = action.payload;
        },
        [fetchComment.rejected]: (state)=>{
            state.isCLoading = false;
            state.isCError = true;
        },
    }
})

export default commentSlice.reducer;