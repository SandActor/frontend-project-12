import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../store/authSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

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
        .min(3, t('channels.nameMin'))
        .max(20, t('channels.nameMax'))
        .required(t('channels.nameRequired')),
      password: Yup.string()
        .min(6, t('channels.nameMin'))
        .required(t('channels.nameRequired')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('signup.passwordMismatch'))
        .required(t('channels.nameRequired')),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(registerUser(values));
        toast.success(t('notifications.loginSuccess'));
        navigate('/chat');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrors({ username: t('channels.nameExists') });
        } else {
          toast.error(t('notifications.loginFailed'));
        }
      }
    },
  })

  return (
    <div>
      <header>
        <Link to="/">{t('common.appName')}</Link>
      </header>
      <h2>{t('signup.title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">{t('signup.username')}</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          )}
        </div>
        <div>
          <label htmlFor="password">{t('signup.password')}</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit">{t('signup.register')}</button>
        <p>
          {t('signup.alreadyHave')} <Link to="/login">{t('signup.login')}</Link>
        </p>
      </form>
    </div>
  )
}

export default SignupPage
