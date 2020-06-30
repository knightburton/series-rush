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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import Tooltip from '../../../commons/tooltip';
import FormButton from '../../../commons/form-button';

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

  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
    >
      <DialogTitle>
        {details?.name || t('common::unknown')}
        <Box
          position="absolute"
          top={1}
          right={1}
        >
          <Tooltip title={t('common::close')}>
            <IconButton onClick={handleClose}>
              <HighlightOffTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <Hidden xsDown>
              <img
                src={details?.posterPath}
                alt={details?.name}
                draggable={false}
              />
            </Hidden>
            <Hidden smUp>
              <img
                src={details?.backdropPath}
                alt={details?.name}
                draggable={false}
                className={classes.backdrop}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <Box>
              <Typography color="textSecondary" variant="subtitle2">
                {`${t('page.search.item.premiere')}: `}
              </Typography>
              <Typography>
                {details?.premiere || t('common::unknown')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
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
