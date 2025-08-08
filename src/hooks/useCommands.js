// src/hooks/useCommands.js
import { useState, useEffect, useRef } from "react";

export default function useCommands(subCategoryKey) {
  const cache = useRef({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subCategoryKey) {
      setData(null);
      return;
    }

    if (cache.current[subCategoryKey]) {
      setData(cache.current[subCategoryKey]);
      return;
    }

    setLoading(true);
    import(`../data/commands/${subCategoryKey}.json`)
      .then((m) => {
        const payload = m.default || m;
        cache.current[subCategoryKey] = payload;
        setData(payload);
      })
      .catch((err) => {
        console.error("Failed to load commands for", subCategoryKey, err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [subCategoryKey]);

  return { data, loading };
}
