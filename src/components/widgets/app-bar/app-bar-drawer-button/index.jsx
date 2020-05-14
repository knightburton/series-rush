import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';

import { toggleMobileDrawer } from '../../../../store/app';

const AppBarDrawerButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleButtonClick = useCallback(() => {
    dispatch(toggleMobileDrawer());
  }, [dispatch]);

  return (
    <Hidden mdUp>
      <Box mr={2}>
        <IconButton
          color="inherit"
          aria-label={t('appbar.openSidebar')}
          edge="start"
          onClick={handleButtonClick}
        >
          <MenuTwoToneIcon />
        </IconButton>
      </Box>
    </Hidden>
  );
};

export default AppBarDrawerButton;
