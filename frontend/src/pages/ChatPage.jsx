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
  const channels = useSelector((state) => state.channels.list)
  const activeChannelId = useSelector((state) => state.channels.activeChannelId)
  const userId = useSelector((state) => state.auth?.userId)
  const [messages, setMessages] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const messagesEndRef = useRef(null)

  const fetchChannels = async () => {
    try {
      const response = await api.get('/channels')
      // Здесь нужно добавить логику для обновления списка каналов в хранилище
    } catch (error) {
      console.error('Error fetching channels:', error)
    }
  }

  const fetchMessages = async (channelId) => {
    try {
      const response = await api.get(`/messages?channelId=${channelId}`)
      setMessages(response.data.filter(msg => msg.channelId === channelId))
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
    if (activeChannelId) {
      fetchMessages(activeChannelId)
    }
  }, [activeChannelId])

  const handleSendMessage = async (textOrEvent) => {
    const text = typeof textOrEvent === 'string' 
      ? textOrEvent 
      : textOrEvent.target.value;
    
    if (!text.trim() || !activeChannelId) return;
    
    try {
      const response = await api.post('/messages', {
        text: filterProfanity(text),
        channelId: activeChannelId,
        sender: userId,
      });
      setMessages(prev => [...prev, response.data]);
      
      if (typeof textOrEvent !== 'string') {
        textOrEvent.target.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert(t('chat.error'));
    }
  };

  const handleCreateChannel = async (name) => {
    try {
      const response = await api.post('/channels', {
        name: filterProfanity(name),
        creatorId: userId,
      })
      dispatch(addChannel(response.data))
      toast.success(t('notifications.channelCreated'))
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
      toast.success(t('notifications.channelRenamed'))
    } catch (error) {
      console.error('Error renaming channel:', error)
    }
  }

  const handleDeleteChannel = async (channelId) => {
    try {
      await api.delete(`/channels/${channelId}`)
      dispatch(deleteChannel(channelId))
      toast.success(t('notifications.channelDeleted'))
    } catch (error) {
      console.error('Error deleting channel:', error)
    }
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
        <NewChannelModal 
          onClose={() => setShowCreateModal(false)} 
          onCreate={handleCreateChannel}
        />
      )}

      <div style={{ marginBottom: '10px' }}>
        {channels.map((channel) => (
          <div key={channel.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <button
              style={{
                cursor: 'pointer',
                fontWeight: channel.id === activeChannelId ? 'bold' : 'normal',
                flexGrow: 1,
              }}
              onClick={() => handleChangeChannel(channel.id)}
            >
              {`# ${channel.name}`}
            </button>
            {channel.creatorId === userId && channel.creatorId !== null && (
              <ChannelMenu 
                channel={channel} 
                onRename={handleRenameChannel}
                onDelete={handleDeleteChannel}
              />
            )}
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
              handleSendMessage(e);
            }
          }}
          aria-label={t('chat.newMessage')}
          style={{ width: '100%', padding: '10px' }}
        />
        <button onClick={() => handleSendMessage(document.querySelector('input').value)} style={{ marginTop: '10px' }}>
          {t('chat.send')}
        </button>
      </div>
    </div>
  )
}

export default ChatPage
