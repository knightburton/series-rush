import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import TvIcon from '@material-ui/icons/TvOutlined';
import MovieIcon from '@material-ui/icons/Movie';

import { COLLECTION_PATHS } from '../../../../constants/paths';

const ICONS = {
  TV: TvIcon,
  MOVIE: MovieIcon,
};

const MenuIcon = ({ type }) => {
  const { [type]: Icon } = ICONS;

  return <Icon fontSize="large" />;
};

MenuIcon.propTypes = {
  type: PropTypes.oneOf(Object.keys(COLLECTION_PATHS)).isRequired,
};

const CollectionMenu = () => {
  const { pathname } = useLocation();

  return (
    <Box>
      {Object.keys(COLLECTION_PATHS).map(key => (
        <IconButton
          key={key}
          component={Link}
          to={COLLECTION_PATHS[key]}
          color={pathname === COLLECTION_PATHS[key] ? 'primary' : 'default'}
        >
          <MenuIcon type={key} />
        </IconButton>
      ))}
    </Box>
  );
};

export default CollectionMenu;
