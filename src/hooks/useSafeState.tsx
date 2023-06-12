import React, {useCallback, useEffect, useState} from "react";
import {useIsMounted} from "./useIsMounted.tsx";

export const useSafeState = <S,>(initialVal: (() => S) | S) => {
  const [value, setValue] = useState(initialVal);
  const isMounted = useIsMounted();
  const setState = useCallback((newVal:React.SetStateAction<S>) => {
    if(!isMounted.current) return;
    setValue(newVal)
  }, []);
  return [value, setState] as const;
}

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// ===============================

export const UseSafeStateExample = () => {
  const [items, setItems] = useSafeState<TodoItem[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}