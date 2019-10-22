import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import SearchResult from '../search-result/search-result.container';

import useStyles from './search-results.styles';

const SearchResults = ({ results }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.grid}>
      {results.map(result => (
        <Grid key={result.id} item xs={12} md={6}>
          <SearchResult result={result} />
        </Grid>
      ))}
    </Grid>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
