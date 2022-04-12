import styled from 'styled-components';
import { Popper } from '../Popper';

export const AutoComplete = styled.div`
  display: inline-block;
`;

export const AutoCompletePopper = styled(Popper).attrs({
  role: 'presentation',
})`
  margin: 0;
  color: #000000d9;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  position: absolute;
  top: -9999px;
  left: -9999px;
  z-index: 1050;
  box-sizing: border-box;
  padding: 4px 0;
  overflow: hidden;
  font-size: 14px;
  font-variant: initial;
  background-color: #fff;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
`;

export const AutoCompleteOptionList = styled.div`
  .auto-complete-listbox {
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .auto-complete-option-list {
    box-sizing: border-box;
    padding: 4px 0;

    .auto-complete-option-item {
      padding: 0 8px;
    }
  }
`;
