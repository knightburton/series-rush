import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import MuiDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DrawerContent from './drawer-content/drawer-content.component';

import ProfileContext from '../../../contexts/profile';

import useStyles from './drawer.styles';

const Drawer = ({ isMobileDrawerOpened, toggleMobileDrawer }) => {
  const classes = useStyles();
  const { signedIn } = useContext(ProfileContext);

  return signedIn ? (
    <Hidden mdUp>
      <MuiDrawer
        variant="temporary"
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
        open={isMobileDrawerOpened}
        onClose={() => toggleMobileDrawer()}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerContent onSelect={toggleMobileDrawer} />
      </MuiDrawer>
    </Hidden>
  ) : null;
};

Drawer.propTypes = {
  isMobileDrawerOpened: PropTypes.bool.isRequired,
  toggleMobileDrawer: PropTypes.func.isRequired,
};

export default Drawer;
