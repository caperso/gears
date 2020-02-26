
import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../../App';
import './style.scss';

interface ICompProps {
  routes: any[];
}

const Component = ({ routes }: ICompProps) => {
  return (
    <div className="p-comp">
      <Switch>
        {routes.map((route: any) => (
          <RouteWithSubRoutes key={route.key} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default Component;