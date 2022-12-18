import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    isError: false
}

export const fetchStory = createAsyncThunk('story/fetchStory', async ()=>{
    try{
        const host = "http://localhost:5000";
        const res = await fetch(`${host}/api/TravelDetails`, {
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

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
    },
    extraReducers:{
        [fetchStory.pending]: (state)=>{
            state.isLoading = true;
        },
        [fetchStory.fulfilled]: (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchStory.rejected]: (state)=>{
            state.isLoading = false;
            state.isError = true;
        },
    }
})

export default storySlice.reducer;