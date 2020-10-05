import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const ProjectTitle = ({ withLogo }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      {withLogo && (
        <img
          src="/logo192.png"
          alt="Series Rush"
          draggable={false}
          className={classes.logo}
        />
      )}
      <Typography variant="h6" component="h6">
        {t('title')}
      </Typography>
    </>
  );
};

ProjectTitle.propTypes = {
  withLogo: PropTypes.bool,
};

ProjectTitle.defaultProps = {
  withLogo: false,
};

export default memo(ProjectTitle);
