import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ProjectTitle from '../../../commons/project-title/project-title.component';

import MENU from '../../../../constants/menu';
import useStyles from './drawer-content.styles';

const DrawerContent = ({ location: { pathname } }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isSelected = ({ path, exact }) => (exact ? path === pathname : pathname.includes(path));

  return (
    <>
      <Toolbar
        component={Link}
        to="/"
        className={classes.toolbar}
      >
        <ProjectTitle withLogo />
      </Toolbar>
      <Divider />
      <List className={classes.list}>
        {MENU.map(item => (
          <ListItem
            key={item.key}
            component={Link}
            to={item.path}
            selected={isSelected(item)}
            classes={{
              selected: classes.selected,
            }}
            button
          >
            <ListItemIcon className={classes.icon} color="inherit">
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={t(item.title)} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

DrawerContent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(DrawerContent);
