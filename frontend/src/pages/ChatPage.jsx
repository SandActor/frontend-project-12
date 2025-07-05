import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import NewChannelModal from '../components/NewChannelModal'
import ChannelMenu from '../components/ChannelMenu'
import { setActiveChannel } from '../store/channelsSlice'
import { useTranslation } from 'react-i18next'

const socket = io('http://localhost:5001/api/v1/channels')

const ChatPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels.list)
  const activeChannelId = useSelector((state) => state.channels.activeChannelId)
  const userId = useSelector((state) => state.auth?.userId)
  const [messages, setMessages] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const messagesEndRef = useRef(null)

  const handleChangeChannel = (channelId) => {
    dispatch(setActiveChannel(channelId))
    setMessages([])
    socket.emit('join channel', channelId)
  }

  useEffect(() => {
    if (activeChannelId) {
      socket.emit('join channel', activeChannelId)
      socket.on('channel history', (history) => {
        setMessages(history)
      })
      socket.on('new message', (message) => {
        if (message.channelId === activeChannelId) {
          setMessages((prev) => [...prev, message])
        }
      })
    }
    return () => {
      socket.off('channel history')
      socket.off('new message')
    }
  }, [activeChannelId])

  const handleSendMessage = (text) => {
    if (!text.trim() || !activeChannelId) return
    socket.emit(
      'send message',
      {
        text: filterProfanity(text),
        channelId: activeChannelId,
        sender: userId,
        id: Date.now(),
      },
      (ack) => {
        if (ack.status !== 'ok') alert(t('chat.error'))
      }
    )
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', border: '1px solid #ccc', padding: '10px' }}>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setShowCreateModal(true)}>{t('channels.createTitle')}</button>
      </div>

      {showCreateModal && (
        <NewChannelModal onClose={() => setShowCreateModal(false)} />
      )}

      <div style={{ marginBottom: '10px' }}>
        {channels.map((channel) => (
          <div key={channel.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <span
              style={{
                cursor: 'pointer',
                fontWeight: channel.id === activeChannelId ? 'bold' : 'normal',
                flexGrow: 1,
              }}
              onClick={() => handleChangeChannel(channel.id)}
            >
              {`# ${channel.name}`}
            </span>
            {channel.creatorId === userId && channel.creatorId !== null && <ChannelMenu channel={channel} />}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder={t('chat.placeholder')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.target.value)
              e.target.value = ''
            }
          }}
          style={{ width: '100%', padding: '10px' }}
        />
        <button onClick={handleSendMessage} style={{ marginTop: '10px' }}>{t('chat.send')}</button>
      </div>
    </div>
  )
}

export default ChatPage


