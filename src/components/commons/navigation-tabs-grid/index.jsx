import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import NavigationTabs from '../navigation-tabs';

import { getPathnameFromPaths } from '../../../utils/location';

import useStyles from './styles';

const NavigationTabsGrid = ({ tabs, defaultTab, children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [selected, updateSelected] = useState(getPathnameFromPaths(pathname, tabs.map(({ to }) => to), defaultTab));

  useEffect(() => {
    if (pathname !== selected) updateSelected(getPathnameFromPaths(pathname, tabs.map(({ to }) => to), defaultTab));
  }, [selected, pathname, tabs, defaultTab]);

  const handleChange = useCallback((e, newSelected) => updateSelected(newSelected), []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md="auto" className={classes.menuGrid}>
        <NavigationTabs
          tabs={tabs}
          selected={selected}
          onChange={handleChange}
        />
      </Grid>
      <Grid item className={classes.contentGrid}>
        {children}
      </Grid>
    </Grid>
  );
};

NavigationTabsGrid.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  defaultTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(NavigationTabsGrid);
