import { useContext, useState, useImperativeHandle, useEffect} from 'react';
import { getNavlist, getPoster } from '../../utils/api';
// 路由
import { Link, useHistory } from 'react-router-dom'

// 文字图标
import { createFromIconfontCN, ExportOutlined, IeCircleFilled } from '@ant-design/icons';
// 菜单组件
import { Menu } from 'antd';

// 菜单组件样式
import './css/index.scss'

import { Userconfig } from '../index';
import { render } from '@testing-library/react';

function Navmenu(props) {
    // 路由
    const history = useHistory();
    // 父组件传入
    const stateUserconfig = useContext(Userconfig);
    // 当前组件状态
    const [loading, setLoading] = useState(false); // 加载动画
    const [menuData, setMenudata] = useState([]); // 菜单
    const [USER_CONFIG_THEME, setUserConfigTheme] = useState('dark'); // 主题
    const [USER_CONFIG_MODE, setUserConfigMode] = useState('inline'); // 菜单类型
    const [Inlineindent, setInlineindent] = useState(15); // 菜单缩进

    useEffect(() => {
        // 初始化查询菜单
        getMenuData(stateUserconfig)
    }, [])

    useImperativeHandle(props.cRef, () => ({
        // changeVal 就是暴露给父组件的方法
        changeVal: (newVal) => {
            setInlineindent(newVal)
        }
    }));

    /**
     * 用户配置
     */
    useEffect(() => {
        if (stateUserconfig) {
            const timer = setTimeout(() => {
                setUserConfigTheme(JSON.parse(stateUserconfig).theme)
                setUserConfigMode(JSON.parse(stateUserconfig).mode)
            }, 0)
            return ()=>{
                clearTimeout(timer);
            }
        }
    }, [stateUserconfig])

    /**
     * @author liuyaxuan
     * 菜单
     */
    function getMenuData(data) {
        setLoading(true);
        getNavlist('get', '/nav/list', 123).then(res => {
            setLoading(false);
            // 赋值菜单
            setMenudata(res);
            // 跳转到初始页
            history.push('overview');
        })
    }
    
    /**
     * @author liuyaxuan
     * 通过RenderMenu构建左侧菜单树
     * @param {*}
     */
    function RenderMenu () {
        const { SubMenu, Item } = Menu;
        // 判断是否是需要同时显示左侧和头部的导航菜单
        let isLeftAndTop = false;
        if (props.menuPositon == 'leftAndTop') {
            isLeftAndTop = true;
        }

        // 路由跳转
        function onHandleMenu (data) {
            history.push(data.key);
        }

        // 菜单Icon图标
        function iconFontRender(data) {
            return (<IeCircleFilled />)
        }

        // 获取子级路由菜单
        function getSubMenu (data) {
            return (
                <SubMenu key={data.path} icon={<ExportOutlined />} title={data.name} >
                    {
                        data.children && data.children.map((subitem, i) => (
                            subitem.children.length !== 0 ?
                                getSubMenu(subitem)
                            :
                                <Item key={subitem.path}>
                                    {subitem.name}
                                </Item>
                        ))
                    }
                </SubMenu>
            )
        }
    
        return (
            <Menu
                inlineIndent={ Inlineindent }
                theme={ USER_CONFIG_THEME }
                mode={ isLeftAndTop ? 'horizontal' : USER_CONFIG_MODE }
                defaultSelectedKeys={ ['overview'] }
                onClick={ onHandleMenu }
            >
                {
                    menuData && menuData.length ?
                        menuData.map((item, index) => (
                            item.children.length !== 0 ?
                                getSubMenu(item)
                            :
                                item.path !== 'unknow' ?
                                    <Item key={item.path} icon={iconFontRender()} >
                                        {item.name}
                                    </Item>
                                :
                                    null
                        ))
                    :
                        <div className="no-menu-data">暂无菜单</div>
                }
            </Menu>
        );
    }

    // 组件渲染
    return (
        <RenderMenu />
    )
}


export default Navmenu;