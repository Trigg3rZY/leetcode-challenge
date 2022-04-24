import { useMemo } from 'react';
import { useCountries, useAutoCompleteController } from '../api-hooks';
import { AutoComplete } from '@leetcode-challenge/ui';

export function Index() {
  const { searchStr, subject } = useAutoCompleteController(500);
  // 获取提示列表的逻辑
  const { data: countries = [] } = useCountries(searchStr);

  const options = useMemo(
    () =>
      countries.map(({ name, code }) => ({
        label: `${name}(${code})`,
        value: name,
      })),
    [countries]
  );

  return (
    <>
      <h4>text any country name</h4>
      <div style={{ width: 'fit-content' }}>
        <AutoComplete
          options={options}
          onSearch={(searchStr) => subject.next(searchStr)}
        />
      </div>
    </>
  );
}

export default Index;
