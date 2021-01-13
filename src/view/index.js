import React,{ createContext, useState, useRef, useEffect} from 'react';
import { Layout, Breadcrumb, Badge, Avatar, Image, Button } from 'antd';
// 菜单组件
import { Menu } from 'antd';
// 路由
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Routers from '../routers/routers';

// 文字图标
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Navmenu from './navigation/nav-menu';
import Login from './pages/login/index';
import Components from './pages/components/index';
import Overview from './pages/overview/index';
// scss
import './index.scss'

// 请求
import { getNavlist, getPoster } from '../utils/api';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

export const Userconfig = createContext();
const Index = props => {
    const [menuPositon, setMenuPostion] = useState('left'); // 菜单位置 left ,top ,leftAndTop
    const [collapsed, setCollapsed] = useState(false); // 左侧展开、收起
    const [userConfigData, setUserConfigData] = useState(''); // 当前用户配置信息
    const [USER_LAYOUT_THEME, setUserLayoutTheme] = useState('dark'); // Layout主题

    const childRef = useRef();
    useEffect(() => {
        getUserTheme();
    }, [])

    useEffect(() => {
        if (userConfigData) {
            setTimeout(() => {
                setUserLayoutTheme(JSON.parse(userConfigData).theme);
                setMenuPostion(JSON.parse(userConfigData).menuPostion);
            }, 0);
        }
    }, [userConfigData])
    
    function updateChildState() {
        // changeVal就是子组件暴露给父组件的方法
        childRef.current.changeVal(32);
    }
    function onCollapse() {
        setCollapsed(!collapsed);
        // 执行菜单组件中，菜单缩进的预定值
        updateChildState();
    };

    /**
     * @author liuyaxuan
     * 当前登录的用户配置
     */
     function getUserTheme() {
        const params = {}
        getPoster('get', '/user/config', params).then(res => {
            setUserConfigData(JSON.stringify(res))
        })
    }
    
    return (
        <Router>
            <Layout className="menuSider">
                <Sider theme={USER_LAYOUT_THEME} trigger={null} collapsible collapsed={collapsed}
                     style={ menuPositon == 'left' || menuPositon == 'leftAndTop' ? { display: 'inline-block' } : { display: 'none' }}
                >
                    <div className={USER_LAYOUT_THEME === 'light' ? 'logo-light' : 'logo-dark'}>标标标</div>
                    {/* 左侧菜单  */}
                    <div className="leftMenu">
                        <Button type="primary" onClick={onCollapse} style={{ width: '100%' }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Userconfig.Provider value={userConfigData}>
                            <Navmenu cRef={childRef} />
                        </Userconfig.Provider>
                    </div>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={ USER_LAYOUT_THEME === 'light' ? { padding: 0, background: '#fff' } : { padding: 0 }}>
                        {/* 当userConfigData中mode为horizontal时，显示头部Logo */}
                        <div
                            className={USER_LAYOUT_THEME === 'light' ? 'logo-light' : 'logo-dark'}
                            style={ menuPositon !== 'left' ? { display: 'inline-block', float: 'left', width: '100px' } : { display: 'none' }}
                        >标</div>
                        {/* 当userConfigData中mode为horizontal时，将左侧导航菜单置于头部横向菜单 */}
                        <div className="headMenu" style={ menuPositon !== 'left' ? { display: 'block', width: 'calc(100% - 150px)' } : { display: 'none' }}>
                            <Userconfig.Provider value={userConfigData}>
                                <Navmenu menuPositon={menuPositon} />
                            </Userconfig.Provider>
                        </div>
                        {/* 当前登录以及用户配置信息 */}
                        <div className="userConfig">
                            <Badge count={0}>
                                <Avatar src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} />
                            </Badge>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        {/* 面包屑 */}
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>1</Breadcrumb.Item>
                            <Breadcrumb.Item>2</Breadcrumb.Item>
                        </Breadcrumb> */}
                        {/* 内容主体 */}
                        <div className="site-layout-background" style={{ padding: 10, height: '100%', minWidth: '220px' }}>
                            {/* <Redirect from='' to='/Login' /> */}
                            {/* <Switch>
                                <Route path='/overview' component={Overview} />
                                <Route path='/components' component={Components} />
                            </Switch> */}
                            <Routers />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>2020-11-24 ***** ***** ****</Footer>
                </Layout>
            </Layout>
        </Router>
    );
}

export default Index;