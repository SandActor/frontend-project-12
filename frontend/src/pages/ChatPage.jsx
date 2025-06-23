import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchChatData } from '../store/chatSlice'

const ChatPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChatData())
  }, [dispatch])

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <ChannelsList />
      </div>
      <div style={{ width: '70%', padding: '10px' }}>
        <Messages />
        <MessageForm />
      </div>
    </div>
  )
}

export default ChatPage
