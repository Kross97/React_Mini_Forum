import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import posts from '../Styles/Posts.css';
import postsDark from '../Styles/PostsDark.css';
import postsLight from '../Styles/PostsLight.css';
import { FormComent } from './FormComent';
import { allComments, allPosts } from '../reducers';
import { Comment } from './Comment';
import { ThemaApp } from './Application';
// споcоб через reselect
// import { selectComments } from './Selectors';

const actionCreators = {
  removeManyComments: allComments.actions.removeMany,
  removePost: allPosts.actions.removeOne,
  setCurrentPost: allPosts.actions.setCurrentPost,
  setCurrentComment: allComments.actions.setCurrentComment,
};

export const Post = (props) => {
  const [showComentForm, setShowComentForm] = useState(false);
  const [lookComents, setShowLookComents] = useState(false);
  const { postId } = props;

  const thema = useContext(ThemaApp);
  const dispatch = useDispatch();
  const {
    removePost,
    removeManyComments,
    setCurrentPost,
    setCurrentComment,
  } = bindActionCreators(actionCreators, dispatch);

  const showFormComent = () => {
    setShowComentForm(!showComentForm);
    setShowLookComents(false);
  };

  const showLookComents = (e) => {
    e.stopPropagation();
    setShowComentForm(false);
    setShowLookComents(!lookComents);
  };

  const changeCurrentPost = (idPost) => () => {
    setCurrentPost({ id: idPost });
  };

  const post = useSelector((state) => state.allPosts.entities[postId]);
  const userPost = useSelector((state) => state.allUsers.entities[post.user]);

  const removeCurrentPost = (idPost) => (e) => {
    e.stopPropagation();
    setCurrentPost({ id: 0 });
    setCurrentComment({ id: 0 });
    removePost(idPost);
    removeManyComments(post.comments);
  };

  const postsStyle = thema === 'dark' ? postsDark : postsLight;
  // способо через reselect
  // const comments = useSelector((state) => selectComments(state, post.comments));

  return (
    <div onClick={changeCurrentPost(post.id)} className={`${posts.post} ${postsStyle.post}`} aria-hidden>
      <button className={posts.btnRemove} onClick={removeCurrentPost(post.id)} aria-label="remove" type="button" />
      <div className={posts.infoPost}>
        <span>{userPost.name}</span>
        <span>{post.thema}</span>
      </div>
      <p>{post.text}</p>
      <button className={`${posts.comment} ${postsStyle.comment}`} onClick={showFormComent} type="button">Добавить комментарий</button>
      {post.comments.length !== 0 && <button className={`${posts.comment} ${postsStyle.comment}`} onClick={showLookComents} type="button">Посмотреть комментарий</button>}
      {lookComents && post.comments.map((commId) => (
        <Comment postId={post.id} comments={post.comments} commId={commId} />
      ))}
      {showComentForm
        && <FormComent postId={post.id} comments={post.comments} showFormComent={showFormComent} />}
    </div>
  );
};
