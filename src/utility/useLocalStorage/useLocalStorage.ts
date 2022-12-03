import React from 'react';

export const useLocalStorage = <T>(
  storageName: string,
  defaultValue: T
): [T, React.Dispatch<T>] => {
  const [state, setState] = React.useState<T>(() => {
    const item = localStorage.getItem(storageName);
    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }
    return defaultValue;
  });
  React.useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify(state));
  }, [storageName, state]);

  return [state, setState];
};
