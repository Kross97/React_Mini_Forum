import React from 'react';
import { useSelector } from 'react-redux';

export const User = (props) => {
  const { idSource } = props;

  const currentUser = useSelector((state) => state.allUsers.entities[idSource]);
  return (
    <span>{currentUser.name}</span>
  );
};
