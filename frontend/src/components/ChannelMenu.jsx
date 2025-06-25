import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteChannel, renameChannel } from '../store/channelsSlice'
import RenameChannelModal from './RenameChannelModal'
import { useTranslation } from 'react-i18next'

const ChannelMenu = ({ channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Удалить канал "# ${channel.name}"?`)) {
      dispatch(deleteChannel(channel.id));
    }
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
          onRename={(newName) => dispatch(renameChannel({ id: channel.id, newName }))}
          channels={useSelector(state => state.channels.list)}
        />
      )}
    </div>
  );
};

export default ChannelMenu;