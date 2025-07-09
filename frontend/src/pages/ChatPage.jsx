import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import NewChannelModal from '../components/NewChannelModal';
import ChannelMenu from '../components/ChannelMenu';
import { setActiveChannel, addChannel, deleteChannel, renameChannel } from '../store/channelsSlice';
import { useTranslation } from 'react-i18next';
import { filterProfanity } from '../utils/profanityFilter';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const userId = useSelector((state) => state.auth?.userId);
  const userName = localStorage.getItem('username');
  const [messages, setMessages] = useState([]);
  const defaultChanels = useSelector((state) => state.channels.list);
  const [channels, setChannels] = useState(defaultChanels);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const messagesEndRef = useRef(null);
  const [notification, setNotification] = useState('');

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#343a40',
      color: 'white',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #dee2e6'
    },
    channelList: {
      flex: 1,
      overflowY: 'auto',
      marginBottom: '15px'
    },
    channelItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '4px',
      marginBottom: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#495057'
      }
    },
    activeChannel: {
      backgroundColor: '#495057',
      fontWeight: 'bold'
    },
    channelName: {
      flex: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    addButton: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '15px',
      '&:hover': {
        backgroundColor: '#218838'
      }
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    message: {
      marginBottom: '15px',
      paddingBottom: '15px',
      borderBottom: '1px solid #eee',
      '&:last-child': {
        borderBottom: 'none',
        marginBottom: 0
      }
    },
    messageSender: {
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: '5px'
    },
    messageText: {
      margin: 0,
      color: '#333'
    },
    inputContainer: {
      display: 'flex',
      gap: '10px'
    },
    messageInput: {
      flex: 1,
      padding: '12px 15px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '16px',
      '&:focus': {
        outline: 'none',
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
      }
    },
    sendButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '0 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#0069d9'
      }
    },
    notification: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px',
      textAlign: 'center'
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await api.get('/channels');
      setChannels(response.data);
      if (response.data.length > 0 && !activeChannelId) {
        dispatch(setActiveChannel(response.data[0].id));
        fetchMessages(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchMessages = async (channelId) => {
    try {
      const response = await api.get(`/messages?channelId=${channelId}`);
      setMessages(response.data.filter(msg => msg.channelId === channelId));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleChangeChannel = (channelId) => {
    dispatch(setActiveChannel(channelId));
    setMessages([]);
    fetchMessages(channelId);
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (activeChannelId) {
      fetchMessages(activeChannelId);
    }
  }, [activeChannelId]);

  const handleSendMessage = async (textOrEvent) => {
    const text = typeof textOrEvent === 'string' 
      ? textOrEvent 
      : textOrEvent.target.value;
    
    if (!text.trim() || !activeChannelId) return;
    
    try {
      const response = await api.post('/messages', {
        text: filterProfanity(text),
        channelId: activeChannelId,
        sender: userName,
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
      });
      dispatch(addChannel(response.data));
      fetchChannels();
      setNotification(t('notifications.channelCreated'));
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const handleRenameChannel = async (channelId, newName) => {
    try {
      const response = await api.patch(`/channels/${channelId}`, {
        name: filterProfanity(newName),
      });
      dispatch(renameChannel({ id: channelId, newName: response.data.name }));
      fetchChannels();
      setNotification(t('notifications.channelRenamed'));
    } catch (error) {
      console.error('Error renaming channel:', error);
    }
  };

  const handleDeleteChannel = async (channelId) => {
    try {
      await api.delete(`/channels/${channelId}`);
      dispatch(deleteChannel(channelId));
      fetchChannels();
      setNotification(t('notifications.channelDeleted'));
      if (activeChannelId === channelId && channels.length > 2) {
        const newActiveChannel = channels.find(c => c.id !== channelId);
        if (newActiveChannel) {
          handleChangeChannel(newActiveChannel.id)
        }
      }
    } catch (error) {
      console.error('Error deleting channel:', error)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <button 
          style={styles.addButton}
          onClick={() => setShowCreateModal(true)}
        >
          {t('channels.plus')}
        </button>
        
        <div style={styles.channelList}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              style={{
                ...styles.channelItem,
                ...(channel.id === activeChannelId ? styles.activeChannel : {})
              }}
              onClick={() => handleChangeChannel(channel.id)}
            >
              <span style={styles.channelName}># {channel.name}</span>
              {channel.removable === true && (
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
      </div>

      <div style={styles.mainContent}>
        {showCreateModal && (
          <NewChannelModal 
            onClose={() => setShowCreateModal(false)} 
            onCreate={handleCreateChannel}
          />
        )}
        
        {notification && (
          <div style={styles.notification}>
            {notification}
          </div>
        )}

        <div style={styles.messagesContainer}>
          {messages.map((msg) => (
            <div key={msg.id} style={styles.message}>
              <div style={styles.messageSender}>{msg.sender || userName}:</div>
              <p style={styles.messageText}>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder={t('chat.placeholder')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(e);
              }
            }}
            aria-label={t('chat.newMessage')}
            style={styles.messageInput}
          />
          <button 
            onClick={() => handleSendMessage(document.querySelector('input').value)} 
            style={styles.sendButton}
          >
            {t('chat.send')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
