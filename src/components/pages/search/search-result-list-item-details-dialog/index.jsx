import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';

import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';

import FormButton from '../../../commons/form-button';

import {
  getSerachResultDetailsDialogOpen,
  getSearchResultDetails,
  closeSearchResultDetailsDialog,
} from '../../../../store/search';
import {
  ITEM_TYPES,
  PARSABLE_ITEM_TYPES,
} from '../../../../constants/config';

import useStyles from './styles';

const SearchResultListItemDetailsDialog = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector(getSerachResultDetailsDialogOpen);
  const details = useSelector(getSearchResultDetails);

  const handleClose = useCallback(() => {
    dispatch(closeSearchResultDetailsDialog());
  }, [dispatch]);

  if (!details) return null;
  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={handleClose}
      classes={{
        paperFullWidth: classes.dialog,
      }}
      PaperProps={{
        classes: {
          root: classes.dialogPaper,
        },
      }}
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
        >
          {details?.name || t('common::unknown')}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <Hidden xsDown>
              <img
                src={details?.posterPath}
                alt={details?.name}
                draggable={false}
                className={classes.poster}
              />
            </Hidden>
            <Hidden smUp>
              <img
                src={details?.backdropPath}
                alt={details?.name}
                draggable={false}
                className={classes.backdrop}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <Box>
              <Typography color="textSecondary" variant="subtitle2">
                {`${t('page.search.item.premiere')}: `}
              </Typography>
              <Typography>
                {details?.premiere || t('common::unknown')}
              </Typography>
            </Box>
            {PARSABLE_ITEM_TYPES.includes(details?.type) && (
              <Box mt={1}>
                <Typography color="textSecondary" variant="subtitle2">
                  {`${t(`page.search.item.${details.type === ITEM_TYPES.TV ? 'createdBy' : 'directedBy'}`)}: `}
                </Typography>
                <Typography>
                  {details?.[details.type === ITEM_TYPES.TV ? 'createdBy' : 'directedBy']?.join(', ') || t('common::unknown')}
                </Typography>
              </Box>
            )}
            <Box mt={1}>
              <Typography color="textSecondary" variant="subtitle2">
                {`${t('page.search.item.genres')}: `}
              </Typography>
              <Typography>
                {details?.genres?.join(', ') || t('common::unknown')}
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography color="textSecondary" variant="subtitle2">
                {`${t('page.search.item.userScore')}: `}
              </Typography>
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
            </Box>
            <Box mt={1}>
              <Typography color="textSecondary" variant="subtitle2">
                {`${t('page.search.item.homepage')}: `}
              </Typography>
              <Typography>
                {details?.homepage ? (
                  <Link
                    href={details.homepage}
                    target="_blank"
                    color="secondary"
                    className={classes.homepageLink}
                  >
                    {details.homepage}
                  </Link>
                ) : (
                  t('common::unknown')
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle2">
              {`${t('page.search.item.overview')}: `}
            </Typography>
            <Typography>
              {details?.overview || t('common::unknown')}
            </Typography>
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
      </DialogContent>
      <DialogActions>
        <FormButton
          variant="text"
          color="primary"
          label={t('common::close')}
          onClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default SearchResultListItemDetailsDialog;
