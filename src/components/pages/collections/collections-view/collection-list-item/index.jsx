import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import AllOutTwoToneIcon from '@material-ui/icons/AllOutTwoTone';

import Tooltip from '../../../../commons/tooltip';
import PopupMenuButton from '../../../../commons/popup-menu-button';

import {
  getGroupsByTypeExceptID,
} from '../../../../../store/collections';

const CollectionListItem = ({ item: { id, type, groupID }, onDeleteClick }) => {
  const { t } = useTranslation();
  const groups = useSelector(getGroupsByTypeExceptID(type, groupID));

  const handleMoveClick = useCallback(() => {}, []);

  const handleDeleteClick = useCallback(() => {
    onDeleteClick({ id });
  }, [onDeleteClick, id]);

  return (
    <Box mb={2}>
      <Card key={id}>
        <CardContent>
          <Typography>
            {id}
          </Typography>
        </CardContent>
        <CardActions>
          <Box ml="auto" />
          <PopupMenuButton
            title={t('page.collections.item.moveTo')}
            icon={<AllOutTwoToneIcon fontSize="small" color="primary" />}
            menu={{
              options: groups,
              itemOnClick: handleMoveClick,
            }}
          />
          <Tooltip title={t('common::delete')}>
            <IconButton onClick={handleDeleteClick}>
              <DeleteTwoToneIcon
                fontSize="small"
                color="error"
              />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
};

CollectionListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    type: PropTypes.string,
    groupID: PropTypes.string,
  }).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CollectionListItem;
