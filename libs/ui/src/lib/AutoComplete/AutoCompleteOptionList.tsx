import { useRef } from 'react';
import List from 'rc-virtual-list';
import type { ListRef } from 'rc-virtual-list';
import type { AutoCompleteOptionListProps } from './types.AutoComplete';

export const AutoCompleteOptionList = (props: AutoCompleteOptionListProps) => {
  const { options = [], onSelect } = props;

  const listRef = useRef<ListRef>(null);

  return (
    <>
      <div role="listbox"></div>
      <List component={'ul'} itemKey="value" ref={listRef} data={options}>
        {(option, index, { style }) => {
          return (
            <li
              onClick={() => {
                onSelect(option.value);
              }}
              style={style}
            >
              {option.label}
            </li>
          );
        }}
      </List>
    </>
  );
};
