/* eslint-disable import/no-named-as-default-member */
/* eslint-disable arrow-body-style */
import arrangementService from '../services/arrangement';
import { setNotification } from './notificationReducer';

const arrangementReducer = (state = [], action) => {
  switch (action.type) {
    case '@arrangements/GET_ALL':
      return action.data;
    case '@arrangements/GET_ONE':
      return action.data;
    case '@arrangements/DELETE': {
      const remaining = state.filter((arrangement) => arrangement.id !== action.data);
      return remaining;
    }
    default: return state;
  }
};

export const getAllArrangements = () => {
  return async (dispatch) => {
    const data = await arrangementService.getAllArrangements();
    dispatch({
      type: '@arrangements/GET_ALL',
      data,
    });
  };
};

export const getOneArrangement = (listName) => {
  return async (dispatch) => {
    const data = await arrangementService.getOneArrangement(listName);
    dispatch({
      type: '@arrangements/GET_ONE',
      data,
    });
  };
};

export const addArrangement = (userId, callback) => {
  return async (dispatch) => {
    const data = await arrangementService.addArrangement(userId, callback);
    dispatch({
      type: '@arrangements/ADD_ONE',
      data,
    });
  };
};

export const deleteArrangement = (userId, listId) => {
  return async (dispatch) => {
    const res = await arrangementService.deleteArrangement(userId, listId);
    if (res === true) {
      dispatch({
        type: '@arrangements/DELETE',
        data: listId,
      });
    } else {
      setNotification('Noe gikk galt', 'danger', 2);
    }
  };
};

export default arrangementReducer;
