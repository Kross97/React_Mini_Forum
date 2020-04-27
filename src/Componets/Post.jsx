import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import posts from '../Styles/Posts.css';
import { FormComent } from './FormComent';
import { allComments, allPosts } from '../reducers';

const actionCreators = {
  removeComment: allComments.actions.removeOne,
  removeManyComments: allComments.actions.removeMany,
  updateOnePost: allPosts.actions.updateOnePost,
  removePost: allPosts.actions.removeOne,
  setCurrentPost: allPosts.actions.setCurrentPost,
  setCurrentComment: allComments.actions.setCurrentComment,
};

export const Post = (props) => {
  const [showComentForm, setShowComentForm] = useState(false);
  const [lookComents, setShowLookComents] = useState(false);
  const { post } = props;

  const dispatch = useDispatch();
  const {
    removeComment,
    updateOnePost,
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

  const commentForEdit = (idComment) => (e) => {
    e.stopPropagation();
    setCurrentComment({ id: idComment });
  };

  const removeCurrentPost = (idPost) => (e) => {
    e.stopPropagation();
    setCurrentPost({ id: 0 });
    setCurrentComment({ id: 0 });
    removePost(idPost);
    removeManyComments(post.comments);
  };

  const removeCurrentComent = (idComment) => (e) => {
    e.stopPropagation();
    setCurrentComment({ id: 0 });
    removeComment(idComment);
    updateOnePost(
      { id: post.id, changes: { comments: post.comments.filter((id) => id !== idComment) } },
    );
  };

  const comments = useSelector((state) => post.comments.map(
    (id) => {
      if (state.allComments.entities[id] == undefined) {
        return undefined;
      }
      const userId = state.allComments.entities[id].user;
      return { ...state.allComments.entities[id], user: state.allUsers.entities[userId] };
    },
  ));

  return (
    <div onClick={changeCurrentPost(post.id)} className={posts.post} aria-hidden>
      <button className={posts.btnRemove} onClick={removeCurrentPost(post.id)} aria-label="remove" type="button" />
      <div className={posts.infoPost}>
        <span>{post.user.name}</span>
        <span>{post.thema}</span>
      </div>
      <p>{post.text}</p>
      <button className={posts.comment} onClick={showFormComent} type="button">Добавить комментарий</button>
      {comments.length !== 0 && <button className={posts.comment} onClick={showLookComents} type="button">Посмотреть комментарий</button>}
      {lookComents && comments[0] != undefined && comments.map((comm) => (
        <div onClick={commentForEdit(comm.id)} className={posts.commentBody} aria-hidden>
          <button className={posts.btnRemove} onClick={removeCurrentComent(comm.id)} aria-label="remove" type="button" />
          <span>{comm.user.name}</span>
          <span>{comm.text}</span>
        </div>
      ))}
      {showComentForm
        && <FormComent postId={post.id} comments={post.comments} showFormComent={showFormComent} />}
    </div>
  );
};
