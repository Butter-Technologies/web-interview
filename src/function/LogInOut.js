import userData from '../store/user';

export default {
  logOutFn: function () {
    localStorage.removeItem('ms_username');
    localStorage.removeItem('is_teacher');
    userData.userInfo = {
      ...userData.userInfo,
      name: 'null'
    };
  },
  getloginInfo: function () {
    const role = localStorage.getItem('ms_username');
    userData.userInfo = {
      ...userData.userInfo,
      name: role
    };
  },
  setLoginInfo: function () {
    localStorage.setItem('ms_username', userData.userInfo.name);
  }
};
