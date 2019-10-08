import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import AddIcon from '@material-ui/icons/AddOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import Tooltip from '../../commons/tooltip/tooltip.component';

import useStyles from './search.styles';

const Search = ({ result }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container maxWidth={false}>
      {result.length ? (
        <Grid container spacing={2}>
          {result.map(({ show }) => (
            <Grid item key={show.id} xs={12} md={6} lg={4}>
              <Paper>
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
                        href={show.officialSite || ''}
                        component={Button}
                        target="_blank"
                        disabled={!show.officialSite}
                        className={classes.officialSite}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
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
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>
          {t('page.search.emptyResult')}
        </Typography>
      )}
    </Container>
  );
};

Search.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

Search.defaultProps = {
  result: [],
};

export default Search;
