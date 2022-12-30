import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  type: '',
};

export const alertSlice = createSlice({
  name: "alertMessage",
  initialState,
  reducers: {    
    placeMessage: (state, action) => {
      state.message = action.payload;
    },
    placeMessageType: (state, action) => {
        state.type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { placeMessage, placeMessageType } = alertSlice.actions;

export default alertSlice.reducer;