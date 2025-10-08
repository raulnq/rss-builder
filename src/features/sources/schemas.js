export const sourcesSchemas = {
  source: {
    sourceId: '0199c4c8-b077-728e-ad19-a657e7a5f1f6',
    name: 'name-1336df5c-6bba-4d72-897b-65513490bf7c',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC8LeXCWOalN8SxlrPcG-PaQ',
    syncedAt: null,
    feedId: '0199c4c8-a7fd-763e-b335-6bf7f4cfaf11',
  },
  sourceList: {
    items: [{ $ref: '#/components/schemas/source' }],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 5,
    totalItems: 50,
  },
  addSource: {
    name: 'name-8e62df1e-68ce-4f1c-9476-eb7f6a9084ab',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC8LeXCWOalN8SxlrPcG-PaQ',
  },
};
