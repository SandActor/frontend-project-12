import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <Link to="/">Hexlet Chat</Link>
      {token && (
        <button onClick={handleLogout}>Выйти</button>
      )}
    </header>
  )
}

export default Header
