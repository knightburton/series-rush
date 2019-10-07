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
import Hidden from '@material-ui/core/Hidden';
import Rating from '@material-ui/lab/Rating';

import AddIcon from '@material-ui/icons/AddOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import Tooltip from '../../../commons/tooltip/tooltip.component';

import useStyles from './quick-serach-result.styles';

const QuickSearchResult = ({ result, hasMoreResult, searching, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      {result.length ? (
        <Box className={classes.box}>
          {result.map(({ show }, index) => (
            <Box key={show.id}>
              <Grid container className={classes.grid}>
                <Grid item xs={3}>
                  <img
                    src={show.image ? show.image.medium : 'https://via.placeholder.com/70x98?text=...'}
                    alt={show.name}
                    className={classes.image}
                    draggable={false}
                  />
                </Grid>
                <Grid
                  item
                  container
                  xs={9}
                  direction="column"
                  justify="space-between"
                  className={classes.innerGrid}
                >
                  <Box>
                    <Typography variant="h6">
                      {show.name}
                    </Typography>
                    <Rating
                      name={`rating-for${show.id}`}
                      value={show.rating ? Math.floor(show.rating.average) : 0}
                      max={10}
                      size="small"
                      readOnly
                      disabled
                    />
                  </Box>
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
              {(hasMoreResult || index !== result.length - 1) && (
                <Divider className={classes.divider} />
              )}
            </Box>
          ))}
          <Box className={classes.buttonContainer}>
            <Hidden smUp>
              <Button
                size="small"
                color="secondary"
                onClick={onClose}
              >
                {t('common:close')}
              </Button>
            </Hidden>
            {hasMoreResult && (
              <Button
                size="small"
                color="primary"
              >
                {t('quickSearch.seeAll')}
              </Button>
            )}
          </Box>
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
  onClose: PropTypes.func.isRequired,
};

QuickSearchResult.defaultProps = {
  result: [],
};

export default QuickSearchResult;
