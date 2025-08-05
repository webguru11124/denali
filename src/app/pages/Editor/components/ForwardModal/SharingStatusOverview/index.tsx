import { ScrollbarContainer } from 'app/components';
import { SharingStatusOverviewResponse } from 'submodules/common-ui/generated/api/gcs';

import SharingStatusRow from './SharingStatusRow';

interface SharingStatusOverviewProps {
  statusOverview: SharingStatusOverviewResponse;
  articleOwner: number;
  articleId: number;
  sender?: string;
}

const SharingStatusOverview = ({
  statusOverview,
  articleOwner,
  articleId,
  sender,
}: SharingStatusOverviewProps) => {
  return (
    <div className="flex flex-col mt-4">
      <span className="text-sm font-bold mb-2">Forwarded to</span>
      <ScrollbarContainer className="max-h-[300px]">
        {statusOverview.map((so, index) => (
          <SharingStatusRow
            sharingStatus={so}
            key={index}
            sender={sender}
            articleId={articleId}
            articleOwner={articleOwner}
          />
        ))}
      </ScrollbarContainer>
    </div>
  );
};

export default SharingStatusOverview;
