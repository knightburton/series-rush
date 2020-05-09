import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RigthIcon from '@material-ui/icons/ChevronRightOutlined';

import ProfilePhoto from '../../../commons/profile-photo/profile-photo.component';

import ProfileContext from '../../../../contexts/profile';

import { signOut } from '../../../../store/auth';
import { APP_PATHS } from '../../../../constants/paths';


const AppBarProfileMenu = ({ anchor, setAnchor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { displayName } = useContext(ProfileContext);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
    setAnchor(null);
  }, [dispatch, setAnchor]);

  const handleMenuCLick = useCallback(e => {
    setAnchor(e.currentTarget);
  }, [setAnchor]);

  const handleMenuClose = useCallback(() => {
    setAnchor(null);
  }, [setAnchor]);

  return (
    <>
      <Box mr={0.5}>
        <Typography variant="body2" display="block">
          {displayName}
        </Typography>
      </Box>
      <IconButton
        edge="end"
        aria-owns={anchor ? 'material-appbar' : undefined}
        aria-haspopup="true"
        onClick={handleMenuCLick}
        color="inherit"
      >
        <ProfilePhoto size="extraSmall" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchor}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to={APP_PATHS.PROFILE} onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={t('appbar.menu.profile')}
            primaryTypographyProps={{
              component: 'p',
              variant: 'subtitle2',
            }}
            secondary={t('appbar.menu.profileDescription')}
          />
          <Box ml={2}>
            <RigthIcon fontSize="small" color="disabled" />
          </Box>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="large" color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={t('appbar.menu.signOut')}
            primaryTypographyProps={{
              component: 'p',
              variant: 'subtitle2',
            }}
            secondary={t('appbar.menu.signOutDescription')}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

AppBarProfileMenu.propTypes = {
  setAnchor: PropTypes.func.isRequired,
  anchor: PropTypes.object,
};

AppBarProfileMenu.defaultProps = {
  anchor: null,
};

export default AppBarProfileMenu;
