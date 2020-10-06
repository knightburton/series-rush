import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { getHelmetTitle } from '../../../utils/location';

const AppHeader = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const title = useMemo(() => getHelmetTitle(pathname), [pathname]);
  const helmetTitle = useMemo(() => (title ? ` - ${t(title)}` : ''), [title, t]);

  return (
    <Helmet>
      <title>
        {t('title')}
        {helmetTitle}
      </title>
    </Helmet>
  );
};

export default AppHeader;
