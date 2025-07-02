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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>{t('login.title')}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {t('login.username')} {/* Должно переводиться как "Ваш ник" */}
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {t('login.password')} {/* Должно переводиться как "Пароль" */}
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }} />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t('login.submit')}
            </button>
          </Form>
        )}
      </Formik>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        {t('login.noAccount')} <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>{t('login.signup')}</Link>
      </p>
    </div>
  );
}

export default LoginPage
