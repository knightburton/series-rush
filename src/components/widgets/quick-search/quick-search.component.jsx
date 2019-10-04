import React from 'react';
import { useTranslation } from 'react-i18next';

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/SearchOutlined';

import useStyles from './quick-search.styles';

const QuickSearch = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
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
      />
    </div>
  );
};

export default QuickSearch;
