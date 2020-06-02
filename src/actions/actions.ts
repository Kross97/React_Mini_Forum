import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { batchActions } from 'redux-batched-actions';
import { allPosts, allUsers, allComments } from '../reducers';
import { IPostForServer, IDataPost, IDataComment } from './IActions';

axios.defaults.baseURL = 'https://localhost:44303/';

const userSchema = new schema.Entity('users');

const commentsSchema = new schema.Entity(
  'comments',
  { user: userSchema },
);

const postsSchema = new schema.Entity(
  'posts',
  { user: userSchema, comments: [commentsSchema] },
);


export const getAllPosts = createAsyncThunk(
  'getAllPosts/',
  async (_: any, { dispatch }) => {
    const response = await axios.get('api/posts');
    const data = normalize(response.data, [postsSchema]);
    console.log('Данные с локального сервера:', data);
    if (data.entities.users && data.entities.posts && data.entities.comments) {
      dispatch(
        batchActions([
          allUsers.actions.setAllUsers(data.entities.users),
          allPosts.actions.setAllPosts(data.entities.posts),
          allComments.actions.setAllComments(data.entities.comments),
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
    axios.post('api/posts', newPost);
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
    axios.patch(`api/posts/${id}`, postPatch);
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
    axios.post(`api/posts/createcomment/${dataComment.postId}`, dataComment.newComment);
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
    axios.delete(`api/posts/${dataPost.postId}`);
  },
);
