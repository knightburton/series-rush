export const getProfileCollectionQuery = profileID => ({
  collection: 'profiles',
  doc: profileID,
  subcollections: [{ collection: 'collection' }],
  storeAs: 'collection',
});

export const getProfileCollectionByTypeQuery = (profileID, type) => ({
  collection: 'profiles',
  doc: profileID,
  subcollections: [{
    collection: 'collection',
    where: ['type', '==', type],
  }],
  storeAs: `${type}Collection`,
});

export const getProfileGroupsQuery = profileID => ({
  collection: 'profiles',
  doc: profileID,
  subcollections: [{ collection: 'groups' }],
  storeAs: 'groups',
});

export const getProfileGroupsByTypeQuery = (profileID, type) => ({
  collection: 'profiles',
  doc: profileID,
  subcollections: [{
    collection: 'groups',
    where: ['type', '==', type],
    orderBy: ['order', 'asc'],
  }],
  storeAs: `${type}Groups`,
});
