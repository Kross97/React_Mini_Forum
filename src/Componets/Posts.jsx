import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import posts from '../Styles/Posts.css';
import postsDark from '../Styles/PostsDark.css';
import postsLight from '../Styles/PostsLight.css';
import { Post } from './Post';
import { ThemaApp } from './Application';
import * as actions from '../actions/actions';

const actionCreators = {
  getAllPosts: actions.getAllPosts,
};

export const Posts = () => {
  const allposts = useSelector(({ allPosts }) => allPosts.ids);

  const thema = useContext(ThemaApp);
  const postsStyle = thema === 'dark' ? postsDark : postsLight;
  const dispatch = useDispatch();
  const { getAllPosts } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <aside className={`${posts.container} ${postsStyle.container}`}>
      {allposts.length !== 0 && allposts.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </aside>
  );
};
