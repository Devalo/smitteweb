import arrangementService from '../services/arrangement';

const participantReducer = (state = [], action) => {
  switch (action.type) {
    case '@participants/GET_ALL':
      return action.data;
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

export default participantReducer;
