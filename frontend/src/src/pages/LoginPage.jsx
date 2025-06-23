import React from 'react'
import { Formik, Form, Field } from 'formik'

function LoginPage() {
  const initialValues = {
    username: '',
    password: '',
  }

  const handleSubmit = (values) => {
    alert(`Submitted: ${JSON.stringify(values)}`);
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Авторизация</h2>
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
