/**
 * @flow
 */
import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { getNavlist, getPoster } from '../utils/api';

// 主页面
import Index from '../view/index';
import Map from '../view/pages/map/index';
import Components from '../view/pages/components/index';
import Overview from '../view/pages/overview/index';
import About from '../view/pages/about/about';
import Unknow from '../view/pages/404/index';

const routersPath = [];
const Routers = () => {
  let RouterConfig = [
    {
      title: '视图',
      path: '/overview',
      component: Overview
    },
    {
      title: '组件',
      path: '/components',
      component: Components
    },
    {
      title: '地图',
      path: '/map',
      component: Map
    },
    {
      title: '关于',
      path: '/about',
      component: About
    },
    {
      title: '404',
      path: '/unknow',
      component: Unknow
    },
  ]

  useEffect(() => {
    // 获取需要配置路由的所有菜单
    getNavlist('get', '/nav/list', 123).then(res => {
      getRouterPath(res);
    })
  }, [])

  // 遍历菜单中的path
  function getRouterPath(data) {
    for (let i=0; i<data.length; i++) {
      if (data[i].children.length == 0) {
        if (data[i].path !== '') {
          routersPath.push('/'+data[i].path)
        }
      } else {
        getRouterPath(data[i].children)
      }
    }
  }

  /**
   * 路由守卫，验证登录
   * @function {*}
   */
  function proving(url) {
    let bool = false
    if (routersPath.length > 0) {
      if (routersPath.indexOf(url) !== -1) {
        bool = true
      }
    }
    return bool;
  }
  return (
    <Switch>
      {
        RouterConfig.map((item,index)=>{
          return (
            <Route 
              key={index} 
              exact 
              path={item.path}
              // component={item.component}
              render={
                props=>( 
                  proving(item.path) ? (<item.component {...props} />)
                    :
                    <div className="loading-page">载入中...</div>
                    // <Redirect to="/unknow" />
                ) 
              }
            />
          )
        })
      }
    </Switch>
  )
}

export default Routers;
