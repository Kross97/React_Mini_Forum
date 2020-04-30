import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import edit from '../Styles/FormEdit.css';
import { allPosts, allUsers, allComments } from '../reducers';

const actionCreators = {
  updateOnePost: allPosts.actions.updateOnePost,
  updateOneUser: allUsers.actions.updateOneUser,
  updateOneComment: allComments.actions.updateOneComment,
};

export const FormEdit = () => {
  const [userName, setUserName] = useState('');
  const [thema, setThema] = useState('');
  const [text, setText] = useState('');
  const [userNameComment, setUserNameComment] = useState('');
  const [textComment, setTextComment] = useState('');

  const dispatch = useDispatch();
  const {
    updateOnePost,
    updateOneUser,
    updateOneComment,
  } = bindActionCreators(actionCreators, dispatch);

  const postId = useSelector((state) => state.allPosts.currentPost);
  const { currentPost, currentUser } = useSelector((state) => (
    postId !== 0 ? {
      currentPost: state.allPosts.entities[postId],
      currentUser: state.allUsers.entities[state.allPosts.entities[postId].user],
    } : { currentPost: undefined, currentUser: undefined }), shallowEqual);

  const commentId = useSelector((state) => state.allComments.currentComment);
  const { currentComment, currentUserComment } = useSelector((state) => (
    commentId !== 0 ? {
      currentComment: state.allComments.entities[commentId],
      currentUserComment: state.allUsers.entities[state.allComments.entities[commentId].user],
    } : { currentComment: undefined, currentUserComment: undefined }), shallowEqual);

  const changeThema = ({ target }) => {
    setThema(target.value);
  };

  const changeName = ({ target }) => {
    setUserName(target.value);
  };

  const changeText = ({ target }) => {
    setText(target.value);
  };

  const changeTextComment = ({ target }) => {
    setTextComment(target.value);
  };

  const changeUserNameComment = ({ target }) => {
    setUserNameComment(target.value);
  };

  const changePost = (e) => {
    e.preventDefault();
    updateOnePost({ id: currentPost.id, changes: { thema, text } });
    updateOneUser({ id: currentUser.id, changes: { name: userName } });
  };

  const changeComment = (e) => {
    e.preventDefault();
    updateOneComment({ id: currentComment.id, changes: { text: textComment } });
    updateOneUser({ id: currentUserComment.id, changes: { name: userNameComment } });
  };

  useEffect(() => {
    if (currentPost && postId !== 0) {
      setUserName(currentUser.name);
      setThema(currentPost.thema);
      setText(currentPost.text);
    } else {
      setUserName('');
      setThema('');
      setText('');
    }

    if (currentComment && commentId !== 0) {
      setUserNameComment(currentUserComment.name);
      setTextComment(currentComment.text);
    } else {
      setUserNameComment('');
      setTextComment('');
    }
  }, [postId, commentId]);

  return (
    <div className={edit.container}>
      <form onSubmit={changePost} className={edit.form}>
        <p>Форма для поста</p>
        <input onChange={changeName} type="text" name="userName" value={userName} />
        <input onChange={changeThema} type="text" name="thema" value={thema} />
        <textarea onChange={changeText} type="text" name="text" value={text} />
        <button type="submit">Изменить</button>
      </form>
      <form onSubmit={changeComment} className={edit.form}>
        <p>Форма для комментария</p>
        <input onChange={changeUserNameComment} type="text" name="userNameComment" value={userNameComment} />
        <textarea onChange={changeTextComment} type="text" name="text" value={textComment} />
        <button type="submit">Изменить</button>
      </form>
    </div>
  );
};
