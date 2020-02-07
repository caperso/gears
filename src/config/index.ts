// components
import { EmptyLineDemo } from '../components/empty-line/demo';
import { Component } from '../pages/Component';
import Home from '../pages/Home';


export interface IRouteSubProps {
  key: string;
  title: string;
  path: string;
  icon?: string;
  exact?: boolean;
  component: React.ComponentType<any>;
}

export interface IRouteCfgProps {
  key: string;
  title: string;
  path: string;
  icon?: string;
  exact?: boolean;
  component: React.ComponentType<any>;
  inMenu?: boolean;
  hide?: boolean;
  routes?: Array<IRouteSubProps>;
}

export const routeCfg: IRouteCfgProps[] = [
  {
    key: 'home',
    icon: 'home',
    title: '首页',
    exact: true,
    component: Home,
    inMenu: true,
    path: '/',
  },
  {
    key: 'comp',
    icon: 'gold',
    title: '组件',
    inMenu: true,
    component: Component,
    path: '/comp',
    routes: [
    //   {
    //     key: 'card',
    //     title: '卡片·Card',
    //     component: Card,
    //     path: '/comp/card',
    //   },
    //   {
    //     key: 'descriptions',
    //     title: '简介·Descriptions',
    //     component: Descriptions,
    //     path: '/comp/descriptions',
    //   },
      {
        key: 'empty-line',
        title: '空行·EmptyLine',
        component: EmptyLineDemo,
        path: '/comp/empty-line',
      },
    ],
  },
];