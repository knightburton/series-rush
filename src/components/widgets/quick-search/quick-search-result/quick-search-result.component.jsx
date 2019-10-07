import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Rating from '@material-ui/lab/Rating';

import AddIcon from '@material-ui/icons/AddOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import Tooltip from '../../../commons/tooltip/tooltip.component';

import useStyles from './quick-serach-result.styles';

const QuickSearchResult = ({ result, hasMoreResult, searching }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      {result.length ? (
        <Box className={classes.box}>
          {result.map(({ show }) => (
            <Box key={show.id}>
              <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={3}>
                  <img
                    src={show.image ? show.image.medium : 'https://via.placeholder.com/70x98?text=...'}
                    alt={show.name}
                    className={classes.image}
                    draggable={false}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">
                    {show.name}
                  </Typography>
                  <Rating
                    name={`rating-for${show.id}`}
                    value={show.rating ? show.rating.average : 0}
                    max={10}
                    size="small"
                    readOnly
                    disabled
                  />
                  <Box className={classes.actionContainer}>
                    <Link
                      href={show.officialSite || show.url}
                      target="_blank"
                    >
                      {t('quickSearch.officialSite')}
                    </Link>
                    <Box>
                      <Tooltip title={t('quickSearch.add')}>
                        <IconButton color="primary">
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('quickSearch.showInfo')}>
                        <IconButton color="secondary">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
            </Box>
          ))}
          {hasMoreResult && (
            <Button
              size="small"
              color="primary"
              className={classes.seeAll}
            >
              {t('quickSearch.seeAll')}
            </Button>
          )}
        </Box>
      ) : (
        !searching && (
          <Typography color="primary" align="center">
            {t('quickSearch.empty')}
          </Typography>
        )
      )}
    </Paper>
  );
};

QuickSearchResult.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
  hasMoreResult: PropTypes.bool.isRequired,
  searching: PropTypes.bool.isRequired,
};

QuickSearchResult.defaultProps = {
  result: [],
};

export default QuickSearchResult;
