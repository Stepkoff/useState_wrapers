import React, {useState} from "react";
import {useEvent} from "./useEvent.tsx";
import {isFunction} from "../utils/isFunction.ts";

const getSearchParam = (search: string, param: string) => {
  const searchParams = new URLSearchParams(search);
  return searchParams.get(param);
}

const setSearchParam = (search: string, param: string, value: string) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set(param, value);
  return searchParams.toString();
}

const defaultDeserialize = <Value,>(v: string | null) => v as Value;
const defaultSerialize = String;

interface UseSearchParamsStateOptions<Value> {
  name: string;
  serialize?: (value: Value) => string;
  deserialize?: (value: string | null) => Value;
}
const useSearchParamsState = <Value,>(
  {
    name,
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
  }: UseSearchParamsStateOptions<Value>) => {
  const [value, setValue] = useState(() => deserialize(getSearchParam(location.search, name)));
  const updateValue = useEvent((newValue: React.SetStateAction<Value>) => {
    const search = window.location.search;
    const actualNewValue = isFunction(newValue) ? newValue(value) : newValue;
    setValue(actualNewValue);
    const newSearch = setSearchParam(search, name, serialize(actualNewValue));
    history.pushState(null, "", `?${newSearch}`);
  });
  return [value, updateValue] as const;
}


// ===============================


export const UseSearchParamsStateExample = () => {
  const [value, setValue] = useSearchParamsState({
    name: 'stringExample',
    deserialize: (v) => v || "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {setValue(e.target.value)};

  return (
    <div>
      <input value={value} onChange={onChange} placeholder="Name" />
    </div>
  );
}