import React from 'react'
import { useSelector } from 'react-redux'

const Messages = () => {
  const messages = useSelector((state) => state.chat.messages)
  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {messages.map((msg) => (
        <div key={msg.id}>
          <b>{msg.sender}:</b> {msg.text}
        </div>
      ))}
    </div>
  )
}

export default Messages
