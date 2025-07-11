import { useTranslation } from 'react-i18next'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const RenameChannelModal = ({ currentName, onClose, onRename, channels }) => {
  const { t } = useTranslation()
  const validationSchema = Yup.object({
    newName: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .notOneOf(channels.map(c => c.name), 'Имя уже занято')
      .required('Обязательное поле'),
  })

  return (
    <div
      className="fixed-top d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
      }}
    >
      <div className="bg-white p-4 rounded">
        <h3>{t('channels.renameTitle')}</h3>
        <Formik
          initialValues={{ newName: currentName }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onRename(values.newName)
            setSubmitting(false)
            onClose()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="newName" className="form-label">{t('channels.nameLabel')}</label>
              <Field
                id="newName"
                name="newName"
                autoFocus
                className="form-control"
              />
              <ErrorMessage name="newName" component="div" className="text-danger" />
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>{t('channels.rename')}</button>
                <button className="btn btn-secondary" type="button" onClick={onClose}>{t('channels.cansel')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RenameChannelModal