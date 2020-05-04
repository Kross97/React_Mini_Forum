/* eslint-disable no-param-reassign */
import { createSlice, combineReducers, createEntityAdapter } from '@reduxjs/toolkit';
import { IPost, IComment, IUser } from './IReducers';

const postsAdapter = createEntityAdapter<IPost>();

export const allPosts = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    currentPost: 0,
  }),
  reducers: {
    add: postsAdapter.addOne,
    addMany: postsAdapter.addMany,
    setCurrentPost: (state, action) => {
      const { id } = action.payload;
      state.currentPost = id;
    },
    updateOnePost: postsAdapter.updateOne,
    removeOne: postsAdapter.removeOne,
  },
});

const usersAdapter = createEntityAdapter<IUser>();

export const allUsers = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    add: usersAdapter.addOne,
    addMany: usersAdapter.addMany,
    updateOneUser: usersAdapter.updateOne,
  },
});

const commentsAdapter = createEntityAdapter<IComment>();

export const allComments = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({
    currentComment: 0,
  }),
  reducers: {
    add: commentsAdapter.addOne,
    addMany: commentsAdapter.addMany,
    updateOneComment: commentsAdapter.updateOne,
    removeOne: commentsAdapter.removeOne,
    removeMany: commentsAdapter.removeMany,
    setCurrentComment: (state, action) => {
      const { id } = action.payload;
      state.currentComment = id;
    },
  },
});

export default combineReducers({
  allPosts: allPosts.reducer,
  allUsers: allUsers.reducer,
  allComments: allComments.reducer,
});
