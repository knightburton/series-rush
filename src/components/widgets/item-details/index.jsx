import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Rating from '@material-ui/lab/Rating';

import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';

import ItemDetailsProp from './item-details-prop';

import {
  ITEM_TYPES,
  PARSABLE_ITEM_TYPES,
} from '../../../constants/config';
import useStyles from './styles';

const ItemDetails = ({ details, disableName }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box>
      {!disableName && details?.name && (
        <Typography variant="h6">
          {details.name}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs="auto">
            <Hidden xsDown>
              <img
                src={details?.posterPath}
                alt={details?.name || 'poster'}
                draggable={false}
                className={classes.poster}
              />
            </Hidden>
            <Hidden smUp>
              <img
                src={details?.backdropPath}
                alt={details?.name || 'backdrop'}
                draggable={false}
                className={classes.backdrop}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <ItemDetailsProp
              label={t('page.search.item.premiere')}
              render={details?.premiere}
            />
            {PARSABLE_ITEM_TYPES.includes(details?.type) && (
              <ItemDetailsProp
                label={t(`page.search.item.${details.type === ITEM_TYPES.TV ? 'createdBy' : 'directedBy'}`)}
                render={details?.[details.type === ITEM_TYPES.TV ? 'createdBy' : 'directedBy']?.join(', ')}
              />
            )}
            <ItemDetailsProp
              label={t('page.search.item.genres')}
              render={details?.genres?.join(', ')}
            />
            <ItemDetailsProp
              label={t('page.search.item.userScore')}
              renderType="component"
              render={(
                <Box
                  display="flex"
                  alignItems="center"
                >
                  <Rating
                    name="userScore"
                    size="small"
                    defaultValue={details?.vote || 0}
                    precision={0.1}
                    max={10}
                    emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
                    readOnly
                  />
                  <Box ml={1}>
                    <Typography component="span">
                      {details?.vote || ''}
                    </Typography>
                  </Box>
                </Box>
              )}
            />
            <ItemDetailsProp
              label={t('page.search.item.homepage')}
              renderType="link"
              render={details?.homepage}
            />
          </Grid>
        </Grid>
        {details.type === ITEM_TYPES.TV && (
          <>
            <Grid item xs={12} sm={4}>
              <ItemDetailsProp
                label={t('page.search.item.status')}
                render={details?.status}
              />
              <ItemDetailsProp
                label={t('page.search.item.showType')}
                render={details?.showType}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ItemDetailsProp
                label={t('page.search.item.numberOfSeasons')}
                render={details?.numberOfSeasons}
              />
              <ItemDetailsProp
                label={t('page.search.item.numberOfEpisodes')}
                render={details?.numberOfEpisodes}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ItemDetailsProp
                label={t('page.search.item.epidoseRunTimes')}
                render={details?.epidoseRunTimes?.[0] ? `${details?.epidoseRunTimes?.[0]}${t('common::minutesShort')}` : ''}
              />
              <ItemDetailsProp
                label={t('page.search.item.inProduction')}
                render={(details?.inProduction || details?.inProduction === false) ? t(`common::${details.inProduction}`) : ''}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <ItemDetailsProp
            label={t('page.search.item.overview')}
            render={details?.overview}
          />
        </Grid>
        {details.type === ITEM_TYPES.TV && (
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle2">
              {`${t('page.search.item.seasons')}: `}
            </Typography>
            {details?.seasons?.length > 0 ? (
              details.seasons.map((season, index) => (
                <Box mb={1} key={season.index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary">
                        {season?.name || index + 1}
                        {` (${t('page.search.item.episodes')}: ${season?.numberOfEpisodes || 0})`}
                      </Typography>
                      {season?.date && (
                        <Typography>
                          {season.date}
                        </Typography>
                      )}
                      {season?.overview && (
                        <Box mt={1}>
                          <Typography>
                            {season.overview}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              ))
            ) : (
              <Typography>
                {t('common::unknown')}
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

ItemDetails.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    posterPath: PropTypes.string,
    backdropPath: PropTypes.string,
    premiere: PropTypes.string,
    createdBy: PropTypes.arrayOf(PropTypes.string),
    directedBy: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    vote: PropTypes.number,
    homepage: PropTypes.string,
    status: PropTypes.string,
    numberOfSeasons: PropTypes.number,
    numberOfEpisodes: PropTypes.number,
    epidoseRunTimes: PropTypes.arrayOf(PropTypes.number),
    inProduction: PropTypes.bool,
    overview: PropTypes.string,
    seasons: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number,
      name: PropTypes.string,
      date: PropTypes.string,
      numberOfEpisodes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      overview: PropTypes.string,
    })),
  }),
  disableName: PropTypes.bool,
};

ItemDetails.defaultProps = {
  details: {},
  disableName: false,
};

export default ItemDetails;
