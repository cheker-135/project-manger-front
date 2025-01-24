import axios from 'axios';
import { USER_NOTIFICATIONS_UPDATE } from '../constants/userConstants';




export const getNotifications = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo, notifications  },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get('/api/users/notifications', config);
  dispatch({ type: USER_NOTIFICATIONS_UPDATE, payload: data.notifications });
  console.log("notifications:",data.notifications);
};
