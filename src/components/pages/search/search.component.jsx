import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// import useStyles from './search.styles';

const Search = ({ results, searchQuery, clearSearchQuery }) => {
  // const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => () => clearSearchQuery(), [clearSearchQuery]);

  return (
    <Container maxWidth="lg">
      {!results.length && !!searchQuery && (
        <Typography>
          {t('page.search.emptyResult')}
        </Typography>
      )}
    </Container>
  );
};

Search.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  searchQuery: PropTypes.string,
  clearSearchQuery: PropTypes.func.isRequired,
};

Search.defaultProps = {
  results: [],
  searchQuery: '',
};

export default Search;
