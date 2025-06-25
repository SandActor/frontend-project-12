import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate]);

  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('home.welcome')}</h1>
      <p>{t('home.description')}</p>
    </div>
  )
}

export default HomePage
