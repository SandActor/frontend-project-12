import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chatSlice'
import authReducer from './authSlice'
import channelsReducer from './channelsSlice'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    channels: channelsReducer,
    auth: authReducer,
  },
})
