import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Confirmation = ({ id, title, description, onAgree, onDisagree, agreeLabel, disagreeLabel, toggle, open }) => {
  const { t } = useTranslation();
  const [isShown, setIsShown] = useState(false);

  const hide = useCallback(() => {
    setIsShown(false);
  }, []);

  const show = useCallback(() => {
    setIsShown(true);
  }, []);

  const handleDisagree = useCallback(() => {
    hide();
    if (onDisagree) onDisagree();
  }, [hide, onDisagree]);

  const handleAgree = useCallback(() => {
    hide();
    onAgree();
  }, [hide, onAgree]);

  const guardedOpen = useMemo(() => (open !== null ? open : isShown), [open, isShown]);

  return (
    <>
      {open === null && toggle !== null && toggle(show)}
      <Dialog
        open={guardedOpen}
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
          <Button onClick={handleDisagree} color="secondary">
            {agreeLabel || t('common::disagree')}
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            {disagreeLabel || t('common::agree')}
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
  onDisagree: PropTypes.func,
  agreeLabel: PropTypes.string,
  disagreeLabel: PropTypes.string,
  toggle: PropTypes.func,
  open: PropTypes.bool,
};

Confirmation.defaultProps = {
  onDisagree: null,
  agreeLabel: '',
  disagreeLabel: '',
  toggle: null,
  open: null,
};

export default Confirmation;
