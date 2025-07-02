import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      await axios.post('/api/v1/signup', userData)
    } catch (err) {
      if (err.response && err.response.status === 409) {
        return rejectWithValue('Username already exists')
      }
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    username: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.username = action.payload.username
    },
    logout: (state) => {
      state.token = null
      state.username = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        
      })
      .addCase(registerUser.rejected, (state, action) => {

      })
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer