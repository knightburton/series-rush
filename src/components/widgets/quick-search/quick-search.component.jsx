import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import SearchIcon from '@material-ui/icons/SearchOutlined';

import QuickSearchResult from './quick-search-result/quick-search-result.container';

import useStyles from './quick-search.styles';

const QuickSearch = ({ seriesSearch }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [query, changeQuery] = useState('');
  const [popup, setPopup] = useState(false);

  const handleChange = value => {
    if (value && value.length >= 3) {
      seriesSearch(value);
      setPopup(true);
    }
    changeQuery(value);
  };

  const handleClickAway = () => {
    setPopup(false);
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
          <QuickSearchResult />
        )}
      </div>
    </ClickAwayListener>
  );
};

QuickSearch.propTypes = {
  seriesSearch: PropTypes.func.isRequired,
};

export default QuickSearch;
