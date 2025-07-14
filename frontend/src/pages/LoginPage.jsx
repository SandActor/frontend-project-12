import { login } from '../api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const initialValues = { username: '', password: '' }

  const handleSubmit = async (values) => {
    try {
      const data = await login(values.username, values.password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      toast.success(t('notifications.loginSuccess'))
      navigate('/chat')
    }
    catch (err) {
      console.error(err)
      setError(t('notifications.loginFailed'))
    }
  }

  const validationSchema = Yup.object({
    username: Yup.string().required(t('login.error')),
    password: Yup.string().required(t('login.error')),
  })

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm w-100">
        <header className="text-center mb-3">
          <Link to="/" className="h2 text-primary text-decoration-none">{t('common.appName')}</Link>
        </header>
        <h2 className="text-center mb-4">{t('login.title')}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  {t('login.username')}
                </label>
                <Field
                  id="username"
                  name="username"
                  className="form-control"
                />
                <ErrorMessage name="username" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  {t('login.password')}
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              {error && (
                <div className="text-danger mb-2 text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-100 btn btn-primary"
              >
                {t('login.submit')}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-3 text-center small">
          {t('login.noAccount')}
          {' '}
          <Link to="/signup" className="text-primary text-decoration-underline">
            {t('login.signup')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
