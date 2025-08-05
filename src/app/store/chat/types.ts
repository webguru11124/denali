export type ChatToken = string | undefined;
export type ChatTokenExpiresOn = string | undefined;

export interface State {
  chatToken: ChatToken;
  chatTokenExpiresOn: ChatTokenExpiresOn;
}
