export default [
  {
    icon: 'el-icon-lx-home',
    index: '/index',
    title: '首页',
    subs: [
      {
        icon: 'el-icon-lx-home',
        index: '/index/dashboard',
        title: '首页'
      },
      {
        icon: 'el-icon-lx-cascades',
        index: '/index/table',
        title: '基础表格'
      },
      {
        icon: 'el-icon-lx-copy',
        index: '/index/tabs',
        title: 'tab选项卡'
      },
      {
        icon: 'el-icon-lx-emoji',
        index: '/index/icon',
        title: '自定义图标'
      }
    ]
  },
  {
    icon: 'el-icon-lx-calendar',
    index: '/form',
    title: '表单相关',
    subs: [
      {
        index: '/form/index',
        title: '基本表单'
      },
      {
        index: '/form/upload',
        title: '文件上传'
      }
    ]
  },
  {
    icon: 'el-icon-rank',
    index: '/drag',
    title: '拖拽组件',
    subs: [
      {
        index: '/drag/index',
        title: '拖拽列表'
      },
      {
        index: '/drag/dialog',
        title: '拖拽弹框'
      }
    ]
  },
  {
    icon: 'el-icon-lx-warn',
    index: '/permission',
    title: '错误处理',
    subs: [
      {
        index: '/permission/index',
        title: '权限测试'
      },
      {
        index: '/permission/404',
        title: '404页面'
      }
    ]
  }
];
