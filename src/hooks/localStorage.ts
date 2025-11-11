export function useLocalStorage() {
  const readLocal = (key: string) => localStorage.getItem(key);
  const writeLocal = (...values: { key: string; value: string }[]) => {
    values.forEach((value) => localStorage.setItem(value.key, value.value));
  };
  const removeLocal = (...keys: string[]) => {
    keys.forEach((key) => localStorage.removeItem(key));
  };
  const clearLocal = () => {
    localStorage.clear();
  };

  return { readLocal, writeLocal, removeLocal, clearLocal };
}
