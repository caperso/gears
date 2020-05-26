import React from 'react';
import useContextStore from '../useContextStore';
import { useDemoStore } from './useDemoStore';
import { UserCenter } from './UserCenter';
import { UserCompanies } from './UserCompanies';

const ContextHookDemo = () => {
  const [state, setter] = useDemoStore();
  console.log(state);

  const HookDemo = (
    <div>
      {state.company ? `Now ${state.user?.name || 'user'} is at company: ${state.company} !~~~` : 'Select a company'}
      <UserCenter></UserCenter>
      <UserCompanies></UserCompanies>
    </div>
  );

  return useContextStore(HookDemo, state);
};

export default () => <ContextHookDemo />;
