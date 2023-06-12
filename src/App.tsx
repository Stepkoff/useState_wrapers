import {useState} from "react";
import {UseSafeStateExample} from "./hooks/useSafeState.tsx";
import {UseSearchParamsStateExample} from "./hooks/useQueryParamsState.tsx";
import {UseMapSetExample} from "./hooks/useMapSet.tsx";
import {UseLocalSessionStorageExample} from "./hooks/useLocalSessionStorage/useLocalSesionStorage.tsx";

const examplesMap = {
  useSafeState: UseSafeStateExample,
  useSearchParamsState: UseSearchParamsStateExample,
  useLocalSessionStorage: UseLocalSessionStorageExample,
  useMapSet: UseMapSetExample,
};
type Example = keyof typeof examplesMap;

export const App = () => {
  const [example, setExample] = useState<Example>("useMapSet");
  const Component = examplesMap[example];

  return(
    <div>
      <div style={{ marginBottom: 40 }}>
        {Object.keys(examplesMap).map((example) => (
          <button key={example} onClick={() => setExample(example as Example)}>
            {example}
          </button>
        ))}
      </div>
      <Component />
    </div>
  )
}

