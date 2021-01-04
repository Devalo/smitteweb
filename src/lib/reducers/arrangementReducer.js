import arrangementService from '../services/arrangement';

const arrangementReducer = (state = [], action) => {
  switch (action.type) {
    case '@arrangements/GET_ALL':
      return action.data;
    case '@arrangements/GET_ONE':
      return action.data;
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

export const getOneArrangement = (listId) => {
  return async (dispatch) => {
    const data = await arrangementService.getOneArrangement(listId);
    dispatch({
      type: '@arrangements/GET_ONE',
      data,
    });
  };
};

export default arrangementReducer;
