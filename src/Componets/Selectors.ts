import { createSelector } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';
import { IAppState } from '../IApplication';

export const selectComments = createSelector(
  (state: IAppState) => state.allComments,
  (state: IAppState) => state.allUsers,
  (state: IAppState, ids: number[]) => ids,
  (allComments, allUsers, commentsId) => commentsId.map(
    (id) => {
      const userId = allComments?.entities?.[id]?.user;
      return { ...allComments.entities[id], user: allUsers.entities?.[userId as number] };
    },
  ),
);
