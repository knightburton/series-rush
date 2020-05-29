import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import PageTitle from '../../../../commons/page-title';
import Tooltip from '../../../../commons/tooltip';

import CollectionsEditGroupsFormDialog from './collections-edit-groups-form-dialog';
import CollectionsEditGroupsList from './collections-edit-groups-list';

import {
  getIsNumberOfGroupsByTypeFull,
  getIsGroupFormOpen,
  openGroupForm,
  closeGroupForm,
} from '../../../../../store/collections';

const CollectionsEditGroups = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const dispatch = useDispatch();
  const isGroupFormOpen = useSelector(getIsGroupFormOpen);
  const isNumberOfGroupsByTypeFull = useSelector(getIsNumberOfGroupsByTypeFull(type));

  const handleAddGroupClick = useCallback(() => {
    dispatch(openGroupForm());
  }, [dispatch]);

  const handleFormClose = useCallback(() => {
    dispatch(closeGroupForm());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <Box pt={1}>
          <PageTitle title={t('page.collections.edit.groups.typeTitle', { type })} />
        </Box>
        <Tooltip title={t('page.collections.edit.groups.add')}>
          <Box>
            <IconButton
              onClick={handleAddGroupClick}
              disabled={!isNumberOfGroupsByTypeFull}
            >
              <AddCircleTwoToneIcon color="secondary" />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>

      <CollectionsEditGroupsList />

      <CollectionsEditGroupsFormDialog
        open={isGroupFormOpen}
        onClose={handleFormClose}
        type={type}
      />
    </Container>
  );
};

export default CollectionsEditGroups;
