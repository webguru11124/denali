import { useEffect, useMemo } from 'react';

const useObjectUrl = (file: File) => {
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => () => URL.revokeObjectURL(url), [url]);

  return url;
};

export default useObjectUrl;
