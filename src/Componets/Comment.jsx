import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allComments, allPosts } from '../reducers';
import posts from '../Styles/Posts.css';
import { ThemaApp } from './Application';
import { User } from './User';
import { CommentPost } from '../UIComponents/UIComment';

const actionCreators = {
  removeComment: allComments.actions.removeOne,
  updateOnePost: allPosts.actions.updateOnePost,
  setCurrentComment: allComments.actions.setCurrentComment,
};

export const Comment = React.memo((props) => {
  const { commId, postId, comments } = props;

  const dispatch = useDispatch();
  const {
    removeComment,
    updateOnePost,
    setCurrentComment,
  } = bindActionCreators(actionCreators, dispatch);

  const thema = useContext(ThemaApp);

  const commentForEdit = (e) => {
    e.stopPropagation();
    setCurrentComment({ id: commId });
  };

  const removeCurrentComent = (e) => {
    e.stopPropagation();
    setCurrentComment({ id: 0 });
    removeComment(commId);
    updateOnePost(
      { id: postId, changes: { comments: comments.filter((id) => id !== commId) } },
    );
  };

  const comment = useSelector((state) => state.allComments.entities[commId]);

  return (
    <CommentPost onClick={commentForEdit} thema={thema} aria-hidden>
      <button className={posts.btnRemove} onClick={removeCurrentComent} aria-label="remove" type="button" />
      <User idSource={comment.user} />
      <span>{comment.text}</span>
    </CommentPost>
  );
});
