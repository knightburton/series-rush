import React from 'react';

import Container from '@material-ui/core/Container';

import CollectionMenu from './collection-menu/collection-menu.container';

import CollectionRoutes from '../../../routes/collection-routes';

const Collection = () => (
  <Container maxWidth="lg">
    <CollectionMenu />
    <CollectionRoutes />
  </Container>
);

export default Collection;
