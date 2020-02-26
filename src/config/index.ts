// components
import { ImagePreviewDemo } from 'components/image-preview/demo';
import { Levels } from 'components/levels/Levels';
import Component from 'pages/Component';
import Home from '../pages/Home';

export interface IRouteSubs {
  key: string;
  title: string;
  path: string;
  icon?: string;
  exact?: boolean;
  component: React.ComponentType<any>;
}

export interface IRouteConfigs {
  key: string;
  title: string;
  path: string;
  icon?: string;
  exact?: boolean;
  component: React.ComponentType<any>;
  inMenu?: boolean;
  hide?: boolean;
  routes?: Array<IRouteSubs>;
}

export const routeConfig: IRouteConfigs[] = [
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
      {
        key: 'image-preview',
        title: '图片预览 · ImagePreview',
        component: ImagePreviewDemo,
        path: '/comp/image-preview',
      },
      {
        key: 'levels',
        title: '阶级导航 · Levels',
        component: Levels,
        path: '/comp/levels',
      },
    ],
  },
];