import { render, screen, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { AutoComplete } from '../AutoComplete';
import type { AutoCompleteProps, RefInput } from '../AutoComplete';
import '@testing-library/jest-dom';

const options = [
  { label: 'foo', value: 'foo' },
  { label: 'bar', value: 'bar' },
  { label: 'baz', value: 'baz' },
];

const setup = (props: AutoCompleteProps = {}) => {
  const utils = render(<AutoComplete {...props} />);
  const input = screen.getByRole('combobox') as HTMLInputElement;
  return { ...utils, input };
};

test('should render a combobox', () => {
  const { input } = setup();
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'foo' } });
  expect(input.value).toBe('foo');
});

test('should render a listbox with options', () => {
  const { input } = setup({ options });
  expect(screen.getByRole('listbox')).toBeInTheDocument();
  expect(screen.getAllByRole('option')).toHaveLength(3);

  fireEvent.blur(input);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('should filter option by input value', () => {
  const { input } = setup({ options });
  fireEvent.change(input, { target: { value: 'ba' } });
  expect(screen.getAllByRole('option')).toHaveLength(2);
  expect(screen.queryByText('foo')).not.toBeInTheDocument();
});

test('should trigger prop onSearch when input value changes', () => {
  const onSearch = jest.fn();
  const { input } = setup({ onSearch });
  fireEvent.change(input, { target: { value: 'foo' } });
  expect(onSearch).toBeCalledWith('foo');
  fireEvent.change(input, { target: { value: 'bar' } });
  expect(onSearch).toBeCalledTimes(2);
});

test('should expose forward ref methods that works', () => {
  const ForwardRefTestComponent = () => {
    const ref = useRef<RefInput>(null);
    return (
      <>
        <AutoComplete ref={ref} />
        <button onClick={() => ref.current?.focus()}>focus</button>
        <button onClick={() => ref.current?.blur()}>blur</button>
      </>
    );
  };
  render(<ForwardRefTestComponent />);
  const input = screen.getByRole('combobox');

  expect(input).not.toHaveFocus();
  fireEvent.click(screen.getByText('focus'));
  expect(input).toHaveFocus();
  fireEvent.click(screen.getByText('blur'));
  expect(input).not.toHaveFocus();
});
