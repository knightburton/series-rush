import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import useStyles from './footer.styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="caption">
          Copyright &copy; Series Rush 2019.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
