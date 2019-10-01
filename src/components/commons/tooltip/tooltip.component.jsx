import React from 'react';
import PropTypes from 'prop-types';

import MuiTooltip from '@material-ui/core/Tooltip';

const Tooltip = ({ title, children }) => (
  <MuiTooltip
    title={title}
    aria-label={title.toLowerCase().replace(/\s/g, '')}
    enterDelay={500}
  >
    {children}
  </MuiTooltip>
);

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
