<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">代码实现</div>
    <div class="top-nav">
      <el-menu
        v-if="hasMenu"
        :default-active="onRoutes"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menulist"
          :key="item.index"
          :index="item.index"
          >{{ item.title }}</el-menu-item
        >
      </el-menu>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
            effect="dark"
            :content="fullscreen ? `取消全屏` : `全屏`"
            placement="bottom"
          >
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/form">
              <el-dropdown-item>基本表单</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided command="loginout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import ChangeMenu from '@/event/changeMenu';

export default {
  props: ['hasMenu', 'menulist'],
  data() {
    return {
      collapse: false,
      fullscreen: false,
      selectRoute: null,
      name: 'linxin',
      message: 2
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem('ms_username');
      return username ? username : this.name;
    },
    onRoutes() {
      const index = '/' + this.$route.path.split('/')[1];
      return index;
    }
  },
  methods: {
    upMenu(path) {
      const index = '/' + this.$route.path.split('/')[1];
      if (index !== this.selectRoute) {
        this.handleSelect(this.onRoutes, null, null, true);
      }
    },
    handleSelect(e, list, vItem, nopush) {
      this.selectRoute = e;
      const parent = this.menulist.filter(item => {
        return item.index == e;
      });
      if (parent[0] && parent[0].subs && parent[0].subs.length) {
        const children = parent[0].subs;
        ChangeMenu.$emit('ChangeLeftMenu', children);
        ChangeMenu.$emit('HidenLeftMenu', false);
      } else {
        ChangeMenu.$emit('ChangeLeftMenu', []);
        ChangeMenu.$emit('HidenLeftMenu', true);
      }
      if (!nopush) {
        if (e !== this.onRoutes) this.$router.push(e);
      }
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username');
        this.$router.push('/login');
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      ChangeMenu.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  created() {
    ChangeMenu.$on('routerChangeMenu', this.upMenu);
  },
  destroyed() {
    ChangeMenu.$off('routerChangeMenu', this.upMenu);
  },
  mounted() {
    if (this.hasMenu) {
      this.handleSelect(this.onRoutes, null, null, true);
    }
    if (document.body.clientWidth < 960) {
      this.collapseChage();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item.is-active {
  color: #409eff;
}
.el-menu--horizontal > .el-menu-item {
  height: 70px;
  line-height: 70px;
}
.header {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #333;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 186px;
  line-height: 70px;
}
.header .top-nav {
  flex: 1;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #111;
}
.btn-bell .el-icon-bell {
  color: #111;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #111;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
