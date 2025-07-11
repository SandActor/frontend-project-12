import { login } from '../api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const styles = {
  container: 'max-w-md mx-auto p-6 bg-gray-100 rounded shadow',
  header: '',
  appNameLink: 'text-2xl font-semibold text-blue-600 no-underline',
  formGroup: 'mb-4',
  label: 'block mb-1 font-semibold',
  input: 'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400',
  errorText: 'text-red-600 text-sm mt-1',
  submitButton: 'w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition',
  footerText: 'mt-4 text-center text-sm',
  link: 'text-blue-600 hover:underline',
}

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
      console.log(err)
      setError(t('notifications.loginFailed'))
    }
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('login.error')),
    password: Yup.string()
      .required(t('login.error')),
  })

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.appNameLink}>{t('common.appName')}</Link>
      </header>
      <h2 className="text-xl mb-4 text-center">{t('login.title')}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>{t('login.username')}</label>
              <Field
                id="username"
                name="username"
                className={styles.input}
              />
              <ErrorMessage name="username" component="div" className={styles.errorText} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>{t('login.password')}</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={styles.input}
              />
              <ErrorMessage name="password" component="div" className={styles.errorText} />
            </div>
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {t('login.submit')}
            </button>
          </Form>
        )}
      </Formik>
      <p className={styles.footerText}>
        {t('login.noAccount')}
        <Link to="/signup" className={styles.link}>{t('login.signup')}</Link>
      </p>
    </div>
  )
}

export default LoginPage
