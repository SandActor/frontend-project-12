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

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('home.welcome')}</h1>
      <p>{t('home.description')}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button
          style={{ marginRight: '10px' }}
          onClick={() => navigate('/login')}
        >
          {t('login.submit', 'Login')}
        </button>
        <button onClick={() => navigate('/signup')}>
          {t('signup.title', 'Register')}
        </button>
      </div>
    </div>
  )
}

export default HomePage