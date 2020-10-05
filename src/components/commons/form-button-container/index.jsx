import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

const FormButtonContainer = ({ variant, align, children }) => {
  const classes = useStyles({ variant, align });

  return (
    <div className={classes.container} noValidate>
      {children}
    </div>
  );
};

FormButtonContainer.propTypes = {
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
  align: PropTypes.oneOf(['left', 'center', 'right', 'space']),
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node.isRequired),
  ]).isRequired,
};

FormButtonContainer.defaultProps = {
  variant: 'vertical',
  align: 'left',
};

export default memo(FormButtonContainer);
