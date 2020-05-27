import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import KeyboardArrowUpTwoToneIcon from '@material-ui/icons/KeyboardArrowUpTwoTone';
import KeyboardArrowDownTwoToneIcon from '@material-ui/icons/KeyboardArrowDownTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import Tooltip from '../../../../../commons/tooltip';


const CollectionsEditGroupsListItem = ({ group: { id, label } }) => {
  const { t } = useTranslation();

  return (
    <Box key={id} mb={2}>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Typography>
                {label || t('common::unknown')}
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
    </Box>
  );
};

CollectionsEditGroupsListItem.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    label: PropTypes.string,
  }).isRequired,
};

export default CollectionsEditGroupsListItem;
