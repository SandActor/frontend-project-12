import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
  },
  appNameLink: {
    fontSize: '24px',
    textDecoration: 'none',
    color: '#007bff',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  description: {
    marginBottom: '20px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}

function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    const timer = setTimeout(() => navigate('/login'), 1000);
    return () => clearTimeout(timer);
  }
}, [navigate]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link to="/" style={styles.appNameLink}>{t('common.appName')}</Link>
      </header>
      <div>
        <h1 style={styles.title}>{t('home.welcome')}</h1>
        <p style={styles.description}>{t('home.description')}</p>
        <div style={styles.buttonsContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate('/login')}
          >
            {t('login.submit')}
          </button>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate('/signup')}
          >
            {t('signup.title')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
