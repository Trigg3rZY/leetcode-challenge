import type { ForwardedRef } from 'react';

export function setRef<T>(ref: ForwardedRef<T>, target: T) {
  if (typeof ref === 'function') {
    ref(target);
  } else if (ref) {
    ref.current = target;
  }
}
