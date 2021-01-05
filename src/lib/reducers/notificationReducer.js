const notificationReducer = (state = '', action) => {
  // ved @notifications/SET returneres et tuple
  // med beskjed og bootstrap-class
  switch (action.type) {
    case '@notifications/SET':
      clearTimeout(state.timer);
      return [action.data.message, action.data.notifyType];
    case '@notifications/REMOVE':
      return '';
    default:
      return state;
  }
};

const removeNotification = () => ({
  type: '@notifications/REMOVE',
});

// Action dispatcher som dispatcher en melding som varer i n sekunder
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
