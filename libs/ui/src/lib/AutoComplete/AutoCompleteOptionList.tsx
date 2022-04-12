import { useRef } from 'react';
import List from 'rc-virtual-list';
import * as S from './styled.AutoComplete';
import type { ListRef } from 'rc-virtual-list';
import type { AutoCompleteOptionListProps } from './types.AutoComplete';

export const AutoCompleteOptionList = (props: AutoCompleteOptionListProps) => {
  const { options = [], onSelect, style, onMouseDown } = props;

  const listRef = useRef<ListRef>(null);

  return (
    <S.AutoCompleteOptionList onMouseDown={onMouseDown}>
      <div className="auto-complete-listbox" role="listbox" />
      <List
        className="auto-complete-option-list"
        style={style}
        itemKey="value"
        height={Math.min(320, options.length * 22)}
        ref={listRef}
        data={options}
      >
        {(option, _index, { style }) => {
          return (
            <div
              className="auto-complete-option-item"
              onClick={() => {
                onSelect(option.value);
              }}
              style={style}
            >
              {option.label}
            </div>
          );
        }}
      </List>
    </S.AutoCompleteOptionList>
  );
};
