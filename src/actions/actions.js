import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { batchActions } from 'redux-batched-actions';
import { allPosts, allUsers, allComments } from '../reducers';

const userSchema = new schema.Entity('users');
const commentsSchema = new schema.Entity(
  'comments',
  { user: userSchema },
);
const postsSchema = new schema.Entity(
  'posts',
  { user: userSchema, comments: [commentsSchema] },
);

export const addPost = (newPost) => async (dispatch) => {
  try {
    const data = normalize(newPost, postsSchema);
    dispatch(allUsers.actions.add(data.entities.users[newPost.user.id]));
    dispatch(allPosts.actions.add(data.entities.posts[newPost.id]));
    await axios.post('http://localhost:3000/posts', newPost);
  } catch (e) {
    console.log(e);
  }
};

export const addNewComent = (idPost, newComment) => async (dispatch) => {
  try {
    const data = normalize(newComment, commentsSchema);
    dispatch(allComments.actions.add(data.entities.comments[newComment.id]));
    dispatch(allUsers.actions.add(data.entities.users[newComment.user.id]));
    const response = await axios.get(`http://localhost:3000/posts/?id=${idPost}`);
    const currentPost = response.data[0];
    currentPost.comments.push(newComment);
    await axios.patch(`http://localhost:3000/posts/${idPost}`, currentPost);
  } catch (e) {
    console.log(e);
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    const data = normalize(response.data, [postsSchema]);
    // dispatch(allUsers.actions.addMany(data.entities.users));
    // dispatch(allComments.actions.addMany(data.entities.comments));
    // dispatch(allPosts.actions.addMany(data.entities.posts));
    dispatch(
      batchActions([
        allUsers.actions.addMany(data.entities.users),
        allPosts.actions.addMany(data.entities.posts),
        allComments.actions.addMany(data.entities.comments),
      ]),
    );
  } catch (e) {
    console.log(e);
  }
};
