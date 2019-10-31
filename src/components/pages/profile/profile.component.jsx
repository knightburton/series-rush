import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import ProfileRoutes from '../../../routes/profile-routes';

import { PROFILE_MENU } from '../../../constants/navigation';
import { PROFILE_PATHS } from '../../../constants/paths';

import useStyles from './profile.styles';

const getValidPathname = pathname => (PROFILE_MENU.map(({ path }) => path).includes(pathname)
  ? pathname
  : PROFILE_PATHS.PERSONAL_INFORMATION
);

const Profile = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pathname } = useLocation();
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
                {PROFILE_MENU.map(item => (
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
                {PROFILE_MENU.map(item => (
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
          <ProfileRoutes />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
