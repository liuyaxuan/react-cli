/**
 * @flow
 */
import React from 'react'
import Routers from './routers'
import App from './containers'
import OverView from './pages/overview/index'

const getAppId = ({ history }) => {
  console.log('设置appId');
  const { search } = history.location
  if (search.indexOf('appId') !== -1) {
    const appId = search.split('appId=')[1];
    sessionStorage.setItem('appId', appId)
  }
  // history.replace(`${ROUTE_PREFIX}/overview`)
  history.replace(`/overview`)
  return null
}

const jumpToLogin = ({ history }) => {
  const appId = sessionStorage.getItem('appId')
  if (!appId) {
    // history.replace(`${ROUTE_PREFIX}/oasis/login.html`)
    // history.replace(`/oasis/login.html`)
  }
  return null
}
export const routerConfig: RouterConfig = [
  {
    name: '概览',
    classname: 'dashboard',
    router: { path: 'overview', component: OverView },
  },
  {
    name: '管理',
    classname: 'employee',
    router: { path: 'staffManagement', component: StaffList },
    subRouter: [
      { path: 'staffManagement/addStaff', component: AddStaff },
    ],
  },
  {
    name: '监控',
    classname: 'security',
    router: { path: 'securityMonitor', component: securityMonitor },
  },
]

const getRouters = (config: RouterConfig) => config.map((items) => {
  const { children } = items
  let routers = []
  if (children) {
    routers = children.map(child => setRoute(child));
  } else {
    routers = setRoute(items);
  }
  return routers;
})

const setRoute = (item: Object) => {
  const { router, subRouter } = item;
  const routers = subRouter ?
    subRouter.map(route => <Route key={route.path} path={`${ROUTE_PREFIX}/${route.path}`} exact component={route.component} />) :
    [];
  router && routers.push(<Route key={router.path} path={`${ROUTE_PREFIX}/${router.path}`} exact component={router.component} />);
  return routers;
}

const routers = () => (
  <Router>
    <Route
      path={`${ROUTE_PREFIX}`}
      component={props => (
        <App {...props}>
          <Switch>
            {getRouters(routerConfig)}
            <Route
              path={`${ROUTE_PREFIX}`}
              exact
              component={withRouter(getAppId)}
            />
            <Redirect from={`${ROUTE_PREFIX}`} to={`${ROUTE_PREFIX}/overview`} />
            <Route component={() => <div>加载中...</div>} />
          </Switch>
          <Route component={withRouter(jumpToLogin)} />
        </App>
      )}
    />
  </Router>
)

export default routers;
