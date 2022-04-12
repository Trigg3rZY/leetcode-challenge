import { forwardRef, ReactNode, useCallback, useState } from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '../Portal';
import type { Placement } from '@popperjs/core';

export interface PopperProps {
  anchorEl: Element | null;
  open?: boolean;
  getPopupContainer?: () => Element;
  placement?: Placement;
  children?: ReactNode;
  className?: string;
}

const PopperTooltip = forwardRef<
  Element,
  Omit<PopperProps, 'getPopupContainer'>
>((props, ref) => {
  const { children, placement, anchorEl, open, className } = props;

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const popperElementCallbackRef = useCallback(
    (el: HTMLDivElement | null) => setPopperElement(el),
    []
  );

  const popper = usePopper(anchorEl, open ? popperElement : null, {
    placement,
  });

  return (
    <div
      className={className}
      ref={popperElementCallbackRef}
      style={popper.styles['popper']}
      role="tooltip"
      {...popper.attributes['popper']}
    >
      {children}
    </div>
  );
});

export const Popper = forwardRef<Element, PopperProps>((props, ref) => {
  const { getPopupContainer, children, ...tooltipProps } = props;

  const container = getPopupContainer?.() || document.body;

  return (
    <Portal container={container}>
      <PopperTooltip {...tooltipProps}>{children}</PopperTooltip>
    </Portal>
  );
});
