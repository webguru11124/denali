import { downloadFile } from 'app/utils';
import { useEffect } from 'react';

import useMissionReportQuery from './useMissionReportQuery';

const useMissionReportDownload = (missionId: number) => {
  const { data, fetch, remove, isLoading } = useMissionReportQuery(missionId);

  useEffect(() => {
    const fileUrl = data?.files[0]?.url;
    if (fileUrl) {
      // Download file and delete cache to prevent multiple downloads
      downloadFile(fileUrl);
      remove();
    }
  }, [data, remove]);

  return {
    download: fetch,
    isLoading,
  };
};

export default useMissionReportDownload;
