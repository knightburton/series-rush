import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { getSearchFromQueryString } from '../../../utils';

// import useStyles from './search.styles';

const Search = ({ results, searchQuery, clearSearchQuery, search, location }) => {
  // const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    const { query, type } = getSearchFromQueryString(location.search);
    if (searchQuery !== query && type) search(query, type);
  }, [search, location.search, searchQuery]);
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
  search: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

Search.defaultProps = {
  results: [],
  searchQuery: '',
};

export default withRouter(Search);
