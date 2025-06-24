import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [currentChannel, setCurrentChannel] = useState('general')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.emit('join channel', currentChannel)

    socket.on('channel history', (history) => {
      setMessages(history)
    })

    socket.on('new message', (message) => {
      if (message.channelId === currentChannel) {
        setMessages((prev) => [...prev, message])
      }
    })

    return () => {
      socket.off('channel history')
      socket.off('new message')
    }
  }, [currentChannel])

  const sendMessage = () => {
    if (input.trim() === '') return

    socket.emit('send message', { text: input, channelId: currentChannel }, (ack) => {
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

  const handleChangeChannel = (channelId) => {
    setCurrentChannel(channelId)
    setMessages([])
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', border: '1px solid #ccc', padding: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleChangeChannel('general')}># general</button>
        <button onClick={() => handleChangeChannel('random')}># random</button>
      </div>
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