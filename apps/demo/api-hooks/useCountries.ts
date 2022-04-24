import { useEffect, useState, useCallback } from 'react';

interface CountryOption {
  name: string;
  code: string;
}

export function useCountries(startsWith: string) {
  const [countries, setCountries] = useState<CountryOption[]>();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<Error>();

  const handleFetch = useCallback(() => {
    const url = startsWith
      ? `/api/countries?startsWith=${startsWith}`
      : '/api/countries';

    setFetching(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setError(undefined);
      })
      .catch((error) => {
        setCountries(undefined);
        setError(error);
      })
      .finally(() => setFetching(false));
  }, [startsWith]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return {
    data: countries,
    error,
    fetching,
  };
}
