export const useLocalStorage = <T>(
  storageName: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  try {
    const serializedValue = localStorage.getItem(storageName);
    if (serializedValue === null) {
      localStorage.setItem(storageName, JSON.stringify(defaultValue));
      return [
        defaultValue,
        newValue => localStorage.setItem(storageName, JSON.stringify(newValue)),
      ];
    }
    return [
      JSON.parse(serializedValue),
      newValue => localStorage.setItem(storageName, JSON.stringify(newValue)),
    ];
  } catch (error) {
    console.error(error);
    localStorage.setItem(storageName, JSON.stringify(defaultValue));
    return [
      defaultValue,
      newValue => localStorage.setItem(storageName, JSON.stringify(newValue)),
    ];
  }
};
