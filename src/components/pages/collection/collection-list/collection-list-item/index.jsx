import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import Tooltip from '../../../../commons/tooltip';

import {
  removeFromCollection,
} from '../../../../../store/collection';

const CollectionListItem = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRemoveClick = useCallback(() => {
    dispatch(removeFromCollection(id));
  }, [dispatch, id]);

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
            <IconButton onClick={handleRemoveClick}>
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
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default CollectionListItem;
