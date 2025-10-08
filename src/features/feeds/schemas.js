export const feedsSchemas = {
  feed: {
    feedId: '0199c4bf-40c3-706f-9dd9-d0d51311a205',
    name: 'name-8e62df1e-68ce-4f1c-9476-eb7f6a9084ab',
    key: '2fffa6151dc77512',
    createdAt: '2025-10-08T16:54:52.355Z',
  },
  feedList: {
    items: [{ $ref: '#/components/schemas/feed' }],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 5,
    totalItems: 50,
  },
  addFeed: {
    name: 'name-8e62df1e-68ce-4f1c-9476-eb7f6a9084ab',
  },
};
