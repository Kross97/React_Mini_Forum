import React, { useState, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import posts from '../Styles/Posts.css';
import { FormComent } from './FormComent';
import { allComments, allPosts } from '../reducers';
import { Comment } from './Comment';
import { ThemaApp } from './Application';
import { User } from './User';
import { CommentButton } from '../UIComponents/UIComment';
import { CurrentPost } from '../UIComponents/UIPosts';
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

  const showFormComent = useCallback(() => {
    setShowComentForm(!showComentForm);
    setShowLookComents(false);
  }, [showComentForm]);

  const showLookComents = (e) => {
    e.stopPropagation();
    setShowComentForm(false);
    setShowLookComents(!lookComents);
  };

  const changeCurrentPost = () => {
    setCurrentPost({ id: postId });
  };

  const post = useSelector((state) => state.allPosts.entities[postId]);

  const removeCurrentPost = (e) => {
    e.stopPropagation();
    setCurrentPost({ id: 0 });
    setCurrentComment({ id: 0 });
    removePost(postId);
    removeManyComments(post.comments);
  };

  // способ через reselect
  // const comments = useSelector((state) => selectComments(state, post.comments));

  return (
    <CurrentPost thema={thema} onClick={changeCurrentPost} aria-hidden>
      <button className={posts.btnRemove} onClick={removeCurrentPost} aria-label="remove" type="button" />
      <div className={posts.infoPost}>
        <User idSource={post.user} />
        <span>{post.thema}</span>
      </div>
      <p>{post.text}</p>
      <CommentButton thema={thema} onClick={showFormComent} type="button">Добавить комментарий</CommentButton>
      {post.comments.length !== 0 && <CommentButton thema={thema} onClick={showLookComents} type="button">Посмотреть комментарий</CommentButton>}
      {lookComents && post.comments.map((commId) => (
        <Comment postId={post.id} comments={post.comments} commId={commId} />
      ))}
      {showComentForm
        && <FormComent postId={post.id} comments={post.comments} showFormComent={showFormComent} />}
    </CurrentPost>
  );
};
