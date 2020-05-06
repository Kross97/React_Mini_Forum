import React from 'react';
import uniqueId from 'lodash/uniqueId';
import {
  Formik,
  Field,
  ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import add from '../Styles/FormAdd.css';
import * as actions from '../actions/actions';
import { Background, CustomForm } from '../UIComponents/UIFormAdd';
import { IFormAdd, IDataPost } from './Interfaces/IFormAdd';

const actionCreators = {
  addPost: actions.addPost,
};

export const FormAdd = (props: IFormAdd) => {
  const { changeShowFormAdd } = props;
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { addPost } = bindActionCreators(actionCreators, dispatch);

  const addNewPost = ({ thema, text, userName }: IDataPost) => {
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
      <Background onClick={changeShowFormAdd} aria-hidden />
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
        {({ handleSubmit, handleReset }) => (
          <CustomForm onReset={handleReset} onSubmit={handleSubmit}>
            <Field type="text" name="thema" placeholder={t('formAdd:titleThema')} />
            <ErrorMessage name="thema" component="p" className={add.error} />
            <Field type="text" name="userName" placeholder={t('formAdd:titleUser')} />
            <ErrorMessage name="userName" component="p" className={add.error} />
            <Field as="textarea" name="text" placeholder={t('formAdd:titleText')} />
            <ErrorMessage name="text" component="p" className={add.error} />
            <button type="reset">{t('formAdd:btnRest')}</button>
            <button type="submit">{t('formAdd:btnAdd')}</button>
          </CustomForm>
        )}
      </Formik>
    </>
  );
};
