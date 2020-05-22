import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Waiting from '../../components/widgets/waiting';

import ConfigurationContext from './context';

import {
  getTmdbConfigurationDone,
  getTmdbConfiguration,
  requestTmdbConfiguration,
} from '../../store/app';

const ConfigurtionProvider = ({ children }) => {
  const dispatch = useDispatch();
  const tmdbConfigurationDone = useSelector(getTmdbConfigurationDone);
  const tmdbConfiguration = useSelector(getTmdbConfiguration);

  useEffect(() => {
    dispatch(requestTmdbConfiguration());
  }, [dispatch]);

  if (!tmdbConfigurationDone) return <Waiting type="screen" />;
  return (
    <ConfigurationContext.Provider value={{ tmdbConfiguration }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

ConfigurtionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

ConfigurtionProvider.defaultProps = {};

export default ConfigurtionProvider;
