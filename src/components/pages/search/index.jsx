import React, { useEffect, useState, useCallback } from 'react';
import Pagination from 'material-ui-flat-pagination';
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SearchResultListItemDetailsDialog from './search-result-list-item-details-dialog';
import Waiting from '../../widgets/waiting';
import SearchResultList from './search-result-list';

import {
  getSearchResults,
  getSearchNumberOfPages,
  getSearchPage,
  getSearchQuery,
  getSearchQueryInProgress,
  search,
  checkSearch,
  clearSearchStore,
} from '../../../store/search';

import useStyles from './styles';

const Search = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const results = useSelector(getSearchResults);
  const numberOfPages = useSelector(getSearchNumberOfPages);
  const page = useSelector(getSearchPage);
  const query = useSelector(getSearchQuery);
  const searchQueryInProgress = useSelector(getSearchQueryInProgress);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPage, selectPage] = useState(null);

  const handlePageSelect = useCallback((e, offset) => {
    dispatch(search({ page: offset + 1 }));
    selectPage(offset);
  }, [dispatch]);

  useEffect(() => {
    selectPage(page - 1);
  }, [page]);

  useEffect(() => {
    dispatch(checkSearch(location, navigate));
  }, [location, navigate, dispatch]);

  useEffect(() => () => dispatch(clearSearchStore()), [dispatch]);

  return (
    <Container maxWidth="lg">
      {searchQueryInProgress ? (
        <Waiting type="content" />
      ) : (
        <>
          {results.length > 0 && !!query ? (
            <SearchResultList />
          ) : (
            <Typography>
              {t('page.search.emptyResult')}
            </Typography>
          )}
          {results.length > 0 && numberOfPages > 1 && (
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

          <SearchResultListItemDetailsDialog />
        </>
      )}
    </Container>
  );
};

export default Search;
