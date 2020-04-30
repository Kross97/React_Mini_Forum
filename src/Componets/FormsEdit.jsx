import React, { useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  Formik,
  Field,
  Form,
} from 'formik';
import * as yup from 'yup';
import { bindActionCreators } from 'redux';
import edit from '../Styles/FormEdit.css';
import editDark from '../Styles/FormEditDark.css';
import editLight from '../Styles/FormEditLight.css';
import { ThemaApp } from './Application';
import { allPosts, allUsers, allComments } from '../reducers';

const actionCreators = {
  updateOnePost: allPosts.actions.updateOnePost,
  updateOneUser: allUsers.actions.updateOneUser,
  updateOneComment: allComments.actions.updateOneComment,
};

export const FormsEdit = () => {
  const dispatch = useDispatch();
  const {
    updateOnePost,
    updateOneUser,
    updateOneComment,
  } = bindActionCreators(actionCreators, dispatch);

  const themaApp = useContext(ThemaApp);
  const postId = useSelector((state) => state.allPosts.currentPost);
  const { currentPost, currentUser } = useSelector((state) => (
    postId !== 0 ? {
      currentPost: state.allPosts.entities[postId],
      currentUser: state.allUsers.entities[state.allPosts.entities[postId].user],
    } : { currentPost: undefined, currentUser: undefined }), shallowEqual);

  const commentId = useSelector((state) => state.allComments.currentComment);
  const { currentComment, currentUserComment } = useSelector((state) => (
    commentId !== 0 ? {
      currentComment: state.allComments.entities[commentId],
      currentUserComment: state.allUsers.entities[state.allComments.entities[commentId].user],
    } : { currentComment: undefined, currentUserComment: undefined }), shallowEqual);

  const changePost = ({ thema, text, userName }) => {
    updateOnePost({ id: currentPost.id, changes: { thema, text } });
    updateOneUser({ id: currentUser.id, changes: { name: userName } });
  };

  const changeComment = ({ textComment, userNameComment }) => {
    updateOneComment({ id: currentComment.id, changes: { text: textComment } });
    updateOneUser({ id: currentUserComment.id, changes: { name: userNameComment } });
  };

  const editStyle = themaApp === 'dark' ? editDark : editLight;
  return (
    <div className={`${edit.container} ${editStyle.container}`}>
      <Formik
        key={postId}
        initialValues={currentPost && postId !== 0
          ? { userName: currentUser.name, thema: currentPost.thema, text: currentPost.text }
          : { userName: '', thema: '', text: '' }}
        validationSchema={yup.object({
          userName: yup.string().required('Имя должно быть заполненно').max(27, 'слишком длинный логин'),
          thema: yup.string().required('Тема должна быть заполненна').max(27, 'слишком длинное название'),
          text: yup.string().required('Не введен текст'),
        })}
        onSubmit={(values) => {
          changePost(values);
        }}
      >
        {({ errors }) => (
          <Form className={`${edit.form} ${editStyle.form}`}>
            <p>Форма для поста</p>
            <Field type="text" name="userName" />
            <Field type="text" name="thema" />
            <Field as="textarea" type="text" name="text" />
            {(errors.userName || errors.thema || errors.text)
              && <span>{errors.userName || errors.thema || errors.text}</span>}
            <button type="submit">Изменить</button>
          </Form>
        )}
      </Formik>
      <Formik
        key={`${commentId}comm`}
        initialValues={currentComment && commentId !== 0
          ? { userNameComment: currentUserComment.name, textComment: currentComment.text }
          : { userNameComment: '', textComment: '' }}
        validationSchema={yup.object({
          userNameComment: yup.string().required('Не заполнено имя!').max(27, 'Слишком длинный логин!'),
          textComment: yup.string().required('Не введен текст!'),
        })}
        onSubmit={(values) => {
          changeComment(values);
        }}
      >
        {({ errors }) => (
          <Form className={`${edit.form} ${editStyle.form}`}>
            <p>Форма для комментария</p>
            <Field type="text" name="userNameComment" />
            <Field as="textarea" type="text" name="textComment" />
            {(errors.userNameComment || errors.textComment)
            && <span>{errors.userNameComment || errors.textComment}</span>}
            <button type="submit">Изменить</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
