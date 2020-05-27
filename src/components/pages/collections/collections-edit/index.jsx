import React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import KeyboardArrowUpTwoToneIcon from '@material-ui/icons/KeyboardArrowUpTwoTone';
import KeyboardArrowDownTwoToneIcon from '@material-ui/icons/KeyboardArrowDownTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import PageTitle from '../../../commons/page-title';
import Tooltip from '../../../commons/tooltip';

import {
  getGroupsByType,
} from '../../../../store/collections';

const CollectionsEdit = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const groups = useSelector(getGroupsByType(type));

  return (
    <Container maxWidth="lg">
      <PageTitle title={t(`page.collections.edit.${type}Groups`)} />
      {groups.map(group => (
        <Card key={group.id}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography>
                  {group.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                Color chooser...
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Box ml="auto" />
            <Tooltip title={t('page.collections.edit.moveUp')}>
              <IconButton>
                <KeyboardArrowUpTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('page.collections.edit.moveDown')}>
              <IconButton>
                <KeyboardArrowDownTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('common::delete')}>
              <IconButton>
                <DeleteTwoToneIcon fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      ))}
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={2}
      >
        <Tooltip title={t('page.collections.edit.addGroup')}>
          <IconButton>
            <AddCircleTwoToneIcon fontSize="large" color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default CollectionsEdit;
