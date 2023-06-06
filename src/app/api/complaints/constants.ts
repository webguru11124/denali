export enum ComplaintTypes {
  chatMessage = 'chatMessage',
  mission = 'mission',
  missionComment = 'missionComment',
  newsFeed = 'newsFeed',
  newsFeedComment = 'newsFeedComment',
  socialFeed = 'socialFeed',
  socialFeedComment = 'socialFeedComment',
  user = 'user',
}

export enum ComplaintStatus {
  blocked = 'blocked',
  hidden = 'hidden',
  none = 'none',
}
export const initialComplaints = {
  chatMessage: {
    blocked: [],
    hidden: [],
    none: [],
  },
  mission: {
    blocked: [],
    hidden: [],
    none: [],
  },
  missionComment: {
    blocked: [],
    hidden: [],
    none: [],
  },
  newsFeed: {
    blocked: [],
    hidden: [],
    none: [],
  },
  newsFeedComment: {
    blocked: [],
    hidden: [],
    none: [],
  },
  socialFeed: {
    blocked: [],
    hidden: [],
    none: [],
  },
  socialFeedComment: {
    blocked: [],
    hidden: [],
    none: [],
  },
  user: {
    blocked: [],
    hidden: [],
    none: [],
  },
};
