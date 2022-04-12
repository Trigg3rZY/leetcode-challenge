import type { CSSProperties } from 'react';

interface Option {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  options?: Option[];
  onSearch?: (value: string) => void;
}

export interface AutoCompleteOptionListProps {
  options?: Option[];
  onSelect: (value: string) => void;
  style?: CSSProperties;
}

export interface RefInput {
  focus(): void;
  blur(): void;
}
