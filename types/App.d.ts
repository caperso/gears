import React from 'react';
import './App.scss';
import { IRouteConfigs } from './config/index';
/**
 * returns nested routes
 * @param {IRouteConfigs} route
 * @returns
 */
export declare function RouteWithSubRoutes(route: IRouteConfigs): JSX.Element;
declare const _default: React.ComponentClass<Pick<import("react-router").RouteComponentProps<any, import("react-router").StaticContext, {} | null | undefined>, never>, any> & import("react-router").WithRouterStatics<React.FC<{}>>;
export default _default;
