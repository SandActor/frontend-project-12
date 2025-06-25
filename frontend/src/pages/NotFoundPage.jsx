import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('notfound.title')}</h1>
      <p>{t('notfound.message')}</p>
    </div>
  )
}

export default NotFoundPage
