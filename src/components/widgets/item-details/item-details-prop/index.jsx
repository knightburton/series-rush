import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const ItemDetailsProp = ({ label, renderType, renderAlign, render }) => {
  const { t } = useTranslation();

  const value = useMemo(() => {
    if (renderType === 'component' && render) return render;
    if (renderType === 'link' && render) {
      return (
        <Link
          href={render}
          target="_blank"
          color="secondary"
          style={{
            wordBreak: 'break-all',
          }}
        >
          {render}
        </Link>
      );
    }
    if (renderType === 'text' && render) {
      return (
        <Typography align={renderAlign}>
          {render}
        </Typography>
      );
    }
    return (
      <Typography align={renderAlign}>
        {t('common::unknown')}
      </Typography>
    );
  }, [renderType, renderAlign, render, t]);

  return (
    <Box mt={1}>
      <Typography color="textSecondary" variant="subtitle2">
        {`${label}: `}
      </Typography>
      {value}
    </Box>
  );
};

ItemDetailsProp.propTypes = {
  label: PropTypes.string.isRequired,
  renderType: PropTypes.oneOf(['text', 'component', 'link']),
  renderAlign: PropTypes.oneOf(['left', 'center', 'right']),
  render: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
  ]),
};

ItemDetailsProp.defaultProps = {
  renderType: 'text',
  renderAlign: 'left',
  render: undefined,
};

export default ItemDetailsProp;
