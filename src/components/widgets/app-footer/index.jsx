import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const AppFooter = () => (
  <footer>
    <Box
      py={3}
      color="primary.contrastText"
      bgcolor="primary.dark"
    >
      <Container maxWidth="lg">
        <Typography variant="caption">
          Copyright &copy; Series Rush 2020.
        </Typography>
      </Container>
    </Box>
  </footer>
);

export default AppFooter;
