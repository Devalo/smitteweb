import arrangementService from '../services/arrangement';

const arrangementReducer = (state = [], action) => {
  console.log(action.data);
  switch (action.type) {
    case 'GET_ALL':
      return action.data;
    default: return state;
  }
};

export const getAllArrangements = () => {
  return async (dispatch) => {
    console.log('ok')
    const data = await arrangementService.getAllArrangements();
    dispatch({
      type: 'GET_ALL',
      data,
    });
  }
}

export default arrangementReducer;
