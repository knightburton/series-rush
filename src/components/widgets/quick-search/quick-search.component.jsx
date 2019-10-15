import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import SearchIcon from '@material-ui/icons/SearchOutlined';

import useForm from '../../../hooks/useForm';

import { SEARCH_TYPES } from '../../../constants/config';

import useStyles from './quick-search.styles';

const QuickSearch = ({ seriesSearch }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema: {
      query: { value: '', error: '' },
      type: { value: SEARCH_TYPES.SHOWS, error: '' },
    },
    callback: ({ query, type }) => seriesSearch(query, type),
  });

  return (
    <form noValidate onSubmit={handleSubmit} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon fontSize="small" />
      </div>
      <InputBase
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
      <Select
        id="type"
        name="type"
        classes={{
          root: classes.select,
        }}
        renderValue={selected => (
          <Typography variant="caption">
            {t(`quickSearch.${selected}`)}
          </Typography>
        )}
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

QuickSearch.propTypes = {
  seriesSearch: PropTypes.func.isRequired,
};

export default QuickSearch;
