import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import posts from '../Styles/Posts.css';
import { Post } from './Post';
import * as actions from '../actions/actions';

const actionCreators = {
  getAllPosts: actions.getAllPosts,
};

export const Posts = () => {
  const allposts = useSelector(({ allUsers, allPosts }) => (
    allPosts.ids.map((id) => {
      const idUser = allPosts.entities[id].user;
      return { ...allPosts.entities[id], user: allUsers.entities[idUser] };
    })
  ));


  const dispatch = useDispatch();
  const { getAllPosts } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <aside className={posts.container}>
      {allposts.length !== 0 && allposts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </aside>
  );
};
