import { CompletionStatus } from 'app/api/missions/constants';
import { useMissionQuery } from 'app/api/missions/hooks';
import {
  Container,
  Spinner,
  CategorySelect,
  Input,
  SelectBox,
  Feature,
} from 'app/components';
import { useRouteId } from 'app/hooks';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { constants, routes } from 'app/router';
import { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import DownloadIcon from 'remixicon-react/DownloadCloudLineIcon';
import MoreIcon from 'remixicon-react/More2FillIcon';
import SearchIcon from 'remixicon-react/SearchLineIcon';

import DoughnutChart from './DoughnutChart';
import Locations from './Locations';
import LocationUsers from './LocationUsers';
import MissionControls from './MissionControls';
import People from './People';
import PreviousReportModal from './PreviousReportsModal';
import useMissionReportDownload from './useMissionReportDownload';
import useMissionStatsQuery from './useMissionStatsQuery';

const MissionReport = () => {
  const id = useRouteId();
  if (typeof id === 'string') throw new Error('ID should be numeric');

  const [resultsFound, setResultsFound] = useState<number | null>(null);
  const { category, teamId } = useParams<{
    category: string;
    teamId: string | undefined;
  }>();
  const { t } = useMissionsTranslation();
  const [shouldDisplaySettings, setShouldDisplaySettings] = useState(false);
  const { download: downloadReport, isLoading: isDownloading } =
    useMissionReportDownload(id);
  const [selectedCompletionStatus, setSelectedCompletionStatus] = useState<
    '' | CompletionStatus
  >('');
  const [shouldDisplayReportsModal, setShouldDisplayReportsModal] =
    useState(false);
  const { data: missionStats, isLoading: isStatsLoading } =
    useMissionStatsQuery(id);

  const { data: missionData, isLoading: isMissionLoading } =
    useMissionQuery(id);

  const location = useLocation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setResultsFound(null);
  }, [searchQuery]);

  useEffect(() => {
    // Clear search value if user jumps between teams/people
    setSearchQuery('');
  }, [location]);

  if (isStatsLoading || isMissionLoading || !missionStats || !missionData) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const COMPLETION_STATUSES = [
    {
      value: '',
      label: t('All'),
    },
    {
      value: CompletionStatus.completed,
      label: t('Completed'),
    },
    {
      value: CompletionStatus.inProgress,
      label: t('In Progress'),
    },
    {
      value: CompletionStatus.notStarted,
      label: t('Not Started'),
    },
  ];

  const CATEGORIES = [
    {
      value: constants.missionReportTypes.teams,
      label: t('Teams'),
    },
    {
      value: constants.missionReportTypes.people,
      label: t('People'),
    },
  ];

  return (
    <div className="flex justify-center mt-12 mb-16">
      <Container>
        {shouldDisplayReportsModal && (
          <PreviousReportModal
            id={id}
            onClose={() => setShouldDisplayReportsModal(false)}
          />
        )}
        <div className="flex mb-5 items-center">
          <p className="text-grayscale-primary text-lg">{missionData.name}</p>
          <button
            onClick={() => downloadReport()}
            type="button"
            disabled={isDownloading}
            className="p-2 ml-auto rounded-lg shadow-card"
          >
            <DownloadIcon className="w-6 h-6 text-grayscale-secondary" />
          </button>
          <OutsideClickHandler
            onOutsideClick={() => setShouldDisplaySettings(false)}
          >
            <div>
              <button
                onClick={() => setShouldDisplaySettings((prev) => !prev)}
                type="button"
                className="p-2 ml-2 rounded-lg shadow-card"
              >
                <MoreIcon className="w-6 h-6 text-grayscale-secondary" />
              </button>
              {shouldDisplaySettings && (
                <MissionControls
                  onReportModalDisplay={() => {
                    setShouldDisplayReportsModal(true);
                    setShouldDisplaySettings(false);
                  }}
                  isDownloading={isDownloading}
                  onReportDownload={downloadReport}
                />
              )}
            </div>
          </OutsideClickHandler>
        </div>
        <DoughnutChart missionId={id} locationId={teamId} />
        <div className="mt-12">
          {!teamId && (
            <CategorySelect
              categories={CATEGORIES}
              selectedCategory={category}
              onChange={(val) => {
                history.replace(routes.missionReport.create(id, val));
              }}
            />
          )}
          <div className="row mt-6">
            <div className="col-6">
              <Input
                icon={<SearchIcon />}
                name="query"
                className="border border-transparent"
                placeholder={`${t('Search...')}`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
            <div className="col-6">
              {category === constants.missionReportTypes.people ||
                (teamId && (
                  <SelectBox
                    options={COMPLETION_STATUSES}
                    placeholder={`${t('Sort by')}`}
                    value={selectedCompletionStatus}
                    onChange={(val) => {
                      setSelectedCompletionStatus(val as '' | CompletionStatus);
                    }}
                  />
                ))}
            </div>
          </div>
          <div className="row">
            <div className="col-6 h-4 mt-2 text-xs text-grayscale-secondary">
              {Boolean(searchQuery.length) &&
                typeof resultsFound === 'number' && (
                  <span>
                    {t('Results found', {
                      count: resultsFound,
                    })}
                  </span>
                )}
            </div>
          </div>
        </div>
        <div>
          {(() => {
            if (teamId) {
              return (
                <LocationUsers
                  locationId={teamId}
                  onResponseReceived={setResultsFound}
                  totalActivities={missionStats.activitiesCount}
                  missionId={id}
                  searchQuery={searchQuery}
                  completionStatus={selectedCompletionStatus}
                />
              );
            }
            switch (category) {
              case constants.missionReportTypes.teams:
                return (
                  <Locations
                    onResponseReceived={setResultsFound}
                    searchQuery={searchQuery}
                    missionId={id}
                  />
                );
              case constants.missionReportTypes.people:
                return (
                  <People
                    totalActivities={missionStats.activitiesCount}
                    missionId={id}
                    onResponseReceived={setResultsFound}
                    searchQuery={searchQuery}
                    completionStatus={selectedCompletionStatus}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </Container>
    </div>
  );
};

const FeaturedMissionReport = () => (
  <Feature feature="missions" activeComponent={MissionReport} />
);

export default FeaturedMissionReport;
