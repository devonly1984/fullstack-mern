import { useCallback, useEffect, useState } from "react";

export const useAsync = (func, dep = []) => {
  const { execute, ...state } = useAsyncInternal(func, dep, true);
  useEffect(() => {
    execute();
  }, [execute]);
  return state;
};
export const useAsyncFn = (func, dep = []) => {
  return useAsyncInternal(func, dep, false);
};
const useAsyncInternal = (func, dep = [], initalLoading = false) => {
  const [loading, setLoading] = useState(initalLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState();
  const execute = useCallback((...params) => {
    setLoading(true);
    return func(...params)
      .then((data) => {
        setValue(data);
        setError(undefined);
      })
      .catch((error) => {
        setError(error);
        setValue(undefined);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dep);
  return { loading, error, value, execute };
};
