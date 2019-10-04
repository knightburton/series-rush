import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import MuiDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ProfileContext from '../../../contexts/profile';

import useStyles from './drawer.styles';

const DrawerContent = ({ mobileView, toggleDrawer, isDrawerOpened }) => {
  const classes = useStyles();

  return (
    <>
      <Toolbar className={classes.toolbar} />
      <Divider />
      <Hidden smDown>
        <Toolbar className={classes.toggleToolbar}>
          <Box
            onClick={toggleDrawer}
            className={classes.toggleButton}
            aria-label="expand or collapse navigation bar"
          >
            {!mobileView && isDrawerOpened ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </Box>
        </Toolbar>
      </Hidden>
    </>
  );
};

DrawerContent.propTypes = {
  mobileView: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
  isDrawerOpened: PropTypes.bool.isRequired,
};

DrawerContent.defaultProps = {
  mobileView: false,
};

const Drawer = ({ isDrawerOpened, isMobileDrawerOpened, toggleDrawer, toggleMobileDrawer }) => {
  const classes = useStyles();
  const { signedIn } = useContext(ProfileContext);

  return signedIn ? (
    <>
      <Hidden smDown>
        <MuiDrawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isDrawerOpened,
            [classes.drawerClose]: !isDrawerOpened,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isDrawerOpened,
              [classes.drawerClose]: !isDrawerOpened,
            }),
          }}
          open={isDrawerOpened}
        >
          <DrawerContent
            toggleDrawer={toggleDrawer}
            isDrawerOpened={isDrawerOpened}
          />
        </MuiDrawer>
      </Hidden>
      <Hidden mdUp>
        <MuiDrawer
          variant="temporary"
          className={clsx(classes.drawer, classes.drawerOpen)}
          classes={{
            paper: classes.drawerOpen,
          }}
          open={isMobileDrawerOpened}
          onClose={() => toggleMobileDrawer()}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerContent
            mobileView
            toggleDrawer={toggleDrawer}
            isDrawerOpened={isDrawerOpened}
          />
        </MuiDrawer>
      </Hidden>
    </>
  ) : null;
};

Drawer.propTypes = {
  isDrawerOpened: PropTypes.bool.isRequired,
  isMobileDrawerOpened: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  toggleMobileDrawer: PropTypes.func.isRequired,
};

export default Drawer;
