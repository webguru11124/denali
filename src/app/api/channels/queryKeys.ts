export default {
  channels: ({
    ranking,
    refetchOnWindowFocus,
    refetchOnMount,
  }: {
    ranking: 'asc' | 'desc';
    refetchOnWindowFocus: boolean;
    refetchOnMount: boolean;
  }) => ['channels', ranking, refetchOnWindowFocus, refetchOnMount],
  channel: (channelId: number) => ['channel', channelId],
  relevantChannels: () => ['relevantChannels'],
};
