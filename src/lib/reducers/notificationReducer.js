const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case '@notifications/SET':
      clearTimeout(state.timer);
      return [action.data.message, action.data.notifyType];
      //      return action.data.message;
    case '@notifications/REMOVE':
      return '';
    default:
      return state;
  }
};

export const removeNotification = () => ({
  type: '@notifications/REMOVE',
});

export const setNotification = (message, notifyType, timer) => async (dispatch) => {
  dispatch({
    type: '@notifications/SET',
    data: {
      message,
      notifyType,
      timer: setTimeout(() => {
        dispatch(removeNotification());
      }, timer * 1000),

    },
  });
};

export default notificationReducer;
