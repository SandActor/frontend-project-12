import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <Link to="/">{t('common.appName')}</Link>
      {token && (
        <button onClick={handleLogout}>{t('header.logout')}</button>
      )}
    </header>
  )
}

export default Header
