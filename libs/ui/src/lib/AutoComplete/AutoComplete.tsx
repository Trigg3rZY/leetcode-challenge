import {
  forwardRef,
  useEffect,
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
} from 'react';
import RcInput, { InputRef } from 'rc-input';
import { AutoCompleteOptionList } from './AutoCompleteOptionList';
import type { AutoCompleteProps, RefInput } from './types.AutoComplete';

import * as S from './styled.AutoComplete';

export const AutoComplete = forwardRef<RefInput, AutoCompleteProps>(
  (props, ref) => {
    const { options = [] } = props;

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

    return (
      <>
        <S.AutoComplete ref={rootRef}>
          <RcInput
            ref={anchorElRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setPopupOpen(!!options.length);
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
