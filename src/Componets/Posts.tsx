import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Post } from './Post';
import * as actions from '../actions/actions';
import { ContainerPosts } from '../UIComponents/UIPosts';
import { IAppState } from '../IApplication';

const actionCreators = {
  getAllPosts: actions.getAllPosts,
};

export const Posts = () => {
  const { postIds, usersIds } = useSelector(({ allPosts, allUsers }: IAppState) => ({
    postIds: allPosts.ids,
    usersIds: allUsers.ids,
  }), shallowEqual);

  const dispatch = useDispatch();
  const { getAllPosts } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    setTimeout(getAllPosts, 300);
  }, [usersIds.length]);

  return (
    <ContainerPosts>
      {postIds.length !== 0 && postIds.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </ContainerPosts>
  );
};
