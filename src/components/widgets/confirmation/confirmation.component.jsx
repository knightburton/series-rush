
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Confirmation = ({ id, title, description, onAgree, toggle }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);
  const handleAgree = () => {
    hide();
    onAgree();
  };

  return (
    <>
      {toggle(show)}
      <Dialog
        open={isShown}
        onClose={hide}
        aria-labelledby={`${id}-confirmation-dialog-title`}
        aria-describedby={`${id}-confirmation-dialog-description`}
      >
        <DialogTitle id={`${id}-confirmation-dialog-title`}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`${id}-confirmation-dialog-description`}>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hide} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Confirmation.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAgree: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Confirmation;
