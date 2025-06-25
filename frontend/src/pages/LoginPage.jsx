import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues = { username: '', password: '' };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await login(values.username, values.password);
      localStorage.setItem('token', data.token);
      toast.success(t('notifications.loginSuccess'));
      navigate('/');
    } catch (err) {
      toast.error(t('errors.loginFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>{t('login.title')}</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            {/* поля */}
            <button type="submit">{t('login.submit')}</button>
            {/* ссылка */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage
