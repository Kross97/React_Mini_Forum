import React from 'react';
import uniqueId from 'lodash/uniqueId';
import {
  Formik,
  Field,
  ErrorMessage,
  Form,
} from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import add from '../Styles/FormAdd.css';
import * as actions from '../actions/actions';

const actionCreators = {
  addPost: actions.addPost,
};

export const FormAdd = (props) => {
  const { changeShowFormAdd } = props;
  const dispatch = useDispatch();
  const { addPost } = bindActionCreators(actionCreators, dispatch);

  const addNewPost = ({ thema, text, userName }) => {
    const date = new Date();
    const newPost = {
      id: Number(uniqueId()) + Date.parse(String(date)),
      thema,
      text,
      user: {
        id: Number(uniqueId()) + Date.parse(String(date)),
        name: userName,
      },
      comments: [],
    };

    addPost(newPost);
    changeShowFormAdd();
  };

  return (
    <>
      <div onClick={changeShowFormAdd} className={add.blockBack} aria-hidden />
      <Formik
        initialValues={{ thema: '', userName: '', text: '' }}
        validationSchema={yup.object({
          thema: yup.string().required('field thema required').max(27, 'thema limit symbol'),
          userName: yup.string().required('field userName required').max(27, 'userName limit symbol'),
          text: yup.string().required('field text required'),
        })}
        onSubmit={(values) => {
          addNewPost(values);
        }}
      >
        <Form className={add.form}>
          <Field type="text" name="thema" placeholder="введите тему" />
          <ErrorMessage name="thema" component="p" className={add.error} />
          <Field type="text" name="userName" placeholder="введите имя пользователя" />
          <ErrorMessage name="userName" component="p" className={add.error} />
          <Field as="textarea" name="text" placeholder="введите текст" />
          <ErrorMessage name="text" component="p" className={add.error} />
          <button type="reset">Сбросить</button>
          <button type="submit">Добавить</button>
        </Form>
      </Formik>
    </>
  );
};
