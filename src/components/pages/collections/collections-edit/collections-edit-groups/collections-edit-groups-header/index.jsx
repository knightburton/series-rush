import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
  useHistory,
} from 'react-router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

import PageTitle from '../../../../../commons/page-title';
import Tooltip from '../../../../../commons/tooltip';

import {
  getIsGroupAddEnabled,
  openCollectionsDialog,
  setCollectionsDialogData,
} from '../../../../../../store/collections';
import { APP_PATHS } from '../../../../../../constants/paths';
import { ITEM_TYPES } from '../../../../../../constants/config';

const CollectionsEditGroupsHeader = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const isGroupAddEnabled = useSelector(getIsGroupAddEnabled(type));

  const handleAddGroupClick = useCallback(() => {
    dispatch(setCollectionsDialogData(null));
    dispatch(openCollectionsDialog('form'));
  }, [dispatch]);

  const handleGoBackClick = useCallback(() => {
    const route = type === ITEM_TYPES.TV
      ? APP_PATHS.COLLECTIONS_TV.path
      : APP_PATHS.COLLECTIONS_MOVIE.path;
    push(route);
  }, [push, type]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
    >
      <Box display="flex" pt={1}>
        <PageTitle title={t('page.collections.edit.groups.title')} />
      </Box>
      <Box
        display="flex"
        alignContent="center"
        alignItems="center"
      >
        {isGroupAddEnabled && (
          <Tooltip title={t('page.collections.edit.groups.add')}>
            <Box>
              <IconButton onClick={handleAddGroupClick}>
                <AddCircleTwoToneIcon color="secondary" />
              </IconButton>
            </Box>
          </Tooltip>
        )}
        <Tooltip title={t('page.collections.edit.groups.finish')}>
          <IconButton onClick={handleGoBackClick}>
            <CheckCircleTwoToneIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CollectionsEditGroupsHeader;
