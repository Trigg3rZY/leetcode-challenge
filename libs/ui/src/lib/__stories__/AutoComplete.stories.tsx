import { AutoComplete } from '../AutoComplete';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'AutoComplete',
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const mockOptions = [
  { label: 'haah', value: 'haah' },
  { label: 'foo', value: 'foo' },
  { label: 'bar', value: 'bar' },
];

export const Base: ComponentStory<typeof AutoComplete> = () => (
  <AutoComplete
    options={mockOptions}
    onSearch={(value) => {
      console.log(value);
    }}
  />
);
