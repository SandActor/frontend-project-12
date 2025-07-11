import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api/api'
import NewChannelModal from '../components/NewChannelModal'
import ChannelMenu from '../components/ChannelMenu'
import { setActiveChannel, addChannel, deleteChannel, renameChannel } from '../store/channelsSlice'
import { useTranslation } from 'react-i18next'
import { filterProfanity } from '../utils/profanityFilter'

const ChatPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const activeChannelId = useSelector((state) => state.channels.activeChannelId)
  const userName = localStorage.getItem('username')
  const userId = useSelector((state) => state.auth?.userId)
  const defaultChannels = useSelector((state) => state.channels.list)
  
  const [messages, setMessages] = useState([])
  const [channels, setChannels] = useState(defaultChannels)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const messagesEndRef = useRef(null)
  const [notification, setNotification] = useState('')

  const fetchChannels = async (id = null) => {
    try {
      const response = await api.get('/channels')
      setChannels(response.data)
      const channelIdToSet = id || response.data[0]?.id
      if (channelIdToSet) {
        dispatch(setActiveChannel(channelIdToSet))
        fetchMessages(channelIdToSet)
      }
    } catch (error) {
      console.error('Error fetching channels:', error)
    }
  }

  const fetchMessages = async (channelId) => {
    try {
      const response = await api.get(`/messages?channelId=${channelId}`)
      setMessages(response.data.filter((msg) => msg.channelId === channelId))
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleChangeChannel = (channelId) => {
    dispatch(setActiveChannel(channelId))
    setMessages([])
    fetchMessages(channelId)
  }

  useEffect(() => {
    fetchChannels()
  }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeChannelId) {
        fetchMessages(activeChannelId)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [activeChannelId])

  const handleSendMessage = async (textOrEvent) => {
    const text = typeof textOrEvent === 'string' ? textOrEvent : textOrEvent.target.value
    if (!text.trim() || !activeChannelId) return

    try {
      const response = await api.post('/messages', {
        text: filterProfanity(text),
        channelId: activeChannelId,
        sender: userName,
      })
      setMessages((prev) => [...prev, response.data])
      if (typeof textOrEvent !== 'string') {
        textOrEvent.target.value = ''
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert(t('chat.error'))
    }
  }

  const handleCreateChannel = async (name) => {
    try {
      const response = await api.post('/channels', {
        name: filterProfanity(name),
        creatorId: userId,
      })
      dispatch(addChannel(response.data))
      fetchChannels(response.data.id)
      setNotification(t('notifications.channelCreated'))
    } catch (error) {
      console.error('Error creating channel:', error)
    }
  }

  const handleRenameChannel = async (channelId, newName) => {
    try {
      const response = await api.patch(`/channels/${channelId}`, {
        name: filterProfanity(newName),
      })
      dispatch(renameChannel({ id: channelId, newName: response.data.name }))
      fetchChannels()
      setNotification(t('notifications.channelRenamed'))
    } catch (error) {
      console.error('Error renaming channel:', error)
    }
  }

  const handleDeleteChannel = async (channelId) => {
    try {
      await api.delete(`/channels/${channelId}`)
      dispatch(deleteChannel(channelId))
      fetchChannels()
      setNotification(t('notifications.channelDeleted'))
      if (activeChannelId === channelId && channels.length > 1) {
        const newChannel = channels.find((c) => c.id !== channelId)
        if (newChannel) handleChangeChannel(newChannel.id)
      }
    } catch (error) {
      console.error('Error deleting channel:', error)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-[80vh] border border-gray-300 p-4">
      <div className="flex justify-between mb-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowCreateModal(true)}
        >
          {t('channels.plus')}
        </button>
      </div>

      {showCreateModal && (
        <NewChannelModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateChannel} />
      )}

      {notification && (
        <div className="text-green-600 mb-2">{notification}</div>
      )}

      <div className="mb-4">
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center mb-2">
            <button
              className={`flex-1 text-left px-2 py-1 rounded ${channel.id === activeChannelId ? 'font-bold bg-gray-200' : ''}`}
              onClick={() => handleChangeChannel(channel.id)}
            >
              {`# ${channel.name}`}
            </button>
            {channel.removable && (
              <ChannelMenu
                channel={channel}
                channels={channels}
                onRename={handleRenameChannel}
                onDelete={handleDeleteChannel}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto border border-gray-300 p-2 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <b>{msg.sender || userName}:</b>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={t('chat.placeholder')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage(e)
          }}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => {
            const input = document.querySelector('input[type="text"]')
            handleSendMessage(input.value)
          }}
        >
          {t('chat.send')}
        </button>
      </div>
    </div>
  )
}

export default ChatPage
