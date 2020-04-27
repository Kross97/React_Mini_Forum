import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import add from '../Styles/FormAdd.css';
import * as actions from '../actions/actions';

const actionCreators = {
  addPost: actions.addPost,
};

export const FormAdd = (props) => {
  const [thema, setThema] = useState('');
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const { changeShowFormAdd } = props;
  const dispatch = useDispatch();
  const { addPost } = bindActionCreators(actionCreators, dispatch);

  const changeThema = ({ target }) => {
    setThema(target.value);
  };

  const changeName = ({ target }) => {
    setUserName(target.value);
  };

  const changeText = ({ target }) => {
    setText(target.value);
  };

  const addNewPost = (e) => {
    e.preventDefault();
    if (userName === '' || thema === '' || text === '') {
      setError(!error);
      return;
    }
    const date = new Date();
    const newPost = {
      id: Number(uniqueId()) + Date.parse(String(date)),
      thema,
      text,
      user: {
        id: Number(uniqueId()) + Date.parse(String(date)),
        name: userName,
      },
      comments: [],
    };
    addPost(newPost);
    setThema('');
    setUserName('');
    setText('');
    changeShowFormAdd();
  };

  return (
    <>
      <div onClick={changeShowFormAdd} className={add.blockBack} aria-hidden />
      <form onSubmit={addNewPost} className={add.form}>
        <input onChange={changeThema} type="text" placeholder="введите тему" value={thema} />
        <input onChange={changeName} type="text" placeholder="введите имя пользователя" value={userName} />
        <textarea onChange={changeText} placeholder="введите текс" value={text} />
        {error && <p style={{ color: 'red' }}>Не все поля формы заполнены!</p>}
        <button type="submit">Добавить</button>
      </form>
    </>
  );
};
