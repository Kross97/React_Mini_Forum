import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { batchActions } from 'redux-batched-actions';
import { allPosts, allUsers, allComments } from '../reducers';
import { IPostForServer } from './IActions';

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
    const response = await axios.get('https://localhost:44303/api/posts');
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
  async (newPost: IPostForServer, { dispatch }) => {
    const data = normalize(newPost, postsSchema);
    dispatch(allUsers.actions.add(data.entities.users?.[newPost.user.id]));
    dispatch(allPosts.actions.add(data.entities.posts?.[newPost.id]));
    await axios.post('https://localhost:44303/api/posts', newPost);
  },
);

export const patchDataPost = createAsyncThunk(
  'patchDataPost/',
  async (dataPost: any) => {
    await axios.patch(`https://localhost:44303/api/posts/${dataPost.id}`, dataPost.postPatch);
  },
);

export const patchDataComment = createAsyncThunk(
  'patchDataComment/',
  async (dataComment: any) => {
    await axios.patch(`https://localhost:44303/api/posts/patchcomment/${dataComment.id}`, dataComment.commentPatch);
  },
);

export const removeComment = createAsyncThunk(
  'comments/Remove/',
  async (id: number) => {
    await axios.delete(`https://localhost:44303/api/posts/deletecomment/${id}`);
  },
);

export const addNewComent = createAsyncThunk(
  'comments/Add/',
  async (dataComment: any, { dispatch }) => {
    const data = normalize(dataComment.newComment, commentsSchema);
    const comment = data.entities.comments?.[dataComment.newComment.id];
    const user = data.entities.users?.[dataComment.newComment.user.id];
    dispatch(
      batchActions([
        allUsers.actions.add(user),
        allComments.actions.add(comment),
      ]),
    );
    await axios.post(`https://localhost:44303/api/posts/createcomment/${dataComment.postId}`, dataComment.newComment);
  },
);

export const removePost = createAsyncThunk(
  'removePost/',
  async (dataPost: any, { dispatch }) => {
    dispatch(
      batchActions([
        allPosts.actions.removeOne(dataPost.postId),
        allComments.actions.removeMany(dataPost.comments),
      ]),
    );
    await axios.delete(`https://localhost:44303/api/posts/${dataPost.postId}`);
  },
);
