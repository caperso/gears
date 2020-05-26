import { useEffect, useMemo, useState } from 'react';

interface BaseInfo {
  id: number | null;
  name: string | null;
}

export interface Company extends BaseInfo {}
export interface Position extends BaseInfo {}
export interface User extends BaseInfo {
  age: number | null;
}

interface StoreProps {
  user: User | null;
  company: null | Company;
  position: Position | null;
}

const defaultStore = {
  user: null,
  company: null,
  position: null,
};

/**
 * useStore
 * 目的·使用contextApi和useState共享单项状态
 */
export function useDemoStore() {
  const [store, setStore] = useState<StoreProps>(defaultStore);

  const setter = useMemo(
    () => ({
      setUser(user: User) {
        setStore(s => {
          const updateState = { ...s };
          updateState.user = user;
          return updateState;
        });
      },

      setCompany(newCompany: Company | null) {
        setStore(s => {
          const updateState = { ...s };
          updateState.company = newCompany;
          return updateState;
        });
      },

      setPosition(position: Position | null) {
        setStore(s => {
          const updateState = { ...s };
          updateState.position = position;
          return updateState;
        });
      },
    }),
    [],
  );

  useEffect(() => {
    if (store.company) {
      // fetch new position
    } else {
      setter.setPosition(null);
    }
  }, [store.company]);

  return [store, setter] as const;
}

export default useDemoStore;
