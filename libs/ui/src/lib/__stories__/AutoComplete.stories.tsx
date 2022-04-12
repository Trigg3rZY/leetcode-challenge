import { useState } from 'react';
import { AutoComplete } from '../AutoComplete';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'AutoComplete',
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

interface Option {
  label: string;
  value: string;
}

export const Base: ComponentStory<typeof AutoComplete> = () => {
  const [options, setOptions] = useState<Option[]>([]);

  const mockSearchOptions = (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }
    const newOptions = new Array(3).fill(0).map((_, index) => {
      let ret = '';
      for (let i = 0; i <= index; i++) {
        ret += value;
      }
      return { label: ret, value: ret };
    });
    setOptions(newOptions);
  };

  return <AutoComplete options={options} onSearch={mockSearchOptions} />;
};
