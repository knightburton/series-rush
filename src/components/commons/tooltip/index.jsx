import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

import MuiTooltip from '@material-ui/core/Tooltip';

const Tooltip = ({ title, children }) => {
  const label = useMemo(() => title.toLowerCase().replace(/\s/g, ''), [title]);

  return (
    <MuiTooltip
      title={title}
      aria-label={label}
      enterDelay={500}
    >
      {children}
    </MuiTooltip>
  );
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(Tooltip);
