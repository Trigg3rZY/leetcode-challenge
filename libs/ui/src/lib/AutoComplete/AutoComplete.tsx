import {
  forwardRef,
  useEffect,
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import type { ChangeEvent } from 'react';
import RcInput, { InputRef } from 'rc-input';
import { AutoCompleteOptionList } from './AutoCompleteOptionList';
import type { AutoCompleteProps, RefInput } from './types.AutoComplete';

import * as S from './styled.AutoComplete';

export const AutoComplete = forwardRef<RefInput, AutoCompleteProps>(
  (props, ref) => {
    const { options = [], onSearch } = props;

    const rootRef = useRef<HTMLDivElement>(null);
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

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onSearch?.(newValue);
        if (newValue !== '') {
          setPopupOpen(true);
        }
      },
      [onSearch]
    );

    return (
      <>
        <S.AutoComplete ref={rootRef}>
          <RcInput
            ref={anchorElRef}
            value={inputValue}
            onChange={handleInputChange}
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
              onSelect={(value) => {
                setInputValue(value);
                setPopupOpen(false);
              }}
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
