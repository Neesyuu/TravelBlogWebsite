import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import storyReducer from './slices/storySlice'
import perStoryReducer from './slices/perStorySlice';
import commentReducer from './slices/commentSlice';
import alertReducer from './slices/alertSlice';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    alertMessage: alertReducer,
    story: storyReducer,
    perStory: perStoryReducer,
    comment: commentReducer,
  },
})