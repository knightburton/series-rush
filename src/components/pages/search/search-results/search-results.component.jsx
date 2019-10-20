import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { SEARCH_TYPES } from '../../../../constants/config';

import useStyles from './search-results.styles';

const SearchResults = ({ results }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {results.map(result => (
        <Grid key={result.id} item xs={12} md={6}>
          {result.type === SEARCH_TYPES.TV && (
            <Card className={classes.card}>
              <img
                src={result.poster}
                alt={result.name}
                draggable={false}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="p">
                  {result.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {result.premiere}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    premiere: PropTypes.string,
    poster: PropTypes.string,
    overview: PropTypes.string,
    vote: PropTypes.number,
  })).isRequired,
};

export default SearchResults;
