import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import {
//   useDispatch,
// } from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import Tooltip from '../../../../commons/tooltip';

// import {
//   removeFromCollection,
// } from '../../../../../store/collections';

const CollectionListItem = ({ item: { id }, onDeleteClick }) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();

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
  }).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CollectionListItem;
