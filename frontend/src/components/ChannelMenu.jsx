import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChannel, renameChannel } from '../store/channelsSlice';
import RenameChannelModal from './RenameChannelModal';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ChannelMenu = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.list);
  const [isOpen, setIsOpen] = useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`${t('channelMenu.delete')} "# ${channel.name}"?`)) {
      dispatch(deleteChannel(channel.id));
      toast.success(t('notifications.channelDeleted'));
    }
  };

  const handleRename = (newName) => {
    dispatch(renameChannel({ id: channel.id, newName }));
    toast.success(t('notifications.channelRenamed'));
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>⚙️</button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: '#fff',
            border: '1px solid #ccc',
            padding: '4px',
            zIndex: 1000,
          }}
        >
          {!channel.isDefault && (
            <>
              <button onClick={handleDelete}>{t('channelMenu.delete')}</button>
              <button onClick={() => setRenameModalOpen(true)}>{t('channelMenu.rename')}</button>
            </>
          )}
        </div>
      )}
      {isRenameModalOpen && (
        <RenameChannelModal
          currentName={channel.name}
          onClose={() => setRenameModalOpen(false)}
          onRename={(newName) => {
            handleRename(newName);
            setRenameModalOpen(false);
          }}
          channels={channels}
        />
      )}
    </div>
  );
};

export default ChannelMenu;