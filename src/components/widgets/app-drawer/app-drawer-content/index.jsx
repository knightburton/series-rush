import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ProjectTitle from '../../../commons/project-title/project-title.component';

import { MAIN_MENU } from '../../../../constants/navigation';
import { APP_PATHS } from '../../../../constants/paths';

import useStyles from './styles';

const DrawerContent = ({ onSelect }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isSelected = useCallback(({ path }) => pathname.includes(path), [pathname]);

  return (
    <>
      <Toolbar
        component={Link}
        to={APP_PATHS.LANDING}
        className={classes.toolbar}
        onClick={onSelect}
      >
        <ProjectTitle withLogo />
      </Toolbar>
      <Divider />
      <List className={classes.list}>
        {MAIN_MENU.map(item => (
          <ListItem
            key={item.key}
            component={Link}
            to={item.path}
            selected={isSelected(item)}
            classes={{
              selected: classes.selected,
            }}
            onClick={onSelect}
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
  onSelect: PropTypes.func.isRequired,
};

export default DrawerContent;
