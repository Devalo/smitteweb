
const testReducer = (state = [], action) => {
  switch (action.type) {
    case 'TEST':
      return action.data;
    default:
      return state;
  }
};

export const getTest = () => {
  return async (dispatch) => {
    dispatch({
      type: 'TEST',
      data: 'BESKJED',
    });
  }
}

export default testReducer;
