import type { CSSProperties, MouseEventHandler } from 'react';

interface Option {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  options?: Option[];
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export interface AutoCompleteOptionListProps {
  options?: Option[];
  onSelect: (value: string) => void;
  style?: CSSProperties;
  onMouseDown?: MouseEventHandler;
}

export interface RefInput {
  focus(): void;
  blur(): void;
}
