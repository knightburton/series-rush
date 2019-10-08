import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/SearchOutlined';

import useStyles from './quick-search.styles';

import useForm from '../../../hooks/useForm';

const QuickSearch = ({ seriesSearch }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema: { query: { value: '', error: '' } },
    callback: ({ query }) => seriesSearch(query),
  });

  return (
    <form noValidate onSubmit={handleSubmit} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={`${t('common:quickSearch')}...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': t('common:quickSearch') }}
        value={state.query.value}
        onChange={handleChange}
        autoComplete="off"
        id="query"
        name="query"
        type="search"
      />
    </form>
  );
};

QuickSearch.propTypes = {
  seriesSearch: PropTypes.func.isRequired,
};

export default QuickSearch;
