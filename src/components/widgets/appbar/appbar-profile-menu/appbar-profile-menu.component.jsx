import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ProfilePhoto from '../../../commons/profile-photo/profile-photo.component';

import ProfileContext from '../../../../contexts/profile';

import useStyles from './appbar-profile-menu.styles';

const AppBarProfileMenu = ({ signOut, anchor, setAnchor }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { displayName } = useContext(ProfileContext);

  const handleSignOut = () => {
    signOut();
    setAnchor(null);
  };

  return (
    <>
      <Typography variant="body2" display="block" className={classes.displayName}>
        {displayName}
      </Typography>
      <IconButton
        edge="end"
        aria-owns={anchor ? 'material-appbar' : undefined}
        aria-haspopup="true"
        onClick={e => setAnchor(e.currentTarget)}
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
        onClose={() => setAnchor(null)}
      >
        <MenuItem component={Link} to="/profile" onClick={() => setAnchor(null)}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <Typography variant="inherit">
            {t('appbar.menu.profile')}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSignOut()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography variant="inherit">
            {t('appbar.menu.signOut')}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

AppBarProfileMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
  setAnchor: PropTypes.func.isRequired,
  anchor: PropTypes.object,
};

AppBarProfileMenu.defaultProps = {
  anchor: null,
};

export default AppBarProfileMenu;
