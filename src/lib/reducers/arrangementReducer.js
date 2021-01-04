import arrangementService from '../services/arrangement';

const arrangementReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.data;
    default: return state;
  }
};

export const getAllArrangements = () => {
  return async (dispatch) => {
    const data = await arrangementService.getAllArrangements();
    dispatch({
      type: 'GET_ALL',
      data,
    });
  }
}

export default arrangementReducer;
