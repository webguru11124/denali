export default {
  getActiveMissions: (searchQuery: string, tags: Array<string>) => [
    'missions-active',
    searchQuery,
    tags,
  ],
  getActiveMissionsPaginated: (tags: Array<string>) => [
    'missions-active-paginated',
    tags,
  ],
  getNewMissions: (searchQuery: string, tags: Array<string>) => [
    'missions-new',
    searchQuery,
    tags,
  ],
  getNewMissionsPaginated: (tags: Array<string>) => [
    'missions-new-paginated',
    tags,
  ],
  getCompletedMissions: (searchQuery: string, tags: Array<string>) => [
    'missions-completed',
    searchQuery,
    tags,
  ],
  getCompletedMissionsPaginated: (tags: Array<string>) => [
    'missions-completed-paginated',
    tags,
  ],
  getMission: (id: number) => ['mission', id],
  getMissionStats: (id: number) => ['mission-stats', id],
  getMissionReport: (id: number) => ['mission-report', id],
  getMissionActivity: (activityId: number) => ['mission-activity', activityId],
  getQuizStats: (activityId: number) => [
    'mission-quiz-stats-non-looped',
    activityId,
  ],
  getTags: () => ['mission-tags'],
  getLoopedQuizStats: (activityId: number) => [
    'mission-quiz-stats-looped',
    activityId,
  ],
  getQuestionAnswers: (activityId: number) => [
    'mission-activity-answers',
    activityId,
  ],
  getMissionLocationsStats: (id: number, searchQuery: string) => [
    'mission-locations-stats',
    id,
    searchQuery,
  ],
  getUsersStats: (
    id: number,
    completionStatus: string,
    searchQuery: string,
    locationId?: string
  ) => ['mission-user-stats', completionStatus, id, searchQuery, locationId],
  getUserStatsByLocation: (missionId: number, locationId: number) => [
    'mission-user-location',
    missionId,
    locationId,
  ],
};
