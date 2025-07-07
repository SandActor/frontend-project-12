import { Formik, Form, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

const DeleteChannelModal = ({ onClose, onDelete }) => {
  const { t } = useTranslation()
  
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
        <h3>{t('channels.deleteTitle')}</h3>
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            onDelete();
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ErrorMessage name="newName" component="div" style={{ color: 'red' }} />
              <div>{t('channels.confirmDelete')}</div>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-danger" type="submit" disabled={isSubmitting}>{t('channelMenu.delete')}</button>
                <button type="button" onClick={onClose}>{t('channels.cansel')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeleteChannelModal