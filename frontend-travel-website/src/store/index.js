import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import storyReducer from './slices/storySlice'
import perStoryReducer from './slices/perStorySlice'

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    story: storyReducer,
    perStory: perStoryReducer,
  },
})