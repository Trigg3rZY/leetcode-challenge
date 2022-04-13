import { useMemo } from 'react';
import type { ForwardedRef } from 'react';
import { setRef } from './setRef';

// TODO: should be shift to a hook lib
export function useForkRef<InstanceA, InstanceB>(
  refA: ForwardedRef<InstanceA> | null,
  refB: ForwardedRef<InstanceB> | null
): ForwardedRef<InstanceA & InstanceB> | null {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
