import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  Formik,
  Field,
} from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { allPosts, allComments } from '../reducers';
import { ContainerForms, CustomForm } from '../UIComponents/UIFormEdit';
import { IAppState } from '../IApplication';
import { IDataPost, IDataComment } from './Interfaces/IFromEdit';
import * as actions from '../actions/actions';

const actionCreators = {
  patchDataPost: actions.patchDataPost,
  patchDataComment: actions.patchDataComment,
  setCurrentPost: allPosts.actions.setCurrentPost,
  setCurrentComment: allComments.actions.setCurrentComment,
};

export const FormsEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    patchDataPost,
    patchDataComment,
    setCurrentPost,
    setCurrentComment,
  } = bindActionCreators(actionCreators, dispatch);

  const postId = useSelector((state: IAppState) => state.allPosts.currentPost);
  const { currentPost, currentUser } = useSelector((state: IAppState) => {
    const userId = state?.allPosts?.entities?.[postId]?.user;
    const result = postId !== 0 ? {
      currentPost: state.allPosts.entities[postId],
      currentUser: state.allUsers.entities[userId as number],
    } : { currentPost: undefined, currentUser: undefined };
    return result;
  }, shallowEqual);

  const commentId = useSelector((state: IAppState) => state.allComments.currentComment);
  const { currentComment, currentUserComment } = useSelector((state: IAppState) => {
    const userId = state?.allComments?.entities?.[commentId]?.user;
    const result = commentId !== 0 ? {
      currentComment: state.allComments.entities[commentId],
      currentUserComment: state.allUsers.entities[userId as number],
    } : { currentComment: undefined, currentUserComment: undefined };
    return result;
  }, shallowEqual);

  const changePost = ({ thema, text, userName }: IDataPost) => {
    if (currentPost && currentUser) {
      patchDataPost({
        id: currentPost.id,
        idUser: currentUser.id,
        postPatch: {
          thema,
          text,
          user: { name: userName },
        },
      });
    }
    setCurrentPost({ id: 0 });
  };

  const changeComment = ({ textComment, userNameComment }: IDataComment) => {
    if (currentUserComment && currentComment) {
      patchDataComment({
        id: currentComment.id,
        idUser: currentUserComment.id,
        commentPatch: {
          text: textComment,
          user: { name: userNameComment },
        },
      });
    }
    setCurrentComment({ id: 0 });
  };

  return (
    <ContainerForms>
      <Formik
        key={postId}
        initialValues={currentPost && currentUser && postId !== 0
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
        {({ errors, handleSubmit }) => (
          <CustomForm onSubmit={handleSubmit}>
            <p>{t('formEdit.titlePost')}</p>
            <Field type="text" name="userName" />
            <Field type="text" name="thema" />
            <Field as="textarea" type="text" name="text" />
            {(errors.userName || errors.thema || errors.text)
              && <span>{errors.userName || errors.thema || errors.text}</span>}
            <button type="submit">{t('formEdit.button')}</button>
          </CustomForm>
        )}
      </Formik>
      <Formik
        key={`${commentId}comm`}
        initialValues={currentComment && currentUserComment && commentId !== 0
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
        {({ errors, handleSubmit }) => (
          <CustomForm onSubmit={handleSubmit}>
            <p>{t('formEdit.titleComment')}</p>
            <Field type="text" name="userNameComment" />
            <Field as="textarea" type="text" name="textComment" />
            {(errors.userNameComment || errors.textComment)
            && <span>{errors.userNameComment || errors.textComment}</span>}
            <button type="submit">{t('formEdit.button')}</button>
          </CustomForm>
        )}
      </Formik>
    </ContainerForms>
  );
};
