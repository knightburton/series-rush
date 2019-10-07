import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

import ProjectTitle from '../../../commons/project-title/project-title.component';

const DrawerContent = () => (
  <>
    <Toolbar>
      <ProjectTitle withLogo />
    </Toolbar>
    <Divider />
  </>
);

export default DrawerContent;
