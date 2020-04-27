import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { allPosts, allUsers, allComments } from '../reducers';

const userSchema = new schema.Entity('users');
const postsSchema = new schema.Entity(
  'posts',
  { user: userSchema },
  {
    mergeStrategy: (entityA, entityB) => ({
      ...entityA,
      ...entityB,
      favorites: entityA.favorites,
    }),
  },
);

export const addPost = (newPost) => async (dispatch) => {
  try {
    const data = normalize(newPost, postsSchema);
    dispatch(allPosts.actions.add(data.entities.posts[newPost.id]));
    dispatch(allUsers.actions.add(data.entities.users[newPost.user.id]));
    await axios.post('http://localhost:3000/posts', newPost);
  } catch (e) {
    console.log(e);
  }
};

const commentsSchema = new schema.Entity(
  'comments',
  { user: userSchema },
  {
    mergeStrategy: (entityA, entityB) => ({
      ...entityA,
      ...entityB,
      favorites: entityA.favorites,
    }),
  },
);

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

const arrayPostsSchema = new schema.Array(postsSchema);
const arrayCommentsSchema = new schema.Array(commentsSchema);

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    const data = normalize(response.data, arrayPostsSchema);
    dispatch(allUsers.actions.addMany(data.entities.users));
    data.result.forEach((id) => {
      const post = data.entities.posts[id];
      const comments = normalize(post.comments, arrayCommentsSchema);
      post.comments = comments.result;
      dispatch(allPosts.actions.add(post));
      dispatch(allUsers.actions.addMany(comments.entities.users));
      dispatch(allComments.actions.addMany(comments.entities.comments));
    });
  } catch (e) {
    // console.log(e);
  }
};
