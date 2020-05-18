import { useMemo, useState } from 'react';

/**
 * useStore
 * 目的·使用contextApi和useState共享单项状态
 */
function useStore() {
  const [store, setStore] = useState();

  const setter = useMemo(() => ({}), []);

  const useStore = [];

  return [store, setter] as const;
}

export default useStore;
