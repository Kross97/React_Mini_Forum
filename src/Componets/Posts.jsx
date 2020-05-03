import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Post } from './Post';
import { ThemaApp } from './Application';
import * as actions from '../actions/actions';
import { ContainerPosts } from '../UIComponents/UIPosts';

const actionCreators = {
  getAllPosts: actions.getAllPosts,
};

export const Posts = () => {
  const allposts = useSelector(({ allPosts }) => allPosts.ids);

  const thema = useContext(ThemaApp);
  const dispatch = useDispatch();
  const { getAllPosts } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <ContainerPosts thema={thema}>
      {allposts.length !== 0 && allposts.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </ContainerPosts>
  );
};
