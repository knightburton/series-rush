import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import SearchIcon from '@material-ui/icons/SearchOutlined';

import QuickSearchResult from './quick-search-result/quick-search-result.container';

import useStyles from './quick-search.styles';

const QuickSearch = ({ seriesSearch, clearSearchResult }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [typing, setTyping] = useState(null);
  const [popup, setPopup] = useState(false);

  const handleClickAway = () => {
    setPopup(false);
    clearSearchResult();
  };

  const handleChange = value => {
    clearTimeout(typing);
    setQuery(value);
    setTyping(setTimeout(() => {
      if (value && value.length >= 3) {
        seriesSearch(value);
        setPopup(true);
      }
    }, 500));
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={`${t('common:search')}...`}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': t('common:search') }}
          value={query}
          onChange={e => handleChange(e.target.value)}
        />
        {popup && (
          <QuickSearchResult onClose={handleClickAway} />
        )}
      </div>
    </ClickAwayListener>
  );
};

QuickSearch.propTypes = {
  seriesSearch: PropTypes.func.isRequired,
  clearSearchResult: PropTypes.func.isRequired,
};

export default QuickSearch;
