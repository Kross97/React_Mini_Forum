// import { ThunkAction } from 'redux-thunk';
// import { Action } from '@reduxjs/toolkit';
// import { IAppState } from '../IApplication';
// import { store } from '../index';

// export type StoreDispatch = typeof store.dispatch;

// export type AppThunk = ThunkAction<void, IAppState, unknown, Action<null>>;

export interface IUser {
  id: number,
  name: string,
}

export interface IComment {
  id: number,
  text: string,
  user: IUser,
}

export interface IPostForServer {
  id: number,
  thema: string,
  text: string,
  user: IUser,
  comments: IComment[],
}

export interface IDataPost {
  id: number,
  idUser: number,
  postPatch: {
    thema: string,
    text: string,
    user: {
      name: string,
    },
  },
}

export interface IDataComment {
  id: number,
  idUser: number,
  commentPatch: {
    text: string,
    user: {
      name: string,
    },
  },
}
