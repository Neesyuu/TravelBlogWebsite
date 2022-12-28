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

        if(!res.ok){
            throw Error('Error on server');
        }
        const jsonData = await res.json();
        return jsonData;
    }catch(err){
        console.log(err.message);
        return err;
    }
})

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        error: (state, action)=>{
            state.isError = action.payload
        },
    },
    extraReducers:{
        [fetchStory.pending]: (state)=>{
            state.isLoading = true;
        },
        [fetchStory.fulfilled]: (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchStory.rejected]: (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.data = action.payload;
        },
    }
})

export const { error } = storySlice.actions;
export default storySlice.reducer;