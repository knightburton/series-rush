import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import useStyles from './styles';

const NavigationTabs = ({ tabs, selected, onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.box}>
      <Hidden smDown>
        <Tabs
          orientation="vertical"
          value={selected}
          onChange={onChange}
          TabIndicatorProps={{ className: classes.verticalIndicator }}
        >
          {tabs.map(item => (
            <Tab
              key={item.key}
              label={t(item.title)}
              component={Link}
              to={item.to}
              value={item.to}
              classes={{
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              className={classes.tab}
              disableRipple
            />
          ))}
        </Tabs>
      </Hidden>
      <Hidden mdUp>
        <Tabs
          orientation="horizontal"
          value={selected}
          onChange={onChange}
          TabIndicatorProps={{ className: classes.horizontalIndicator }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map(item => (
            <Tab
              key={item.key}
              label={t(item.title)}
              component={Link}
              to={item.to}
              value={item.to}
              classes={{
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              className={classes.tab}
              disableRipple
            />
          ))}
        </Tabs>
      </Hidden>
    </Box>
  );
};

NavigationTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(NavigationTabs);
