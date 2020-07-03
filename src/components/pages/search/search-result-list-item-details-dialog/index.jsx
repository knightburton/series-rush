import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormButton from '../../../commons/form-button';
import ItemDetails from '../../../widgets/item-details';

import {
  getSerachResultDetailsDialogOpen,
  getSearchResultDetails,
  closeSearchResultDetailsDialog,
} from '../../../../store/search';

import useStyles from './styles';

const SearchResultListItemDetailsDialog = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector(getSerachResultDetailsDialogOpen);
  const details = useSelector(getSearchResultDetails);

  const handleClose = useCallback(() => {
    dispatch(closeSearchResultDetailsDialog());
  }, [dispatch]);

  if (!details) return null;
  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={handleClose}
      classes={{
        paperFullWidth: classes.dialog,
      }}
      PaperProps={{
        classes: {
          root: classes.dialogPaper,
        },
      }}
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
        >
          {details?.name || t('common::unknown')}
        </Box>
      </DialogTitle>
      <DialogContent>
        <ItemDetails
          details={details}
          disableName
        />
      </DialogContent>
      <DialogActions>
        <FormButton
          variant="text"
          color="primary"
          label={t('common::close')}
          onClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default SearchResultListItemDetailsDialog;
