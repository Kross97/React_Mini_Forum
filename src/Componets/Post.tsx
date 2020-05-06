import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import posts from '../Styles/Posts.css';
import { FormComent } from './FormComent';
import { allComments, allPosts } from '../reducers';
import { Comment } from './Comment';
import { User } from './User';
import { CommentButton } from '../UIComponents/UIComment';
import { CurrentPost } from '../UIComponents/UIPosts';
import { IPostProps } from './Interfaces/IPost';
import { IAppState } from '../IApplication';
import * as actions from '../actions/actions';
// споcоб через reselect
// import { selectComments } from './Selectors';

const actionCreators = {
  removePost: actions.removePost,
  setCurrentPost: allPosts.actions.setCurrentPost,
  setCurrentComment: allComments.actions.setCurrentComment,
};


export const Post = (props: IPostProps) => {
  const [showComentForm, setShowComentForm] = useState(false);
  const [lookComents, setShowLookComents] = useState(false);
  const { postId } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    removePost,
    setCurrentPost,
    setCurrentComment,
  } = bindActionCreators(actionCreators, dispatch);

  const showFormComent = useCallback(() => {
    // eslint-disable-next-line
    setShowComentForm((showComentForm) => !showComentForm);
    setShowLookComents(false);
  }, []);

  const showLookComents = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowComentForm(false);
    setShowLookComents(!lookComents);
  };

  const changeCurrentPost = () => {
    setCurrentPost({ id: postId });
  };

  const post = useSelector((state: IAppState) => state.allPosts.entities[postId]);

  const removeCurrentPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const comments = post == undefined ? [] : post.comments;
    setCurrentPost({ id: 0 });
    setCurrentComment({ id: 0 });
    removePost(postId, comments);
  };

  // способ через reselect
  // const comments = useSelector((state) => selectComments(state, post.comments));

  return (
    <CurrentPost onClick={changeCurrentPost} aria-hidden>
      <button className={posts.btnRemove} onClick={removeCurrentPost} aria-label="remove" type="button" />
      <div className={posts.infoPost}>
        <User idSource={post?.user != undefined ? post?.user : -1} />
        <span>{post?.thema}</span>
      </div>
      <p>{post?.text}</p>
      <CommentButton onClick={showFormComent} type="button">{t('dataComment:addComment')}</CommentButton>
      {post?.comments.length !== 0 && <CommentButton onClick={showLookComents} type="button">{t('dataComment:showComment')}</CommentButton>}
      {lookComents && post?.comments.map((commId) => (
        <Comment postId={post?.id} comments={post.comments} commId={commId} />
      ))}
      {showComentForm
        && (
        <FormComent
          postId={post?.id != undefined ? post?.id : -1}
          comments={post?.comments != undefined ? post?.comments : []}
          showFormComent={showFormComent}
        />
        )}
    </CurrentPost>
  );
};
