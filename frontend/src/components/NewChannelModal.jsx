import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { filterProfanity } from '../utils/profanityFilter';

const NewChannelModal = ({ onClose, onCreate }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.list);
  const userId = useSelector((state) => state.auth?.userId);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('channels.nameMin'))
      .max(20, t('channels.nameMax'))
      .notOneOf(channels.map(c => c.name), t('channels.nameExists'))
      .required(t('channels.nameRequired')),
  });

  return (
    <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 1000
      }}>
      <div style={{
        background: '#fff', padding: '20px', borderRadius: '8px', width: '300px'
      }}>
        <h3>{t('channels.createTitle')}</h3>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const filteredName = filterProfanity(values.name);
            onCreate(filteredName);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="name">{t('channels.nameLabel')}</label>
              <Field id="name" name="name" autoFocus />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" disabled={isSubmitting}>{t('channels.create')}</button>
                <button type="button" onClick={onClose}>{t('channels.cansel')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewChannelModal
