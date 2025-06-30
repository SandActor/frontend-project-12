import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chatSlice'
import authReducer from './authSlice'
import channelsReducer from './channelsSlice'

const store = configureStore({
  reducer: {
    chat: chatReducer,
    channels: channelsReducer,
    auth: authReducer,
  },
})

export default store
