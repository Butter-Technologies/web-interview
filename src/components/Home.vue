<template>
  <div class="wrapper">
    <v-head :hasMenu="headerHasMenu" :menulist="menulist"></v-head>
    <div class="main-conetnt">
      <div
        v-if="!hidenMenu"
        class="sider-box"
        :class="{'content-collapse': collapse}"
      >
        <v-sidebar
          :isHaderHasMenu="headerHasMenu"
          :menulist="siderMenu"
        ></v-sidebar>
      </div>
      <div class="flex-content-box">
        <div class="content-box" :class="{'content-collapse': collapse}">
          <div class="content">
            <transition name="move" mode="out-in">
              <router-view></router-view>
            </transition>
            <el-backtop target=".content"></el-backtop>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import ChangeMenu from '@/event/changeMenu';
import menuLitst from '@/store/menu';

export default {
  name: 'Teacher',
  data() {
    return {
      collapse: false,
      hidenMenu: false,
      headerHasMenu: true,
      menulist: menuLitst,
      siderMenu: []
    };
  },
  components: {
    vHead,
    vSidebar
  },
  created() {
    ChangeMenu.$on('collapse-content', msg => {
      this.collapse = msg;
    });
    ChangeMenu.$on('HidenLeftMenu', msg => {
      // console.log(msg);
      this.hidenMenu = msg;
    });
    ChangeMenu.$on('ChangeLeftMenu', msg => {
      // console.log(msg);
      this.siderMenu = msg;
      setTimeout(() => {
        ChangeMenu.$emit('collapse', this.collapse);
      });
    });
    if (!this.headerHasMenu) {
      this.siderMenu = menuLitst;
    }
  }
};
</script>
<style lang="scss" scoped>
.sider-box {
  position: relative;
  width: 250px;
  -webkit-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
}
.sider-box.content-collapse {
  width: 65px;
}

.flex-content-box {
  flex: 1;
  position: relative;
}
.main-conetnt {
  display: flex;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
