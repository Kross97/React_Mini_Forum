import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Formik,
  Field,
  Form,
} from 'formik';
import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId';
import coment from '../Styles/FormComent.css';
import * as actions from '../actions/actions';
import { allPosts } from '../reducers';

const actionCreators = {
  addNewComent: actions.addNewComent,
  updateOnePost: allPosts.actions.updateOnePost,
};

export const FormComent = (props) => {
  const { showFormComent, postId, comments } = props;

  const dispatch = useDispatch();
  const { addNewComent, updateOnePost } = bindActionCreators(actionCreators, dispatch);

  const addComent = ({ userName, textComent }) => {
    const date = new Date();
    const newComment = {
      id: Number(uniqueId()) + Date.parse(String(date)),
      text: textComent,
      user: {
        id: Number(uniqueId()) + Date.parse(String(date)),
        name: userName,
      },
    };
    addNewComent(postId, newComment);
    updateOnePost({ id: postId, changes: { comments: [newComment.id, ...comments] } });
    showFormComent();
  };

  return (
    <Formik
      initialValues={{ userName: '', textComent: '' }}
      validationSchema={yup.object({
        userName: yup.string().required('Не все поля формы заполнены!').max(27, 'Логин слишком длинный'),
        textComent: yup.string().required('Не все поля формы заполнены!'),
      })}
      onSubmit={(values) => {
        addComent(values);
      }}
    >
      {({ errors }) => (
        <Form className={coment.form}>
          <Field type="text" name="userName" placeholder="Введите имя пользователя" />
          <Field as="textarea" type="text" name="textComent" placeholder="Введите комментарий" />
          {(errors.userName || errors.textComent) && <p style={{ color: 'red', 'font-size': '14px' }}>{errors.userName || errors.textComent}</p>}
          <button type="submit">Добавить</button>
        </Form>
      )}
    </Formik>
  );
};
