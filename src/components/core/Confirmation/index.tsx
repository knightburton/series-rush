import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '../Button';

export interface ConfirmationProps {
  id: string;
  title: string;
  description: string | string[];
  onAgree: () => void;
  agreeLabel?: string;
  agreeColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onDisagree?: () => void;
  disagreeLabel?: string;
  disagreeColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  toggle?: (show: () => void) => React.ReactNode | JSX.Element;
  open?: boolean;
}

const Confirmation = ({
  id,
  title,
  description,
  onAgree,
  agreeLabel,
  agreeColor = 'primary',
  onDisagree,
  disagreeLabel,
  disagreeColor = 'error',
  toggle,
  open,
}: ConfirmationProps) => {
  const { t } = useTranslation('common');
  const [isShown, setIsShown] = useState(false);

  const show = useCallback(() => setIsShown(true), []);
  const handleDisagree = useCallback(() => {
    setIsShown(false);
    if (onDisagree) onDisagree();
  }, [onDisagree]);
  const handleAgree = useCallback(() => {
    setIsShown(false);
    onAgree();
  }, [onAgree]);

  useEffect(() => {
    if (open !== undefined) setIsShown(open);
  }, [open]);

  return (
    <>
      {open === undefined && toggle?.(show)}
      <Dialog
        open={isShown}
        onClose={handleDisagree}
        onBackdropClick={handleDisagree}
        aria-labelledby={`${id}-confirmation-dialog-title`}
        aria-describedby={`${id}-confirmation-dialog-description`}
      >
        <DialogTitle id={`${id}-confirmation-dialog-title`}>{title}</DialogTitle>
        <DialogContent>
          {Array.isArray(description) ? (
            description.map((row, index) => (
              <DialogContentText key={row.replace(/\s/, '')} id={`${id}-confirmation-dialog-description-${index}`}>
                {row}
              </DialogContentText>
            ))
          ) : (
            <DialogContentText id={`${id}-confirmation-dialog-description`}>{description}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2, rowGap: 1, columnGap: 1 }}>
          <Button color={disagreeColor} variant="contained" onClick={handleDisagree}>
            {disagreeLabel || t('disagree')}
          </Button>
          <Button color={agreeColor} variant="contained" onClick={handleAgree}>
            {agreeLabel || t('agree')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Confirmation;
