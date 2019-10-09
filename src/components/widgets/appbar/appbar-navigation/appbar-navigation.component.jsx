import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useStyles from './appbar-navigation.styles';
import MENU from '../../../../constants/menu';

const AppBarNavigation = ({ location: { pathname } }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selected, updateSelected] = useState(
    MENU.map(({ path }) => path).includes(pathname)
      ? pathname
      : false
  );

  useEffect(() => {
    if (!pathname.includes(selected)) updateSelected(false);
  }, [selected, pathname]);

  return (
    <Tabs
      value={selected}
      onChange={(e, value) => updateSelected(value)}
      className={classes.root}
      TabIndicatorProps={{ className: classes.indicator }}
      classes={{ flexContainer: classes.flexContainer }}
    >
      {MENU.map(item => (
        <Tab
          key={item.key}
          value={item.path}
          label={t(item.title)}
          className={classes.tab}
          classes={{
            selected: classes.selected,
          }}
          component={Link}
          to={item.path}
          disableRipple
        />
      ))}
    </Tabs>
  );
};

AppBarNavigation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(AppBarNavigation);
