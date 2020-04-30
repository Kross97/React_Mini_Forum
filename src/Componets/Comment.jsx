import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allComments, allPosts } from '../reducers';
import posts from '../Styles/Posts.css';
import postsDark from '../Styles/PostsDark.css';
import postsLight from '../Styles/PostsLight.css';
import { ThemaApp } from './Application';

const actionCreators = {
  removeComment: allComments.actions.removeOne,
  updateOnePost: allPosts.actions.updateOnePost,
  setCurrentComment: allComments.actions.setCurrentComment,
};

export const Comment = (props) => {
  const { commId, postId, comments } = props;

  const dispatch = useDispatch();
  const {
    removeComment,
    updateOnePost,
    setCurrentComment,
  } = bindActionCreators(actionCreators, dispatch);

  const thema = useContext(ThemaApp);

  const commentForEdit = (idComment) => (e) => {
    e.stopPropagation();
    setCurrentComment({ id: idComment });
  };

  const removeCurrentComent = (idComment) => (e) => {
    e.stopPropagation();
    setCurrentComment({ id: 0 });
    removeComment(idComment);
    updateOnePost(
      { id: postId, changes: { comments: comments.filter((id) => id !== idComment) } },
    );
  };

  const postsStyle = thema === 'dark' ? postsDark : postsLight;

  const comment = useSelector((state) => state.allComments.entities[commId]);
  const commentUser = useSelector((state) => state.allUsers.entities[comment.user]);
  return (
    <div onClick={commentForEdit(commId)} className={`${posts.commentBody} ${postsStyle.commentBody}`} aria-hidden>
      <button className={posts.btnRemove} onClick={removeCurrentComent(commId)} aria-label="remove" type="button" />
      <span>{commentUser.name}</span>
      <span>{comment.text}</span>
    </div>
  );
};
