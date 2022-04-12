import { forwardRef, useEffect, useState, useMemo, useRef } from 'react';
import RcInput, { InputRef } from 'rc-input';
import { AutoCompleteOptionList } from './AutoCompleteOptionList';
import type { AutoCompleteProps } from './types.AutoComplete';

import * as S from './styled.AutoComplete';

export const AutoComplete = forwardRef<HTMLDivElement, AutoCompleteProps>(
  (props, ref) => {
    const { options = [] } = props;

    const anchorElRef = useRef<InputRef>(null);
    const anchorEl = anchorElRef.current;

    const [popupOpen, setPopupOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      if (options.length) {
        setPopupOpen(true);
      } else {
        setPopupOpen(false);
      }
    }, [options.length]);

    const filteredOptions = useMemo(
      () => options.filter(({ value }) => value.indexOf(inputValue) !== -1),
      [inputValue, options]
    );

    return (
      <>
        <S.AutoComplete ref={ref}>
          <RcInput
            // ref={anchorElCallbackRef}
            ref={anchorElRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setPopupOpen(!!options.length);
            }}
            onBlur={() => setPopupOpen(false)}
          />
        </S.AutoComplete>
        {popupOpen && anchorEl && (
          <S.AutoCompletePopper anchorEl={anchorEl?.input || null} open>
            <AutoCompleteOptionList
              options={filteredOptions}
              onSelect={(value) => {
                setInputValue(value);
                setPopupOpen(false);
              }}
            />
          </S.AutoCompletePopper>
        )}
      </>
    );
  }
);
