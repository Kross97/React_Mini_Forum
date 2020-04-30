import React, { useState } from 'react';
import { Posts } from './Posts';
import { FormsEdit } from './FormsEdit';
import { FormAdd } from './FormAdd';
import appDark from '../Styles/ApplicationDark.css';
import appLight from '../Styles/ApplicationLight.css';

export const ThemaApp = React.createContext('dark');

export const Application = () => {
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [thema, setThema] = useState('dark');
  const changeShowFormAdd = () => {
    setIsShowFormAdd(!isShowFormAdd);
  };

  const changeThema = () => {
    const newThema = thema === 'dark' ? 'light' : 'dark';
    setThema(newThema);
  };

  const appStyle = thema === 'dark' ? appDark : appLight;
  return (
    <>
      <ThemaApp.Provider value={thema}>
        <nav className={appStyle.navigation}>
          <button className={appStyle.btnAdd} onClick={changeShowFormAdd} type="button">Добавить пост</button>
          <button className={appStyle.btnAdd} onClick={changeThema} type="button">Сменить тему</button>
        </nav>
        { isShowFormAdd && <FormAdd changeShowFormAdd={changeShowFormAdd} /> }
        <Posts />
        <FormsEdit />
      </ThemaApp.Provider>
    </>
  );
};
