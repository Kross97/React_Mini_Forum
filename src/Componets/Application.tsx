import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { Posts } from './Posts';
import { FormsEdit } from './FormsEdit';
import { FormAdd } from './FormAdd';
import { Navigation, ButtonAdd } from '../UIComponents/UIApplication';

export const Application = () => {
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [thema, setThema] = useState('dark');
  const changeShowFormAdd = useCallback(() => {
    // eslint-disable-next-line
    setIsShowFormAdd((isShowFormAdd) => !isShowFormAdd);
  }, []);

  const changeThema = () => {
    const newThema = thema === 'dark' ? 'light' : 'dark';
    setThema(newThema);
  };

  return (
    <>
      <ThemeProvider theme={{ thema }}>
        <Navigation>
          <ButtonAdd onClick={changeShowFormAdd} type="button">Добавить пост</ButtonAdd>
          <ButtonAdd onClick={changeThema} type="button">Сменить тему</ButtonAdd>
        </Navigation>
        { isShowFormAdd && <FormAdd changeShowFormAdd={changeShowFormAdd} /> }
        <Posts />
        <FormsEdit />
      </ThemeProvider>
    </>
  );
};
