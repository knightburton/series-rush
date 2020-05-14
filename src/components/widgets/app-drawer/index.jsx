import React, { useContext, useCallback } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import MuiDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppDrawerContent from './app-drawer-content';

import {
  getIsMobileDrawerOpened,
  toggleMobileDrawer,
} from '../../../store/app';
import ProfileContext from '../../../contexts/profile';

import useStyles from './styles';

const Drawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobileDrawerOpened = useSelector(getIsMobileDrawerOpened);
  const { signedIn } = useContext(ProfileContext);

  const handleSelect = useCallback(() => {
    dispatch(toggleMobileDrawer());
  }, [dispatch]);

  return signedIn ? (
    <Hidden mdUp>
      <MuiDrawer
        variant="temporary"
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
        open={isMobileDrawerOpened}
        onClose={handleSelect}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <AppDrawerContent onSelect={handleSelect} />
      </MuiDrawer>
    </Hidden>
  ) : null;
};

export default Drawer;
