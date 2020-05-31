import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { batchActions } from 'redux-batched-actions';
import { allPosts, allUsers, allComments } from '../reducers';
import {
  StoreDispatch,
  AppThunk,
  IPostForServer,
  IComment,
} from './IActions';

const userSchema = new schema.Entity('users');

const commentsSchema = new schema.Entity(
  'comments',
  { user: userSchema },
);

const postsSchema = new schema.Entity(
  'posts',
  { user: userSchema, comments: [commentsSchema] },
);


export const getAllPosts = (): AppThunk => async (dispatch: StoreDispatch) => {
  try {
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
  } catch (e) {
    // console.log('ERROR!!!', e);
  }
};

export const addPost = (newPost: IPostForServer): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    const data = normalize(newPost, postsSchema);
    dispatch(allUsers.actions.add(data.entities.users?.[newPost.user.id]));
    dispatch(allPosts.actions.add(data.entities.posts?.[newPost.id]));
    await axios.post('https://localhost:44303/api/posts', newPost);
  } catch (e) {
    // console.log(e);
  }
};


export const patchDataPost = (id: number, postPatch: any): AppThunk => async () => {
  try {
    await axios.patch(`https://localhost:44303/api/posts/${id}`, postPatch);
  } catch (e) {
    // console.log(e);
  }
};

export const patchDataComment = (id: number, commentPatch: any): AppThunk => async () => {
  try {
    await axios.patch(`https://localhost:44303/api/posts/patchcomment/${id}`, commentPatch);
  } catch (e) {
    // console.log(e);
  }
};


export const removeComment = (id: number): AppThunk => async () => {
  try {
    await axios.delete(`https://localhost:44303/api/posts/deletecomment/${id}`);
  } catch (e) {
    // console.log(e);
  }
};

export const addNewComent = (
  idPost: number,
  newComment: IComment,
): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    const data = normalize(newComment, commentsSchema);
    dispatch(allComments.actions.add(data.entities.comments?.[newComment.id]));
    dispatch(allUsers.actions.add(data.entities.users?.[newComment.user.id]));
    await axios.post(`https://localhost:44303/api/posts/createcomment/${idPost}`, newComment);
  } catch (e) {
    // console.log(e);
  }
};

export const removePost = (
  postId: number | string,
  comments: number[],
): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(
      batchActions([
        allPosts.actions.removeOne(postId),
        allComments.actions.removeMany(comments),
      ]),
    );
    await axios.delete(`https://localhost:44303/api/posts/${postId}`);
  } catch (e) {
    // console.log(e);
  }
};
