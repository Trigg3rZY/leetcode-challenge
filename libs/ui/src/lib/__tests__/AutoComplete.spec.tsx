import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  const user = userEvent.setup();
  return { ...utils, input, user };
};

test('should render a combobox', async () => {
  const { input, user } = setup();
  expect(input).toBeInTheDocument();
  await user.click(input);
  await user.keyboard('foo');
  expect(input.value).toBe('foo');
});

test('should render a listbox with options', () => {
  const { input } = setup({ options });
  expect(screen.getByRole('listbox')).toBeInTheDocument();
  expect(screen.getAllByRole('option')).toHaveLength(3);

  fireEvent.blur(input);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('should filter option by input value', async () => {
  const { input, user } = setup({ options });
  await user.click(input);
  await user.keyboard('ba');
  expect(screen.getAllByRole('option')).toHaveLength(2);
  expect(screen.queryByText('foo')).not.toBeInTheDocument();
});

test('should trigger prop onSearch while texting', async () => {
  const onSearch = jest.fn();
  const { input, user } = setup({ onSearch });
  await user.click(input);
  await user.keyboard('foo');
  expect(onSearch).toBeCalledTimes(3);
  expect(onSearch).toBeCalledWith('foo');
});

test('should set value to input after selecting option', async () => {
  const onSearch = jest.fn();
  const { input, user } = setup({ onSearch, options });
  const option = screen.getByText('foo');
  await user.click(option);
  expect(input.value).toBe('foo');
});

test('should be controlled by prop value & onChange', () => {
  const onChange = jest.fn();
  const { input } = setup({ value: 'foo', onChange });
  expect(input.value).toBe('foo');
  fireEvent.change(input, { target: { value: 'bar' } });
  expect(onChange).toBeCalledWith('bar');
});

test('should expose forward ref methods that works', async () => {
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
  const user = userEvent.setup();
  const input = screen.getByRole('combobox');

  expect(input).not.toHaveFocus();
  await user.click(screen.getByText('focus'));
  expect(input).toHaveFocus();
  await user.click(screen.getByText('blur'));
  expect(input).not.toHaveFocus();
});
