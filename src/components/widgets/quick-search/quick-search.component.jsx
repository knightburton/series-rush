import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import SearchIcon from '@material-ui/icons/SearchOutlined';

import useStyles from './quick-search.styles';

const QuickSearch = ({ serachResult, seriesSearch }) => {
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
          <Paper className={classes.resultPaper}>
            {serachResult.length ? (
              <Typography>Result...</Typography>
            ) : (
              <Typography color="primary" align="center">
                {t('appbar.search.empty')}
              </Typography>
            )}
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  );
};

QuickSearch.propTypes = {
  serachResult: PropTypes.arrayOf(PropTypes.object),
  seriesSearch: PropTypes.func.isRequired,
};

QuickSearch.defaultProps = {
  serachResult: [],
};

export default QuickSearch;
