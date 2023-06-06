export enum ActivityStatus {
  locked = 0,
  completed = 1,
  active = 2,
}

export enum Repeatable {
  none = 0,
  loop = 1,
}

export enum CompletionStatus {
  completed = 'completed',
  inProgress = 'active',
  notStarted = 'not_started',
}

export enum ActivityTypes {
  question = 1,
  quiz = 2,
  files = 3,
  simple = 4,
}
