import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Post } from './Post';
import * as actions from '../actions/actions';
import { ContainerPosts } from '../UIComponents/UIPosts';
import { IAppState } from '../IApplication';

const actionCreators = {
  getAllPosts: actions.getAllPosts,
};

export const Posts = () => {
  const allposts = useSelector(({ allPosts }: IAppState) => allPosts.ids);

  const dispatch = useDispatch();
  const { getAllPosts } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <ContainerPosts>
      {allposts.length !== 0 && allposts.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </ContainerPosts>
  );
};
