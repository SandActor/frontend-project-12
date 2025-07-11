import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      const timer = setTimeout(() => navigate('/login'), 300)
      return () => clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div className="max-w-md mx-auto p-8 font-sans bg-gray-100 rounded shadow text-center">
      <header>
        <Link to="/" className="text-2xl font-semibold text-blue-600 no-underline">{t('common.appName')}</Link>
      </header>
      <h1 className="text-3xl mb-4">{t('home.welcome')}</h1>
      <p className="mb-4 text-gray-700">{t('home.description')}</p>
      <div className="flex flex-wrap justify-center">
        <button
          className="px-4 py-2 m-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          onMouseOver={e => (e.currentTarget.className = 'px-4 py-2 m-2 text-white bg-blue-700 rounded transition')}
          onMouseOut={e => (e.currentTarget.className = 'px-4 py-2 m-2 text-white bg-blue-600 rounded transition')}
          onClick={() => navigate('/login')}
        >
          {t('login.submit')}
        </button>
        <button
          className="px-4 py-2 m-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          onMouseOver={e => (e.currentTarget.className = 'px-4 py-2 m-2 text-white bg-blue-700 rounded transition')}
          onMouseOut={e => (e.currentTarget.className = 'px-4 py-2 m-2 text-white bg-blue-600 rounded transition')}
          onClick={() => navigate('/signup')}
        >
          {t('signup.title')}
        </button>
      </div>
    </div>
  )
}

export default HomePage
