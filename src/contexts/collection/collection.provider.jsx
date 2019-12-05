import React from 'react';
import PropTypes from 'prop-types';
import { useFirestoreConnect } from 'react-redux-firebase';

import CollectionContext from './context';

import {
  getEnabledCollectionGroupsQuery,
  getCollectionsQuery,
} from '../../utils';

const CollectionProvider = ({ children, profile: { id } }) => {
  useFirestoreConnect(id && [
    ...getEnabledCollectionGroupsQuery(id),
    ...getCollectionsQuery(id),
  ]);

  return (
    <CollectionContext.Provider>
      {children}
    </CollectionContext.Provider>
  );
};

CollectionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

CollectionProvider.defaultProps = {};

export default CollectionProvider;
