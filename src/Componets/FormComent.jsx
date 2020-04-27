import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqueId from 'lodash/uniqueId';
import coment from '../Styles/FormComent.css';
import * as actions from '../actions/actions';
import { allPosts } from '../reducers';

const actionCreators = {
  addNewComent: actions.addNewComent,
  updateOnePost: allPosts.actions.updateOnePost,
};

export const FormComent = (props) => {
  const [userName, setUserName] = useState('');
  const [textComent, setTextComent] = useState('');
  const [error, setError] = useState(false);

  const { showFormComent, postId, comments } = props;

  const dispatch = useDispatch();
  const { addNewComent, updateOnePost } = bindActionCreators(actionCreators, dispatch);

  const changeUserName = ({ target }) => {
    setUserName(target.value);
  };

  const changeTextComent = ({ target }) => {
    setTextComent(target.value);
  };

  const addComent = (e) => {
    e.preventDefault();
    if (userName === '' || textComent === '') {
      setError(!error);
      return;
    }
    const date = new Date();
    const newComment = {
      id: Number(uniqueId()) + Date.parse(String(date)),
      text: textComent,
      user: {
        id: Number(uniqueId()) + Date.parse(String(date)),
        name: userName,
      },
    };
    addNewComent(postId, newComment);
    updateOnePost({ id: postId, changes: { comments: [newComment.id, ...comments] } });
    showFormComent();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <form onSubmit={addComent} className={coment.form}>
      <input onChange={changeUserName} type="text" name="userName" value={userName} placeholder="Введите имя пользователя" />
      <textarea onChange={changeTextComent} type="text" name="textComent" value={textComent} placeholder="Введите комментарий" />
      {error && <p style={{ color: 'red', 'font-size': '14px' }}>Не все поля формы заполнены!</p>}
      <button onClick={stopPropagation} type="submit">Добавить</button>
    </form>
  );
};
