import React, { useState } from 'react';
// import { bindActionCreators } from 'redux';
// import { useDispatch, useSelector } from 'react-redux';
import { Posts } from './Posts';
import { FormEdit } from './FormEdit';
import { FormAdd } from './FormAdd';
import app from '../Styles/Application.css';

export const Application = () => {
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);

  const changeShowFormAdd = () => {
    setIsShowFormAdd(!isShowFormAdd);
  };
  return (
    <>
      <nav className={app.navigation}>
        <button className={app.btnAdd} onClick={changeShowFormAdd} type="button">Добавить пост</button>
      </nav>
      { isShowFormAdd && <FormAdd changeShowFormAdd={changeShowFormAdd} /> }
      <Posts />
      <FormEdit />
    </>
  );
};
