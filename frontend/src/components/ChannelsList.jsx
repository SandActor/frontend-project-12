import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../store/channelsSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ChannelsList = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.list);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const dispatch = useDispatch();

  const handleChangeChannel = (id) => {
    dispatch(setActiveChannel(id));
    toast.success(t('notifications.channelSwitched'));
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {channels.map((channel) => (
        <li key={channel.id} style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                cursor: 'pointer',
                fontWeight: channel.id === activeChannelId ? 'bold' : 'normal',
              }}
              onClick={() => handleChangeChannel(channel.id)}
            >
              {`# ${channel.name}`}
            </span>
            <ChannelMenu channel={channel} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;