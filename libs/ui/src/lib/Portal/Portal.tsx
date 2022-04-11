import {
  useState,
  useLayoutEffect,
  useEffect,
  forwardRef,
  ForwardedRef,
} from 'react';
import ReactDom from 'react-dom';

export interface PortalProps {
  container?: Element | (() => Element);
}

// useEffect instead of useLayoutEffect in ssr
const useSafeEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const Portal = forwardRef<Element, PortalProps>((props, ref) => {
  const { children, container } = props;

  const [mountNode, setMountNode] = useState<Element | null>(null);

  useSafeEffect(() => {
    setMountNode(getContainer(container) || document.body);
  }, [container]);

  useSafeEffect(() => {
    if (mountNode) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }
    return;
  }, [ref, mountNode]);

  // ReactFragment is typed differently in @types/react & @types/react-dom
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29307
  return mountNode ? ReactDom.createPortal(children as any, mountNode) : null;
});

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container;
}

function setRef<T>(ref: ForwardedRef<T>, target: T) {
  if (typeof ref === 'function') {
    ref(target);
  } else if (ref) {
    ref.current = target;
  }
}
