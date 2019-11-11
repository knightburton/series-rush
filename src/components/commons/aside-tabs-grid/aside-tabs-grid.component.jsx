import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import AsideTabs from '../aside-tabs/aside-tabs.component';

import { getValidatedPathnameFromPaths } from '../../../utils';

import useStyles from './aside-tabs-grid.styles';

const AsideTabsGrid = ({ tabs, defaultTab, children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [selected, updateSelected] = useState(getValidatedPathnameFromPaths(pathname, tabs.map(({ path }) => path), defaultTab));

  useEffect(() => {
    if (pathname !== selected) updateSelected(getValidatedPathnameFromPaths(pathname, tabs.map(({ path }) => path), defaultTab));
  }, [selected, pathname, tabs, defaultTab]);

  const handleChange = (e, newSelected) => {
    updateSelected(newSelected);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md="auto" className={classes.menuGrid}>
        <AsideTabs
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


AsideTabsGrid.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  defaultTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AsideTabsGrid;
