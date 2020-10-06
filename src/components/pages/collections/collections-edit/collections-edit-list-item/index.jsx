import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import DeleteSweepTwoToneIcon from '@material-ui/icons/DeleteSweepTwoTone';
import AllOutTwoToneIcon from '@material-ui/icons/AllOutTwoTone';

import Tooltip from '../../../../commons/tooltip';
import ColorIndicator from '../../../../commons/color-indicator';
import PopupMenuButton from '../../../../commons/popup-menu-button';

import {
  getGroupsByTypeExceptID,
  getIsGroupDeleteEnabled,
  getNumberOfItemsByTypeAndGroup,
  setCollectionsDialogData,
  openCollectionsDialog,
} from '../../../../../store/collections';
import { addAlert } from '../../../../../store/app';
import { getLocalizedDate } from '../../../../../utils/date';

const CollectionsEditListItem = ({ group, onGroupDelete, onAllItemsDelete, onAllItemsMove }) => {
  const { t } = useTranslation();
  const { id, label, color, type, createdAt } = group;
  const dispatch = useDispatch();
  const groups = useSelector(getGroupsByTypeExceptID(type, id));
  const isDeleteEnabled = useSelector(getIsGroupDeleteEnabled(type));
  const numberOfItems = useSelector(getNumberOfItemsByTypeAndGroup(type, id));
  const isDamEnabled = useMemo(() => (numberOfItems > 0), [numberOfItems]);

  const handleEditClick = useCallback(() => {
    dispatch(setCollectionsDialogData(group));
    dispatch(openCollectionsDialog('form'));
  }, [dispatch, group]);

  const handleDeleteClick = useCallback(() => {
    if (numberOfItems !== 0) dispatch(addAlert('page.collections.edit.groups.deleteWarning', 'warning'));
    else onGroupDelete(group);
  }, [onGroupDelete, group, dispatch, numberOfItems]);

  const handleDeleteAllItemsClick = useCallback(() => {
    onAllItemsDelete(group);
  }, [onAllItemsDelete, group]);

  const handleMoveAllItemsToClick = useCallback(targetGroupID => {
    onAllItemsMove({
      ...group,
      targetGroupID,
    });
  }, [onAllItemsMove, group]);

  return (
    <Box key={id} mb={2}>
      <Card>
        <CardHeader
          avatar={(
            <ColorIndicator
              color={color}
              size="small"
              mr
            />
          )}
          title={label || t('common::unknown')}
          subheader={`${t('common::createdAt')}: ${getLocalizedDate(createdAt?.toDate())}`}
          titleTypographyProps={{
            variant: 'h5',
          }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {t('page.collections.edit.groups.numberOfItems', { type, numberOfItems })}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box ml="auto" />
          {isDamEnabled && (
            <>
              <Tooltip title={t('page.collections.edit.groups.deleteAllItems')}>
                <IconButton onClick={handleDeleteAllItemsClick}>
                  <DeleteSweepTwoToneIcon fontSize="small" color="primary" />
                </IconButton>
              </Tooltip>
              {groups?.length > 0 && (
                <PopupMenuButton
                  title={t('page.collections.edit.groups.moveAllItemsTo')}
                  icon={<AllOutTwoToneIcon fontSize="small" color="primary" />}
                  menu={{
                    options: groups,
                    itemOnClick: handleMoveAllItemsToClick,
                  }}
                />
              )}
            </>
          )}
          <Tooltip title={t('common::edit')}>
            <IconButton onClick={handleEditClick}>
              <EditTwoToneIcon fontSize="small" color="secondary" />
            </IconButton>
          </Tooltip>
          {isDeleteEnabled && (
            <Tooltip title={t('common::delete')}>
              <IconButton onClick={handleDeleteClick}>
                <DeleteTwoToneIcon fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

CollectionsEditListItem.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    label: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
  onGroupDelete: PropTypes.func.isRequired,
  onAllItemsDelete: PropTypes.func.isRequired,
  onAllItemsMove: PropTypes.func.isRequired,
};

export default CollectionsEditListItem;
