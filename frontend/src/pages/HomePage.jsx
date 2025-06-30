import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()


  return (
    <div>
      <header>
        <Link to="/">{t('common.appName')}</Link>
      </header>
      <div style={{ padding: '20px' }}>
        <h1>{t('home.welcome')}</h1>
        <p>{t('home.description')}</p>
        
        <div style={{ marginTop: '20px' }}>
          <button
            style={{ marginRight: '10px' }}
            onClick={() => navigate('/login')}
          >
            {t('login.submit')}
          </button>
          <button onClick={() => navigate('/signup')}>
            {t('signup.title')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
