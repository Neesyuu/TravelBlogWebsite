import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: '000',
  userName: '',
  jwt: '',
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {    
    placeUserID: (state, action) => {
      state.userID = action.payload;
    },
    placeUserName: (state, action) => {
        state.userName = action.payload;
    },
    placeUserJWT: (state, action) => {
        state.jwt = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { placeUserID, placeUserName, placeUserJWT } = authSlice.actions;

export default authSlice.reducer;
