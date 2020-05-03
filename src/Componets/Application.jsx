import React, { useState, useCallback } from 'react';
import { Posts } from './Posts';
import { FormsEdit } from './FormsEdit';
import { FormAdd } from './FormAdd';
import { Navigation, ButtonAdd } from '../UIComponents/UIApplication';

export const ThemaApp = React.createContext('dark');

export const Application = () => {
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [thema, setThema] = useState('dark');
  const changeShowFormAdd = useCallback(() => {
    setIsShowFormAdd(!isShowFormAdd);
  }, [isShowFormAdd]);

  const changeThema = () => {
    const newThema = thema === 'dark' ? 'light' : 'dark';
    setThema(newThema);
  };

  return (
    <>
      <ThemaApp.Provider value={thema}>
        <Navigation thema={thema}>
          <ButtonAdd thema={thema} onClick={changeShowFormAdd} type="button">Добавить пост</ButtonAdd>
          <ButtonAdd thema={thema} onClick={changeThema} type="button">Сменить тему</ButtonAdd>
        </Navigation>
        { isShowFormAdd && <FormAdd changeShowFormAdd={changeShowFormAdd} /> }
        <Posts />
        <FormsEdit />
      </ThemaApp.Provider>
    </>
  );
};
