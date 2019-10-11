import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

import { APP_PATHS } from '../../../../constants/paths';

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
        <MenuItem component={Link} to={APP_PATHS.PROFILE} onClick={() => setAnchor(null)}>
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
          <RigthIcon fontSize="small" color="disabled" className={classes.rightIcon} />
        </MenuItem>
        <MenuItem onClick={() => handleSignOut()}>
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
  signOut: PropTypes.func.isRequired,
  setAnchor: PropTypes.func.isRequired,
  anchor: PropTypes.object,
};

AppBarProfileMenu.defaultProps = {
  anchor: null,
};

export default AppBarProfileMenu;
