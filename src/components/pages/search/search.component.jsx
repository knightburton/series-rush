import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'material-ui-flat-pagination';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { getSearchFromQueryString } from '../../../utils';

import useStyles from './search.styles';

const Search = ({ results, numberOfPages, page, searchQuery, clearSearchProps, search, searchBySelectedPage, location }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedPage, selectPage] = useState(page);

  const handlePageSelect = (e, offset) => {
    searchBySelectedPage(offset + 1);
    selectPage(offset);
  };

  useEffect(() => {
    const { query, type } = getSearchFromQueryString(location.search);
    if (searchQuery !== query && type) search(query, type);
  }, [search, location.search, searchQuery]);
  useEffect(() => () => clearSearchProps(), [clearSearchProps]);

  return (
    <Container maxWidth="lg">
      {!results.length && !!searchQuery && (
        <Typography>
          {t('page.search.emptyResult')}
        </Typography>
      )}
      {results.length && numberOfPages > 1 && (
        <Pagination
          limit={1}
          total={numberOfPages}
          offset={selectedPage}
          onClick={handlePageSelect}
          classes={{
            root: classes.pagination,
          }}
        />
      )}
    </Container>
  );
};

Search.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string),
  numberOfPages: PropTypes.number,
  page: PropTypes.number,
  searchQuery: PropTypes.string,
  clearSearchProps: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchBySelectedPage: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

Search.defaultProps = {
  results: [],
  numberOfPages: null,
  page: null,
  searchQuery: '',
};

export default withRouter(Search);
