import enTranslations from '../../translations/en.json';

export type NewsKey = keyof typeof enTranslations.news;

export type LoginKey = keyof typeof enTranslations.login;

export type SocialFeedKey = keyof typeof enTranslations.socialFeed;

export type MissionsKey = keyof typeof enTranslations.missions;

export type NotificationsKey = keyof typeof enTranslations.notifications;

export type WikiKey = keyof typeof enTranslations.wiki;

export type VMGuidesKey = keyof typeof enTranslations.vmguides;

export type ChatKey = keyof typeof enTranslations.chat;

export type AdvancedDashboardKey = keyof typeof enTranslations.advancedDashboard;

export type NotFoundKey = keyof typeof enTranslations.notFound;

// Plural keys are added manually
export type CommonKey =
  | keyof typeof enTranslations.common
  | 'Reaction'
  | 'Comment'
  | 'View';

export type KpisKey = keyof typeof enTranslations.kpis;

export type ComponentsKey = keyof typeof enTranslations.components;

export type ErrorsKey = keyof typeof enTranslations.errors;

export type FormErrorsKey = keyof typeof enTranslations.formErrors;

export type ModuleKeys = keyof typeof enTranslations;

export type ProfileKeys = keyof typeof enTranslations.profile;

export type VideoChatKeys = keyof typeof enTranslations.videoChat;

export type ModulesKeys = keyof typeof enTranslations.modules;

export type ArticlesKey = keyof typeof enTranslations.articles;

export type AudiencesKey = keyof typeof enTranslations.audiences;

export type MembersKey = keyof typeof enTranslations.members;
