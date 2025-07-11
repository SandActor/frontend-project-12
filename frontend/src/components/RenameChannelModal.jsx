import { useTranslation } from 'react-i18next'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const RenameChannelModal = ({ currentName, onClose, onRename, channels }) => {
  const { t } = useTranslation()

  const validationSchema = Yup.object({
    newName: Yup.string()
      .min(3, t('channels.nameMin'))
      .max(20, t('channels.nameMax'))
      .notOneOf(channels.map((c) => c.name), t('channels.nameExists'))
      .required(t('channels.nameRequired')),
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-80">
        <h3 className="text-lg font-semibold mb-4">{t('channels.renameTitle')}</h3>
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
              <label htmlFor="newName" className="block mb-1 font-semibold">{t('channels.nameLabel')}</label>
              <Field
                id="newName"
                name="newName"
                autoFocus
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="newName" component="div" className="text-red-600 text-sm mt-1" />
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {t('channels.rename')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                >
                  {t('channels.cansel')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RenameChannelModal
