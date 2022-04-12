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
}
