import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import SearchResultListItem from '../search-result-list-item';

import { getSearchResults } from '../../../../store/search';

const SearchResultList = () => {
  const results = useSelector(getSearchResults);

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        {results.map(result => (
          <Grid key={result.id} item xs={12} md={6}>
            <SearchResultListItem result={result} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResultList;
