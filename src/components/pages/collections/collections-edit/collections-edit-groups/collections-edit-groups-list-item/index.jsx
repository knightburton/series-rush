import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowUpTwoToneIcon from '@material-ui/icons/KeyboardArrowUpTwoTone';
import KeyboardArrowDownTwoToneIcon from '@material-ui/icons/KeyboardArrowDownTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import Tooltip from '../../../../../commons/tooltip';
import ColorIndicator from '../../../../../commons/color-indicator';

import {
  setCollectionsDialogData,
  openCollectionsDialog,
} from '../../../../../../store/collections';

const CollectionsEditGroupsListItem = ({ group, onDelete }) => {
  const { t } = useTranslation();
  const { id, label, color } = group;
  const dispatch = useDispatch();

  const handleEditClick = useCallback(() => {
    dispatch(setCollectionsDialogData(group));
    dispatch(openCollectionsDialog('form'));
  }, [dispatch, group]);

  const handleDeleteClick = useCallback(() => {
    onDelete(group);
  }, [onDelete, group]);

  return (
    <Box key={id} mb={2}>
      <Card>
        <CardContent>
          <Box display="flex">
            <ColorIndicator color={color} size="small" mr />
            <Typography>
              {label || t('common::unknown')}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box ml="auto" />
          <Tooltip title={t('page.collections.edit.groups.moveUp')}>
            <IconButton>
              <KeyboardArrowUpTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('page.collections.edit.groups.moveDown')}>
            <IconButton>
              <KeyboardArrowDownTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('common::edit')}>
            <IconButton onClick={handleEditClick}>
              <EditTwoToneIcon fontSize="small" color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('common::delete')}>
            <IconButton onClick={handleDeleteClick}>
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
    color: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CollectionsEditGroupsListItem;
