import { Formik, Form, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

const DeleteChannelModal = ({ onClose, onDelete }) => {
  const { t } = useTranslation()

  return (
    <div
      className="fixed-top d-flex justify-content-center align-items-center"
    >
      <div className="bg-white p-4 rounded">
        <h3>{t('channels.deleteTitle')}</h3>
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            onDelete()
            setSubmitting(false)
            onClose()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ErrorMessage name="newName" component="div" className="text-danger" />
              <div>{t('channels.confirmDelete')}</div>
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-danger" type="submit" disabled={isSubmitting}>{t('channelMenu.delete')}</button>
                <button className="btn btn-secondary" type="button" onClick={onClose}>{t('channels.cansel')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default DeleteChannelModal
