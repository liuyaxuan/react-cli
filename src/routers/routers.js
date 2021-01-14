/**
 * @flow
 */
import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { getNavlist, getPoster } from '../utils/api';

// 主页面
import Index from '../view/index';
import Components from '../view/pages/components/index';
import Overview from '../view/pages/overview/index';

const routersPath = [];
const Routers = () => {
  let RouterConfig = [
    {
      title: '视图',
      path: '/overview',
      component: Overview
    },
    {
      title: '地图',
      path: '/components',
      component: Components
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
    console.log(url)
    let bool = false
    if (routersPath.indexOf(url) !== -1) {
      bool = true
    } else {
      bool = false
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
                    <Redirect to={{
                      pathname: '/404',
                      state: { from: props.location }
                  }} />
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
