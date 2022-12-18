import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    isError: false
}

export const fetchPerStory = createAsyncThunk('story/fetchPerStory', async (storyID)=>{
    try{
        const host = "http://localhost:5000";
        const res = await fetch(`${host}/api/TravelDetails/${storyID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        const jsonData = await res.json();
        return jsonData;
    }catch(err){
        return err;
    }
})

export const perStorySlice = createSlice({
    name: 'perStory',
    initialState,
    reducers: {
    },
    extraReducers:{
        [fetchPerStory.pending]: (state)=>{
            state.isLoading = true;
        },
        [fetchPerStory.fulfilled]: (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchPerStory.rejected]: (state)=>{
            state.isLoading = false;
            state.isError = true;
        },
    }
})

export default perStorySlice.reducer;