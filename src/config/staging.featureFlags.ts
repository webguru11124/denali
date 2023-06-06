import { FeatureFlags } from 'app/config/types';

const featureFlags: FeatureFlags = {
  chat: true,
  kpiDashboard: {
    enabled: ['intersport', 'aawkw', 'topocentras', 'stokke'],
  },
  missions: true,
  news: true,
  social: true,
  vmGuides: {
    enabled: [
      'iic',
      'tescocz',
      'innovasport',
      'intersportde',
      'topocentras',
      'stokke',
      'intersport',
      'diesel',
      'camper',
      'intersportse',
      'aawkw',
    ],
  },
  nikeSKU: {
    enabled: [
      'nike',
      'intersport',
      'intersportnl',
      'intersportde',
      'aawkw',
      'intersportiau',
      'stokke',
      'iic',
      'intersportse',
    ],
  },
  videoChat: true,
  identityServer: true,
  channelsView: true,
  sisense: true,
  atticus: {
    enabled: [
      'stokke',
      'iic',
      'intersport',
      'intersportnl',
      'intersportde',
      'aawkw',
      'intersportiau',
      'intersportse',
    ],
  },
  members: true,
};

export default featureFlags;
