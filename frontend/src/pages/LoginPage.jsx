import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const initialValues = {
    username: '',
    password: '',
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await login(values.username, values.password)
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      setError('Неверное имя пользователя или пароль')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Авторизация</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="username">Имя пользователя</label>
              <Field
                id="username"
                name="username"
                placeholder="Введите имя"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password">Пароль</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Введите пароль"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>
            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
