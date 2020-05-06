import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Posts } from './Posts';
import { FormsEdit } from './FormsEdit';
import { FormAdd } from './FormAdd';
import { Navigation, ButtonAdd, SelectLanguage } from '../UIComponents/UIApplication';

export const Application = () => {
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [thema, setThema] = useState('dark');
  const changeShowFormAdd = useCallback(() => {
    // eslint-disable-next-line
    setIsShowFormAdd((isShowFormAdd) => !isShowFormAdd);
  }, []);

  const { t, i18n } = useTranslation();
  const changeThema = () => {
    const newThema = thema === 'dark' ? 'light' : 'dark';
    setThema(newThema);
  };

  const changeLanguage = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(target.value);
  };

  return (
    <>
      <ThemeProvider theme={{ thema }}>
        <Navigation>
          <ButtonAdd onClick={changeShowFormAdd} type="button">{t('changePost')}</ButtonAdd>
          <ButtonAdd onClick={changeThema} type="button">{t('changeThema')}</ButtonAdd>
        </Navigation>
        { isShowFormAdd && <FormAdd changeShowFormAdd={changeShowFormAdd} /> }
        <Posts />
        <FormsEdit />
        <SelectLanguage onChange={changeLanguage}>
          <option selected value="ru">RU</option>
          <option value="en">EN</option>
          <option value="uk">UE</option>
        </SelectLanguage>
      </ThemeProvider>
    </>
  );
};
