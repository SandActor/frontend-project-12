import { login } from '../api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues = { username: '', password: '' };

  const handleSubmit = async (values) => {
    try {
      const data = await login(values.username, values.password);
      localStorage.setItem('token', data.token);
      toast.success(t('notifications.loginSuccess'));
      navigate('/');
    } catch (err) {
      toast.error(t('errors.loginFailed'));
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('login.error')),
    password: Yup.string()
      .required(t('login.error'))
  });

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>{t('login.title')}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">{t('login.username')}</label>
              <Field
                type="text"
                name="username"
                id="username"
                className="form-control"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('login.password')}</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {t('login.submit')}
            </button>
          </Form>
        )}
      </Formik>

      <p style={{ marginTop: '15px' }}>
        {t('login.noAccount')} <Link to="/signup">{t('login.signup')}</Link>
      </p>
    </div>
  );
}

export default LoginPage
