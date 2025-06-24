import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../store/channelsSlice';

const NewChannelModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.list);
  const userId = useSelector((state) => state.auth?.userId); // если есть auth

  const validationSchema = Yup.object({
    name: Yup.string()
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
        <h3>Создать канал</h3>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(addChannel({ name: values.name, creatorId: userId }));
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="name">Название канала</label>
              <Field id="name" name="name" autoFocus />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" disabled={isSubmitting}>Создать</button>
                <button type="button" onClick={onClose}>Отмена</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewChannelModal;