import LogInOutFn from '@/function/LogInOut';
import userData from '@/store/user';
import ChangeMenu from '@/event/changeMenu';
import router from './index';

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // document.title = `${to.meta.title} | RPA实训平台`;
  LogInOutFn.getloginInfo();
  // console.log(to);
  if (userData.userInfo.name) {
    next();
    setTimeout(() => {
      ChangeMenu.$emit('routerChangeMenu', to);
    }, 30);
  } else {
    if (to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  }
});
