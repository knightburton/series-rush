import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';

import SearchIcon from '@material-ui/icons/SearchOutlined';

import useForm from '../../../hooks/useForm';

import { getSearchFromQueryString } from '../../../utils';
import { COLLECTION_TYPE } from '../../../constants/config';
import { APP_PATHS } from '../../../constants/paths';

import useStyles from './quick-search.styles';

const QuickSearch = ({ search }) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { search: searchLocation, pathname } = useLocation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema: {
      query: '',
      type: COLLECTION_TYPE.TV,
    },
    callback: ({ query, type }) => query && search({ query, type }),
  });

  const updateAllInput = useCallback((query, type) => {
    if (query) handleChange({ target: { name: 'query', value: query } });
    if (type) handleChange({ target: { name: 'type', value: type } });
  }, [handleChange]);

  const resetAllInput = useCallback(() => {
    handleChange({ target: { name: 'query', value: '' } });
    handleChange({ target: { name: 'type', value: COLLECTION_TYPE.TV } });
  }, [handleChange]);

  useEffect(() => {
    if (pathname === APP_PATHS.SEARCH) {
      const { query, type } = getSearchFromQueryString(searchLocation);
      updateAllInput(query, type);
    } else {
      resetAllInput();
    }
  }, [searchLocation, pathname, updateAllInput, resetAllInput]);

  useEffect(() => {
    inputRef.current.focus();
  }, [state.type.value]);

  return (
    <form noValidate onSubmit={handleSubmit} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon fontSize="small" />
      </div>
      <InputBase
        inputRef={inputRef}
        placeholder={`${t('common:search')}...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': t('common:search') }}
        value={state.query.value}
        onChange={handleChange}
        autoComplete="off"
        id="query"
        name="query"
        type="search"
      />
      <NativeSelect
        id="type"
        name="type"
        classes={{
          root: classes.select,
        }}
        value={state.type.value}
        onChange={handleChange}
        disableUnderline
      >
        {Object.values(COLLECTION_TYPE).map(key => (
          <option key={key} value={key}>
            {t(`quickSearch.${key}`)}
          </option>
        ))}
      </NativeSelect>
    </form>
  );
};

QuickSearch.propTypes = {
  search: PropTypes.func.isRequired,
};

export default QuickSearch;
