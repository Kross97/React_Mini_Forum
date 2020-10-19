/* eslint-disable no-param-reassign */
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { batchActions } from 'redux-batched-actions';
import omit from 'lodash/omit';
import { allPosts, allUsers, allComments } from '../reducers';
import { IPostForServer, IDataPost, IDataComment } from './IActions';

axios.defaults.baseURL = 'http://localhost:8000/';

const userSchema = new schema.Entity('users');

const commentsSchema = new schema.Entity(
  'comments',
  { user: userSchema },
  {
    processStrategy: (entity) => {
      const newEntity = { ...entity };
      delete newEntity.userid;
      delete newEntity.postid;
      return newEntity;
    },
  },
);

const postsSchema = new schema.Entity(
  'posts',
  { user: userSchema, comments: [commentsSchema] },
  {
    processStrategy: (entity) => {
      const newEntity = { ...entity };
      delete newEntity.userid;
      return newEntity;
    },
  },
);


export const getAllPosts = createAsyncThunk(
  'getAllPosts/',
  async (_: any, { dispatch }) => {
    const response = await axios.get('api/posts/getposts');
    const data = normalize(response.data, [postsSchema]);
    console.log('Данные с локального сервера:', data);
    if (data.entities.users && data.entities.posts) {
      const allCommentsData = data.entities.comments ? data.entities.comments : [];
      dispatch(
        batchActions([
          allUsers.actions.setAllUsers(data.entities.users),
          allPosts.actions.setAllPosts(data.entities.posts),
          allComments.actions.setAllComments(allCommentsData),
        ]),
      );
    }
  },
);

export const addPost = createAsyncThunk(
  'addPost/',
  (newPost: IPostForServer, { dispatch }) => {
    const data = normalize(newPost, postsSchema);
    dispatch(allUsers.actions.add(data.entities.users?.[newPost.user.id]));
    dispatch(allPosts.actions.add(data.entities.posts?.[newPost.id]));
    const newPost2 = omit(newPost, ['id', 'user.id']);
    axios.post('api/posts/createpost', newPost2);
  },
);

export const patchDataPost = createAsyncThunk(
  'patchDataPost/',
  ({ id, idUser, postPatch }: IDataPost, { dispatch }) => {
    dispatch(allPosts.actions.updateOnePost({
      id, changes: { thema: postPatch.thema, text: postPatch.text },
    }));
    dispatch(allUsers.actions.updateOneUser({
      id: idUser, changes: { name: postPatch.user.name },
    }));
    axios.patch(`api/posts/patchpost/${id}`, postPatch);
  },
);

export const patchDataComment = createAsyncThunk(
  'patchDataComment/',
  ({ id, idUser, commentPatch }: IDataComment, { dispatch }) => {
    dispatch(allComments.actions.updateOneComment({
      id, changes: { text: commentPatch.text },
    }));
    dispatch(allUsers.actions.updateOneUser({
      id: idUser, changes: { name: commentPatch.user.name },
    }));
    axios.patch(`api/posts/patchcomment/${id}`, commentPatch);
  },
);

export const removeComment = createAsyncThunk(
  'comments/Remove/',
  (id: number) => {
    axios.delete(`api/posts/deletecomment/${id}`);
  },
);

export const addNewComent = createAsyncThunk(
  'comments/Add/',
  (dataComment: any, { dispatch }) => {
    const data = normalize(dataComment.newComment, commentsSchema);
    const comment = data.entities.comments?.[dataComment.newComment.id];
    const user = data.entities.users?.[dataComment.newComment.user.id];
    dispatch(
      batchActions([
        allUsers.actions.add(user),
        allComments.actions.add(comment),
      ]),
    );
    const newComment = omit(dataComment.newComment, ['id', 'user.id']);
    axios.post(`api/posts/createcomment/${dataComment.postId}`, newComment);
  },
);

export const removePost = createAsyncThunk(
  'removePost/',
  (dataPost: any, { dispatch }) => {
    dispatch(
      batchActions([
        allPosts.actions.removeOne(dataPost.postId),
        allComments.actions.removeMany(dataPost.comments),
      ]),
    );
    axios.delete(`api/posts/deletepost/${dataPost.postId}`);
  },
);
