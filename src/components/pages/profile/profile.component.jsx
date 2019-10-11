import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import PersonalInformation from './personal-information/personal-information.container';
import ChangePassword from './change-password/change-password.container';
import DangerZone from './danger-zone/danger-zone.container';

import useStyles from './profile.styles';

const defaultPath = '/profile/personal-information';

const ProfileMenu = [
  {
    key: 'personal-information',
    path: '/profile/personal-information',
    title: 'page.profile.personalInformation.title',
    component: PersonalInformation,
  },
  {
    key: 'change-password',
    path: '/profile/change-password',
    title: 'page.profile.changePassword.title',
    component: ChangePassword,
  },
  {
    key: 'danger-zone',
    path: '/profile/danger-zone',
    title: 'page.profile.dangerZone.title',
    component: DangerZone,
  },
];

const getValidPathname = pathname => (ProfileMenu.map(({ path }) => path).includes(pathname) ? pathname : defaultPath);

const Profile = ({ location: { pathname } }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selected, updateSelected] = useState(getValidPathname(pathname));

  useEffect(() => {
    if (pathname !== selected) updateSelected(getValidPathname(pathname));
  }, [selected, pathname]);

  const handleChange = (e, newSelected) => {
    updateSelected(newSelected);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md="auto" className={classes.menuGrid}>
          <Box className={classes.box}>
            <Hidden smDown>
              <Tabs
                orientation="vertical"
                value={selected}
                onChange={handleChange}
                TabIndicatorProps={{ className: classes.verticalIndicator }}
              >
                {ProfileMenu.map(item => (
                  <Tab
                    key={item.key}
                    label={t(item.title)}
                    component={Link}
                    to={item.path}
                    value={item.path}
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
                onChange={handleChange}
                TabIndicatorProps={{ className: classes.horizontalIndicator }}
                variant="scrollable"
                scrollButtons="auto"
              >
                {ProfileMenu.map(item => (
                  <Tab
                    key={item.key}
                    label={t(item.title)}
                    component={Link}
                    to={item.path}
                    value={item.path}
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
        </Grid>
        <Grid item className={classes.contentGrid}>
          <Switch>
            {ProfileMenu.map(item => (
              <Route key={item.key} path={item.path} component={item.component} />
            ))}
            <Redirect to={defaultPath} />
          </Switch>
        </Grid>
      </Grid>
    </Container>
  );
};

Profile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};


export default withRouter(Profile);
