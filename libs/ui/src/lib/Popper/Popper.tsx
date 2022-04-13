import { forwardRef, ReactNode, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '../Portal';
import { setRef } from '../utils/setRef';
import { useForkRef } from '../utils/useForkRef';
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
  HTMLDivElement,
  Omit<PopperProps, 'getPopupContainer'>
>((props, ref) => {
  const { children, placement, anchorEl, open, className } = props;
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);

  const popperRef = useRef<HTMLDivElement>(null);
  const containerRef = useForkRef(popperRef, ref);
  const popper = usePopper(anchorEl, open ? popperEl : null, {
    placement,
  });

  return (
    <div
      className={className}
      ref={(el) => {
        setRef(containerRef, el);
        setPopperEl(el);
      }}
      style={popper.styles['popper']}
      role="tooltip"
      {...popper.attributes['popper']}
    >
      {children}
    </div>
  );
});

export const Popper = forwardRef<HTMLDivElement, PopperProps>((props, ref) => {
  const { getPopupContainer, children, ...tooltipProps } = props;

  const container = getPopupContainer?.() || document.body;

  return (
    <Portal container={container}>
      <PopperTooltip ref={ref} {...tooltipProps}>
        {children}
      </PopperTooltip>
    </Portal>
  );
});
