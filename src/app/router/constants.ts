const newsTypes = {
  relevant: 'relevant',
  expired: 'expired',
};

const profilePageTypes = {
  edit: 'edit',
  view: 'view',
  editPassword: 'edit/password',
};

const missionListTypes = {
  active: 'active',
  new: 'new',
  completed: 'completed',
};

const missionReportTypes = {
  teams: 'teams',
  people: 'people',
};

const visualGuideTypes = {
  guide: 'guide',
  feedback: 'feedback',
};

const editorTypes = {
  view: 'view',
  edit: 'edit',
  review: 'review',
} as const;

export {
  newsTypes,
  profilePageTypes,
  missionListTypes,
  missionReportTypes,
  visualGuideTypes,
  editorTypes,
};
