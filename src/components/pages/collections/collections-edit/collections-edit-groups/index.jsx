import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import PageTitle from '../../../../commons/page-title';
import Tooltip from '../../../../commons/tooltip';

import CollectionsEditGroupsFormDialog from './collections-edit-groups-form-dialog';
import CollectionsEditGroupsList from './collections-edit-groups-list';

const CollectionsEditGroups = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const [formOpen, setFormOpen] = useState(false);

  const handleAddGroupClick = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <Box pt={1}>
          <PageTitle title={t(`page.collections.edit.${type}Groups`)} />
        </Box>
        <Tooltip title={t('page.collections.edit.addGroup')}>
          <IconButton onClick={handleAddGroupClick}>
            <AddCircleTwoToneIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>

      <CollectionsEditGroupsList />

      <CollectionsEditGroupsFormDialog
        open={formOpen}
        onClose={handleFormClose}
      />
    </Container>
  );
};

export default CollectionsEditGroups;
