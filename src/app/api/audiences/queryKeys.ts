export default {
  audiences: (page: number, query: string) => ['audiences', page, query],
  audience: (id: number) => ['audience', id],
  audienceUsers: (id: number, page: number) => ['audienceUsers', id, page],
  users: (locations: number[], professions: number[]) => [
    'usersFromLocationsProfessions',
    locations,
    professions,
  ],
};
