function useContextStore(children: React.ReactChildren, statesAndSetters: any, alias?: string) {
  const context = React.createContext(null);

  if (alias) {
    context.displayName = alias;
  }

  return <context.Provider value={statesAndSetters}>{children}</context.Provider>;
}
