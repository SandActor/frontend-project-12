import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteChannel, renameChannel } from '../store/channelsSlice';
import RenameChannelModal from './RenameChannelModal';

const ChannelMenu = ({ channel }) => {
  const dispatch = useDispatch();
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
              <button onClick={handleDelete}>Удалить</button>
              <button onClick={() => setRenameModalOpen(true)}>Переименовать</button>
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