import { createSelector } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';

export const selectComments = createSelector(
  (state) => state.allComments,
  (state) => state.allUsers,
  (state, ids) => ids,
  (allComments, allUsers, commentsId) => commentsId.map(
    (id) => {
      const userId = allComments.entities[id].user;
      return { ...allComments.entities[id], user: allUsers.entities[userId] };
    },
  ),
);
