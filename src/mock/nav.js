export default [
  {
    url: '/nav/list',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: [
          {
              name: '视图',
              icon: 'icon-tuichu',
              path: "overview",
              key: '1',
              children: []
          },
          {
              name: '地图',
              icon: 'icon-tuichu',
              path: "components",
              key: '2',
              children: []
          },
          {
            name: '组件',
            icon: 'icon-tuichu',
            path: "",
            key: '3',
            children:[
              {
                name: '模板-1',
                icon: 'icon-tuichu',
                path: "",
                key: '3-1',
                children: [
                  {
                    name: '模板-1-1',
                    icon: 'icon-tuichu',
                    path: "",
                    key: '3-1-1',
                    children: [
                      {
                        name: '模板-1-1-1',
                        icon: 'icon-tuichu',
                        path: "",
                        key: '3-1-1-1',
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                name: '模板-2',
                icon: 'icon-tuichu',
                path: "",
                key: '3-2',
                children: []
              },
            ]
          },
          {
              name: '关于',
              icon: 'icon-tuichu',
              path: "about",
              key: '4',
              children:[]
          },
          {
            name: '404',
            icon: 'icon-tuichu',
            path: "unknow",
            key: '5',
            children:[]
          }
        ]
      }
    }
  }
]