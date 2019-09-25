import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ProfilePhoto from '../../commons/profile-photo/profile-photo.component';

import ProfileContext from '../../contexts/profile';

import useStyles from './appbar.styles';

const AppBar = ({ signOut }) => {
  const classes = useStyles();
  const { signedIn, displayName } = useContext(ProfileContext);
  const [profileMenu, setProfileMenu] = useState(null);
  const title = 'Series Rush';

  const handleSignOut = () => {
    signOut();
    setProfileMenu(null);
  };

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Typography variant="h5">
          {title}
        </Typography>
        <Box className={classes.grow} />
        {signedIn ? (
          <>
            <Typography variant="body2" className={classes.displayName}>
              {displayName}
            </Typography>
            <IconButton
              edge="end"
              aria-owns={profileMenu ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={e => setProfileMenu(e.currentTarget)}
              color="inherit"
            >
              <ProfilePhoto size="extraSmall" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={profileMenu}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!profileMenu}
              onClose={() => setProfileMenu(null)}
            >
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <Typography variant="inherit">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/sign-in"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

AppBar.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default withRouter(AppBar);
