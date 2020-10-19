import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import app from '../Styles/App.css';
import { Posts } from './Posts';
import { FormsEdit } from './FormsEdit';
import { FormAdd } from './FormAdd';
import { Navigation, ButtonAdd } from '../UIComponents/UIApplication';

const options = [
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
  { value: 'uk', label: 'UK' },
];

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

  const changeLanguage = (option: any) => {
    i18n.changeLanguage(option.value);
  };

  const defaultValueSelect = useMemo(() => options.find((op) => i18n.language?.includes(op.value)),
    [i18n.language]);

  return (
    <>
      <ThemeProvider theme={{ thema }}>
        <Navigation>
          <ButtonAdd onClick={changeShowFormAdd} type="button">{t('base.changePost')}</ButtonAdd>
          <ButtonAdd onClick={changeThema} type="button">{t('base.changeThema')}</ButtonAdd>
        </Navigation>
        { isShowFormAdd && (
          <FormAdd
            isShowFormAdd={isShowFormAdd}
            changeShowFormAdd={changeShowFormAdd}
          />
        )}
        <Posts />
        <FormsEdit />
        {defaultValueSelect && (
          <Select
            id={app.select}
            defaultValue={defaultValueSelect}
            options={options}
            onChange={changeLanguage}
          />
        )}
      </ThemeProvider>
    </>
  );
};
