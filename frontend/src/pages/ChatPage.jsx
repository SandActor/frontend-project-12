import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.on('chat history', (history) => {
      setMessages(history)
    })

    socket.on('new message', (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off('chat history')
      socket.off('new message')
    }
  }, [])

  const sendMessage = () => {
    if (input.trim() === '') return

    socket.emit('send message', input, (ack) => {
      if (ack.status === 'ok') {
        setInput('')
      } else {
        alert('Ошибка отправки сообщения')
      }
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', border: '1px solid #ccc', padding: '10px' }}>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '5px' }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение"
        style={{ padding: '10px', width: '100%' }}
      />
      <button onClick={sendMessage} style={{ marginTop: '10px' }}>Отправить</button>
    </div>
  )
}

export default ChatPage
