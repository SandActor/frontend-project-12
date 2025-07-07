import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RenameChannelModal from './RenameChannelModal'

const ChannelMenu = ({ channel, onDelete, onRename, channels }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isRenameModalOpen, setRenameModalOpen] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`${t('channelMenu.delete')} "# ${channel.name}"?`)) {
      onDelete(channel.id)
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>{t('channels.management')}</button>
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
              <button className="btn-danger" onClick={handleDelete}>{t('channelMenu.delete')}</button>
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
            onRename(channel.id, newName);
            setRenameModalOpen(false);
          }}
          channels={channels}
        />
      )}
    </div>
  );
};

export default ChannelMenu