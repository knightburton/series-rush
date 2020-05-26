import React, { useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

import { search } from '../../../store/search';
import useForm from '../../../hooks/useForm';

import { getSearchFromQueryString } from '../../../utils/query';
import { SEARCH_TYPES } from '../../../constants/config';
import { APP_PATHS } from '../../../constants/paths';

import useStyles from './styles';

const AppSearchBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { search: searchLocation, pathname } = useLocation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema: {
      query: '',
      type: SEARCH_TYPES.TV,
    },
    callback: ({ query, type }) => query && dispatch(search({ query, type })),
  });

  const updateAllInput = useCallback((query, type) => {
    if (query) handleChange({ target: { name: 'query', value: query } });
    if (type) handleChange({ target: { name: 'type', value: type } });
  }, [handleChange]);

  const resetAllInput = useCallback(() => {
    handleChange({ target: { name: 'query', value: '' } });
    handleChange({ target: { name: 'type', value: SEARCH_TYPES.TV } });
  }, [handleChange]);

  useEffect(() => {
    if (pathname === APP_PATHS.SEARCH.path) {
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
        <SearchTwoToneIcon fontSize="small" />
      </div>
      <InputBase
        inputRef={inputRef}
        placeholder={`${t('common::search')}...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': t('common::search') }}
        value={state.query.value}
        onChange={handleChange}
        autoComplete="off"
        id="query"
        name="query"
        type="search"
      />
      <Select
        id="type"
        name="type"
        classes={{
          root: classes.select,
        }}
        value={state.type.value}
        onChange={handleChange}
        disableUnderline
      >
        {Object.values(SEARCH_TYPES).map(key => (
          <MenuItem key={key} value={key}>
            {t(`quickSearch.${key}`)}
          </MenuItem>
        ))}
      </Select>
    </form>
  );
};

export default AppSearchBar;
