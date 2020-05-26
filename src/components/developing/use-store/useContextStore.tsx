import React from 'react';

function useContextStore(children: React.ReactElement, statesAndSetters: any, alias?: string) {
  const context = React.createContext(null);

  if (alias) {
    context.displayName = alias;
  }

  return <context.Provider value={statesAndSetters}>{children}</context.Provider>;
}

export default useContextStore;
