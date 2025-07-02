import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../store/authSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  appNameLink: {
    fontSize: '24px',
    textDecoration: 'none',
    color: '#007bff',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  footerText: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
}

const SignupPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('signup.nameMin'))
        .max(20, t('signup.nameMax'))
        .required(t('signup.nameRequired')),
      password: Yup.string()
        .min(6, t('signup.passwordMin'))
        .required(t('signup.nameRequired')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('signup.passwordMismatch'))
        .required(t('signup.nameRequired')),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        const result = await dispatch(registerUser(values))
        if (result) {
          toast.success(t('notifications.registrationSuccess'))
          navigate('/')
        }
      } catch (error) {
        toast.error(t('signup.duplicateError'))
      }
    },
  })

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={styles.appNameLink}>{t('common.appName')}</Link>
      </div>
      <h2 style={styles.title}>{t('signup.title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>{t('signup.username')}</label>
          <input
            id="username"
            name="username"
            type="text"
            style={styles.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div style={styles.errorText}>{formik.errors.username}</div>
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>{t('signup.password')}</label>
          <input
            id="password"
            name="password"
            type="password"
            style={styles.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={styles.errorText}>{formik.errors.password}</div>
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>{t('signup.confirmPassword')}</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            style={styles.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={styles.errorText}>{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button
          type="submit"
          style={styles.submitButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor)}
        >
          {t('signup.register')}
        </button>
        <div style={styles.footerText}>
          {t('signup.alreadyHave')} <Link to="/login" style={styles.link}>{t('signup.login')}</Link>
        </div>
      </form>
    </div>
  )
}

export default SignupPage
