import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
import IconButton from '@material-ui/core/IconButton';

import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';

import PopupMenuButton from '../../../commons/popup-menu-button';
import Tooltip from '../../../commons/tooltip';
import ProgressCircle from '../../../commons/progress-circle';
import ProgressIconButton from '../../../commons/progress-icon-button';

import {
  getGroupsByType,
  getIsItemInCollection,
  addCollectionItem,
} from '../../../../store/collections';
import {
  getSearchResultDetailsInProgress,
  getSearchResultDetailsInProgressByID,
  fetchResultDetails,
} from '../../../../store/search';
import { getEllipsisText } from '../../../../utils/text';
import { ELLIPSIS_LENGTHS } from '../../../../constants/config';

import useStyles from './styles';

const SearchResultListItem = ({ result }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, type, vote } = result;
  const groups = useSelector(getGroupsByType(type));
  const isItemInCollection = useSelector(getIsItemInCollection(id, type));
  const detailsInProgress = !!useSelector(getSearchResultDetailsInProgress);
  const detailsInProgressByID = useSelector(getSearchResultDetailsInProgressByID(id));

  const progressValue = useMemo(() => (vote && vote * 10) || 0, [vote]);

  const handleAddClick = useCallback(group => {
    dispatch(addCollectionItem(id, type, group));
  }, [dispatch, id, type]);

  const handleDetailsClick = useCallback(() => {
    dispatch(fetchResultDetails(type, id));
  }, [dispatch, type, id]);

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
          avatar={(
            <ProgressCircle
              value={progressValue}
              mt={1}
              center={{
                text: vote,
              }}
            />
          )}
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
          <ProgressIconButton
            inProgress={detailsInProgressByID}
            disabled={detailsInProgress}
            onClick={handleDetailsClick}
            icon={(
              <InfoTwoToneIcon color="primary" />
            )}
          />
          <Box className={classes.grow} />
          {isItemInCollection ? (
            <Tooltip title={t('page.search.inCollection')}>
              <Box>
                <IconButton disabled>
                  <CheckCircleTwoToneIcon color="disabled" />
                </IconButton>
              </Box>
            </Tooltip>
          ) : groups.length > 0 && (
            <PopupMenuButton
              icon={<AddCircleTwoToneIcon />}
              title={t('page.search.addTo')}
              menu={{
                options: groups,
                itemOnClick: handleAddClick,
              }}
            />
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

SearchResultListItem.propTypes = {
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

export default SearchResultListItem;
