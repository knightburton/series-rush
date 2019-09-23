import React from 'react';

import Button from '@material-ui/core/Button';

import useStyles from './social-buttons.styles';

const SocialButtons = () => {
  const classes = useStyles();

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Facebook
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Google
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Twitter
      </Button>
    </>
  );
};

export default SocialButtons;
