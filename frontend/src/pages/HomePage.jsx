import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
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
      <h1>Добро пожаловать в чат</h1>
      <p>Здесь будет отображаться чат после авторизации.</p>
    </div>
  )
}

export default HomePage
