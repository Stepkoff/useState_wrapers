import {localStorageWrapper, PersistentStorage, sessionStorageWrapper} from "./local-sesion-storage-wrapper.ts";
import {useState} from "react";
import {isFunction} from "../../utils/isFunction.ts";
import {useEvent} from "../useEvent.tsx";

const createPersistentStateHooks = (storage: PersistentStorage) => {
  return function usePersistentState<Value>(
    name: string,
    initialValue: (() => Value) | Value
  ) {
    const [value, setValue] = useState(() => {
      if (storage.has(name)) {
        return storage.get(name) as Value;
      }
      return isFunction(initialValue) ? initialValue() : initialValue;
    });
    const setState = useEvent((newValue: React.SetStateAction<Value>) => {
      const actualNewValue = isFunction(newValue) ? newValue(value) : newValue;
      storage.set(name, actualNewValue);
      setValue(actualNewValue);
    });
    return [value, setState] as const;
  };
}

const useLocalStorage = createPersistentStateHooks(localStorageWrapper);
const useSessionStorage = createPersistentStateHooks(sessionStorageWrapper);


// ===============================


export const UseLocalSessionStorageExample = () => {
  const [localValue, setLocalValue] = useLocalStorage("local-state", "");
  const [sessionValue, setSessionValue] = useSessionStorage("session-state", "");

  return (
    <div>
      <h2>Local value</h2>
      <input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        type="text"
      />
      <h2>Session value</h2>
      <input
        value={sessionValue}
        onChange={(e) => setSessionValue(e.target.value)}
        type="text"
      />
    </div>
  );
}