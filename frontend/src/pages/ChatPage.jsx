import { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import { useTranslation } from 'react-i18next'
import { filterProfanity } from '../utils/profanityFilter'

const socket = io('http://localhost:5001')

const ChatPage = () => {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [currentChannel, setCurrentChannel] = useState('general')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.emit('join channel', currentChannel);

    socket.on('channel history', (history) => {
      setMessages(history);
    });

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

    const filteredText = filterProfanity(input)
    socket.emit(
      'send message',
      { 
        text: filteredText, 
        channelId: currentChannel,
        sender: 'currentUser',
        id: Date.now()
      },
      (ack) => {
        if (ack.status === 'ok') {
          setInput('')
        } else {
          alert(t('chat.error'))
        }
      }
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const handleChangeChannel = (channelId) => {
    setCurrentChannel(channelId);
    setMessages([])
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', border: '1px solid #ccc', padding: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleChangeChannel('general')}>{`# ${t('chat.channels.general')}`}</button>
        <button onClick={() => handleChangeChannel('random')}>{`# ${t('chat.channels.random')}`}</button>
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
        placeholder={t('chat.placeholder')}
        style={{ padding: '10px', width: '100%' }}
        aria-label="Новое сообщение"
      />
      <button onClick={sendMessage} style={{ marginTop: '10px' }}>{t('chat.send')}</button>
    </div>
  )
}

export default ChatPage
