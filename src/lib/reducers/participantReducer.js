import { setNotification } from './notificationReducer';
import arrangementService from '../services/arrangement';

const participantReducer = (state = [], action) => {
  switch (action.type) {
    case '@participants/GET_ALL':
      return action.data;
    case '@participants/DELETE': {
      const remaining = state.filter((participant) => participant.id !== action.data);
      return remaining;
    }
    default:
      return state;
  }
};

export const getAllParticipants = (listId) => {
  return async (dispatch) => {
    const data = await arrangementService.getAllParticipants(listId);
    dispatch({
      type: '@participants/GET_ALL',
      data,
    });
  };
};

export const deleteParticipant = (listId, partId) => {
  // Sender en request til service for sletting av arrangement.
  // Venter på å motta bekreftelse 'true' fra service, for så å dispatche
  // en delete til stor
  return async (dispatch) => {
    const res = await arrangementService.deleteParticipant(listId, partId);
    if (res === true) {
      dispatch({
        type: '@participants/DELETE',
        data: partId,
      });
    } else {
      setNotification('Noe gikk galt', 'danger', 2);
    }
  };
};

export default participantReducer;
