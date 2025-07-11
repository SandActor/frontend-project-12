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
        if (registerUser.fulfilled.match(result)) {
          toast.success(t('notifications.registrationSuccess'))
          navigate('/chat')
        } else {
          setErrors({ username: 'Такой пользователь уже существует' })
        }
      } catch (error) {
        console.log(error)
        toast.error(t('notifications.registrationFailed'))
      }
    },
  })

  return (
    <div className="mx-auto my-12 p-6 max-w-md bg-gray-100 rounded shadow font-sans">
      <div className="text-center mb-4">
        <Link to="/" className="text-2xl font-semibold text-blue-600 no-underline">{t('common.appName')}</Link>
      </div>
      <h2 className="text-2xl mb-4 text-center">{t('signup.title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-semibold">{t('signup.username')}</label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.username}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">{t('signup.password')}</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 font-semibold">{t('signup.confirmPassword')}</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t('signup.register')}
        </button>
        <div className="mt-4 text-center text-sm">
          {t('signup.alreadyHave')}
          <Link to="/login" className="text-blue-600 hover:underline ml-2">{t('signup.login')}</Link>
        </div>
      </form>
    </div>
  )
}

export default SignupPage
