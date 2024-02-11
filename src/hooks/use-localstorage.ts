import { useState } from "react";

type setStoredValue<T> = (newValue: T) => void;

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  const setStoredValue: setStoredValue<T> = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
