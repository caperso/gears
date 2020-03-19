/// <reference types="react" />
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
export declare const routeConfig: IRouteConfigs[];
