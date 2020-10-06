import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { MAIN_MENU } from '../../../../constants/navigation';

import useStyles from './styles';

const defaultSelected = pathname => {
  const selected = MAIN_MENU.map(({ to }) => to).find(to => pathname.includes(to));

  return selected || false;
};

const AppBarNavigation = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [selected, updateSelected] = useState(defaultSelected(pathname));

  const handleTabChange = useCallback((e, value) => updateSelected(value), []);

  useEffect(() => {
    if (!pathname.includes(selected)) updateSelected(false);
  }, [selected, pathname]);

  return (
    <Tabs
      value={selected}
      onChange={handleTabChange}
      className={classes.root}
      TabIndicatorProps={{ className: classes.indicator }}
      classes={{ flexContainer: classes.flexContainer }}
    >
      {MAIN_MENU.map(item => (
        <Tab
          key={item.key}
          value={item.to}
          label={t(item.title)}
          className={classes.tab}
          classes={{
            selected: classes.selected,
          }}
          component={Link}
          to={item.to}
          disableRipple
        />
      ))}
    </Tabs>
  );
};

export default AppBarNavigation;
