import { Icon, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import './App.less';
import { IRouteCfgProps, routeCfg } from './config/index';
import { NotFound } from './pages/NotFound';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export function RouteWithSubRoutes(route: IRouteCfgProps) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);

    const menuTitle = (routeItem: IRouteCfgProps) => (
        <span>
            {routeItem.icon && <Icon type={routeItem.icon} />}
            <span>{routeItem.title}</span>
        </span>
    );

    return (
        <div className="App">
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} defaultOpenKeys={['comp']}>
                        {routeCfg.map(routeItem => {
                            return routeItem.routes ? (
                                <SubMenu key={routeItem.key} title={menuTitle(routeItem)}>
                                    {routeItem.routes.map(subItem => (
                                        <Menu.Item key={subItem.key}>
                                            <NavLink to={subItem.path}>
                                                {subItem.icon && <Icon type={subItem.icon} />}
                                                <span>{subItem.title}</span>
                                            </NavLink>
                                        </Menu.Item>
                                    ))}
                                </SubMenu>
                            ) : routeItem.component ? (
                                <Menu.Item key={routeItem.key}>
                                    <NavLink to={routeItem.path}>
                                        {routeItem.icon && <Icon type={routeItem.icon} />}
                                        <span>{routeItem.title}</span>
                                    </NavLink>
                                </Menu.Item>
                            ) : null;
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
                    </Header>
                    <Content className="App-content">
                        <Switch>
                            {routeCfg.map(route => (
                                <RouteWithSubRoutes key={route.key} {...route} />
                            ))}
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default withRouter(App);
