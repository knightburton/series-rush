import React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import PageTitle from '../../../../commons/page-title';
import Tooltip from '../../../../commons/tooltip';
import FormButtonContainer from '../../../../commons/form-button-container';
import FormButton from '../../../../commons/form-button';

import CollectionsEditGroupsList from './collections-edit-groups-list';

const CollectionsEditGroups = () => {
  const { t } = useTranslation();
  const { type } = useParams();

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
          <IconButton>
            <AddCircleTwoToneIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>

      <CollectionsEditGroupsList />

      <FormButtonContainer
        align="center"
        variant="horizontal"
      >
        <FormButton
          variant="outlined"
          color="primary"
          label={t('common::cancel')}
        />
        <FormButton
          variant="outlined"
          color="secondary"
          label={t('common::submit')}
        />
      </FormButtonContainer>
    </Container>
  );
};

export default CollectionsEditGroups;
