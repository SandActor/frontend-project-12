import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authSlice'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link to="/" className="text-2xl font-semibold text-blue-600 no-underline">
        {t('common.appName')}
      </Link>
      {token && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          {t('header.logout')}
        </button>
      )}
    </header>
  )
}

export default Header
