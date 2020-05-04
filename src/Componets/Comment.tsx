import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allComments, allPosts } from '../reducers';
import posts from '../Styles/Posts.css';
import { User } from './User';
import { CommentPost } from '../UIComponents/UIComment';
import { IAppState } from '../IApplication';
import { ICommentProps } from './Interfaces/IComment';

const actionCreators = {
  removeComment: allComments.actions.removeOne,
  updateOnePost: allPosts.actions.updateOnePost,
  setCurrentComment: allComments.actions.setCurrentComment,
};

export const Comment = React.memo((props: ICommentProps) => {
  const { commId, postId, comments } = props;

  const dispatch = useDispatch();
  const {
    removeComment,
    updateOnePost,
    setCurrentComment,
  } = bindActionCreators(actionCreators, dispatch);

  const commentForEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCurrentComment({ id: commId });
  };

  const removeCurrentComent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentComment({ id: 0 });
    removeComment(commId);
    updateOnePost(
      { id: postId, changes: { comments: comments.filter((id: number) => id !== commId) } },
    );
  };

  const comment = useSelector((state: IAppState) => state.allComments.entities[commId]);

  return (
    <CommentPost onClick={commentForEdit} aria-hidden>
      <button className={posts.btnRemove} onClick={removeCurrentComent} aria-label="remove" type="button" />
      <User idSource={comment?.user as number} />
      <span>{comment?.text}</span>
    </CommentPost>
  );
});
