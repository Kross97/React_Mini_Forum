import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../IApplication';

interface IUserProps {
  idSource: number,
}

export const User = (props: IUserProps) => {
  const { idSource } = props;

  const currentUser = useSelector((state: IAppState) => state.allUsers.entities[idSource]);
  return (
    <span>{currentUser?.name}</span>
  );
};
