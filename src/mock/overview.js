import Mock from 'mockjs'

const Random = Mock.Random;

export default [
  {
    url: '/overview/cards',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: [
            {
                title: '表格',
                content: '表格组件',
                path: '/components/table'
            },
            {
                title: '下拉',
                content: '下拉组件',
                path: '/components/select'
            },
            {
                title: '树',
                content: '树组件',
                path: '/components/tree'
            },
            {
                title: '搜索',
                content: '搜索组件',
                path: '/components/tree'
            }
        ]
      }
    }
  }
]