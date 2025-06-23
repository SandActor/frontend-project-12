import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchChatData = createAsyncThunk(
  'chat/fetchChatData',
  async (_, { getState }) => {
    const state = getState()
    const token = state.auth.token

    const response = await fetch('/api/chat', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch chat data')
    }
    const data = await response.json()
    return data
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.channels = action.payload.channels
        state.messages = action.payload.messages
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default chatSlice.reducer
