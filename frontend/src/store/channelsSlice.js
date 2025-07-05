import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [
    { id: 'general', name: 'general', creatorId: null, isDefault: true },
    { id: 'random', name: 'random', creatorId: null, isDefault: false },
  ],
  activeChannelId: 'general',
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel(state, action) {
      state.activeChannelId = action.payload
    },
    addChannel(state, action) {
      const { name, creatorId } = action.payload;
      const id = name.toLowerCase().replace(/\s+/g, '-')
      state.list.push({ id, name, creatorId, isDefault: false })
      state.activeChannelId = id;
    },
    deleteChannel(state, action) {
      const id = action.payload
      const index = state.list.findIndex(c => c.id === id && !c.isDefault)
      if (index !== -1) {
        state.list.splice(index, 1)
        if (state.activeChannelId === id) {
          state.activeChannelId = 'general'
        }
      }
    },
    renameChannel(state, action) {
      const { id, newName } = action.payload
      if (!state.list.some(c => c.name === newName)) {
        const channel = state.list.find(c => c.id === id)
        if (channel) {
          channel.name = newName
        }
      }
    },
  },
})

export const {
  setActiveChannel,
  addChannel,
  deleteChannel,
  renameChannel,
} = channelsSlice.actions

export default channelsSlice.reducer
