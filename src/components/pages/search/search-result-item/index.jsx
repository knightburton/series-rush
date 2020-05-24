import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import PopupMenuButton from '../../../commons/popup-menu-button';

import {
  getGroupsByType,
  addToCollection,
} from '../../../../store/collection';
import { getEllipsisText } from '../../../../utils/text';
import { ELLIPSIS_LENGTHS } from '../../../../constants/config';

import useStyles from './styles';

const SearchResultItem = ({ result }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const type = result?.type;
  const groups = useSelector(getGroupsByType(type));

  const handleAdd = useCallback(group => {
    dispatch(addToCollection(result.id, result.type, group));
  }, [dispatch, result]);

  return (
    <Card className={classes.card}>
      <Hidden xsDown>
        <img
          src={result.posterPath}
          alt={result.name}
          draggable={false}
          className={classes.poster}
        />
      </Hidden>
      <Box className={classes.container}>
        <CardHeader
          title={result.name}
          titleTypographyProps={{
            variant: 'h6',
          }}
          subheader={result.premiere}
        />
        <Hidden smUp>
          <img
            src={result.backdropPath}
            alt={result.name}
            draggable={false}
            className={classes.backdrop}
          />
        </Hidden>
        <CardContent className={classes.content}>
          <Typography variant="body2" component="p">
            <Hidden mdDown>
              {getEllipsisText(result.overview, ELLIPSIS_LENGTHS.MD)}
            </Hidden>
            <Hidden smDown lgUp>
              {getEllipsisText(result.overview, ELLIPSIS_LENGTHS.XS)}
            </Hidden>
            <Hidden xsDown mdUp>
              {getEllipsisText(result.overview, ELLIPSIS_LENGTHS.MD)}
            </Hidden>
            <Hidden smUp>
              {result.overview}
            </Hidden>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Box className={classes.grow} />
          {groups.length > 0 && (
            <PopupMenuButton
              icon={<AddCircleTwoToneIcon />}
              menu={{
                options: groups,
                itemOnClick: handleAdd,
              }}
            />
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

SearchResultItem.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    premiere: PropTypes.string,
    posterPath: PropTypes.string,
    backdropPath: PropTypes.string,
    overview: PropTypes.string,
    vote: PropTypes.number,
  }).isRequired,
};

export default SearchResultItem;
