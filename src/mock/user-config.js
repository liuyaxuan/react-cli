import Mock from 'mockjs'

const Random = Mock.Random;

export default [
  {
    url: '/user/config',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          collapsed: 'true', // 左侧导航菜单Sider是否展开
          theme: 'dark', // dark | light
          mode: 'inline', // vertical | horizontal | inline
          menuPostion: 'left', // (left, top, leftAndTop) 菜单位置，当menuPostion设置为top时，mode应为horizontal，设置为leftAndTop时，则既有左侧导航菜单又有头部导航菜单，并且此时在渲染menu菜单时，会自动把横向菜单的mode改为horizontal
        }
      }
    }
  }
]