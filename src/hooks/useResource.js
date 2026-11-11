import { useCallback, useEffect, useRef, useState } from "react";
export function useResource(loader) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });
  const sequence = useRef(0);
  const reload = useCallback(async () => {
    const ticket = ++sequence.current;
    setState((s) => ({
      ...s,
      loading: true,
      error: "",
    }));
    try {
      const data = await loader();
      if (ticket === sequence.current)
        setState({
          data,
          loading: false,
          error: "",
        });
    } catch (error) {
      if (ticket === sequence.current)
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
    }
  }, [loader]);
  useEffect(() => {
    reload();
    return () => {
      sequence.current++;
    };
  }, [reload]);
  return {
    ...state,
    reload,
  };
}
