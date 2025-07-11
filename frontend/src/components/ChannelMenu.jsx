import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RenameChannelModal from './RenameChannelModal'
import DeleteChannelModal from './DeleteChannelModal'

const ChannelMenu = ({ channel, onDelete, onRename, channels }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isRenameModalOpen, setRenameModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <div className="position-relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-link"
      >
        {t('channels.management')}
      </button>
      {isOpen && (
        <div
          className="dropdown-menu show"
        >
          {!channel.isDefault && (
            <>
              <button
                className="dropdown-item"
                onClick={() => setDeleteModalOpen(true)}
              >
                {t('channelMenu.delete')}
              </button>
              <button
                className="dropdown-item"
                onClick={() => setRenameModalOpen(true)}
              >
                {t('channelMenu.rename')}
              </button>
            </>
          )}
        </div>
      )}
      {isDeleteModalOpen && (
        <DeleteChannelModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => {
            onDelete(channel.id)
            setDeleteModalOpen(false)
          }}
        />
      )}
      {isRenameModalOpen && (
        <RenameChannelModal
          currentName={channel.name}
          onClose={() => setRenameModalOpen(false)}
          onRename={(newName) => {
            onRename(channel.id, newName)
            setRenameModalOpen(false)
          }}
          channels={channels}
        />
      )}
    </div>
  )
}

export default ChannelMenu
