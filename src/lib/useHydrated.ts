import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/** False during server render and hydration, true once the client has taken over. */
export function useHydrated() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}
