import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RenameChannelModal = ({ currentName, onClose, onRename, channels }) => {
  const { t } = useTranslation()
  const validationSchema = Yup.object({
    newName: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .notOneOf(channels.map(c => c.name), 'Имя уже занято')
      .required('Обязательное поле'),
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          width: '300px',
        }}
      >
        <h3>{t('channels.renameTitle')}</h3>
        <Formik
          initialValues={{ newName: currentName }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onRename(values.newName);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="newName">{t('channels.newName')}</label>
              <Field id="newName" name="newName" autoFocus />
              <ErrorMessage name="newName" component="div" style={{ color: 'red' }} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" disabled={isSubmitting}>{t('channels.rename')}</button>
                <button type="button" onClick={onClose}>{t('channels.cansel')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RenameChannelModal;