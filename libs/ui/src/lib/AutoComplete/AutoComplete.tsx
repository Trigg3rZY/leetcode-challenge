import {
  forwardRef,
  useEffect,
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
} from 'react';
import type { ChangeEvent } from 'react';
import RcInput, { InputRef } from 'rc-input';
import { AutoCompleteOptionList } from './AutoCompleteOptionList';
import type { AutoCompleteProps, RefInput } from './types.AutoComplete';

import * as S from './styled.AutoComplete';

export const AutoComplete = forwardRef<RefInput, AutoCompleteProps>(
  (props, ref) => {
    const { options = [], onSearch, value, onChange } = props;

    const rootRef = useRef<HTMLDivElement>(null);
    const anchorElRef = useRef<InputRef>(null);
    const anchorEl = anchorElRef.current;

    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
      if (options.length) {
        setPopupOpen(true);
      } else {
        setPopupOpen(false);
      }
    }, [options.length]);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          anchorElRef.current?.focus();
        },
        blur() {
          anchorElRef.current?.blur();
        },
      }),
      []
    );

    const [inputValue, setInputValue] = useState('');

    if (typeof value !== 'undefined' && value !== inputValue) {
      // derived state
      setInputValue(value);
    }

    const filteredOptions = useMemo(
      () => options.filter(({ value }) => value.indexOf(inputValue) !== -1),
      [inputValue, options]
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (typeof value === 'undefined') {
        // 非受控
        setInputValue(newValue);
      }
      onChange?.(newValue);
      if (newValue !== '') {
        setPopupOpen(true);
      }
    };

    const handleSelectOption = (inputValue: string) => {
      if (typeof value === 'undefined') {
        // 非受控
        setInputValue(inputValue);
      } else {
        // 受控
        onChange?.(inputValue);
      }
      setPopupOpen(false);
    };

    return (
      <>
        <S.AutoComplete ref={rootRef}>
          <RcInput
            role="combobox"
            type="search"
            ref={anchorElRef}
            value={inputValue}
            onChange={handleInputChange}
            onInput={() => {
              onSearch?.(anchorElRef.current?.input?.value || '');
            }}
            onFocus={() => {
              setPopupOpen(true);
            }}
            onBlur={() => {
              setPopupOpen(false);
            }}
          />
        </S.AutoComplete>
        {popupOpen && anchorEl && !!filteredOptions.length && (
          <S.AutoCompletePopper anchorEl={anchorEl?.input || null} open>
            <AutoCompleteOptionList
              options={filteredOptions}
              onSelect={handleSelectOption}
              onMouseDown={(e) => {
                // do not blur input when select an option
                e.preventDefault();
              }}
              style={{
                width: rootRef.current ? rootRef.current.clientWidth : 'auto',
              }}
            />
          </S.AutoCompletePopper>
        )}
      </>
    );
  }
);
