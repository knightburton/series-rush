import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import Form from '../../../../../commons/form';
import FormText from '../../../../../commons/form-text';
import FormSelect from '../../../../../commons/form-select';
import FormButton from '../../../../../commons/form-button';

import { addNewCollectionGroup } from '../../../../../../store/collections';
import useForm from '../../../../../../hooks/useForm';
import { GROUP_COLORS } from '../../../../../../constants/config';
import {
  stateSchema,
  validationSchema,
} from './constants';

const CollectionsEditGroupsFormDialog = ({ open, onClose, type }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: details => dispatch(addNewCollectionGroup({
      ...details,
      type,
    })),
  });

  const { label, color } = state;

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={onClose}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
    >
      <DialogTitle>
        {t('page.collections.edit.groups.add')}
      </DialogTitle>

      <Form
        onSubmit={handleSubmit}
        withoutGutters
      >
        <DialogContent>
          <DialogContentText>
            {t('page.collections.edit.groups.addDescription')}
          </DialogContentText>
          <FormText
            id="label"
            label={t('page.collections.edit.groups.label')}
            value={label.value}
            error={label.error}
            onChange={handleChange}
            required
          />
          <FormSelect
            id="color"
            label={t('page.collections.edit.groups.color')}
            value={color.value}
            error={color.error}
            onChange={handleChange}
            options={GROUP_COLORS}
            translateOptions
            required
          />
        </DialogContent>
        <DialogActions>
          <Box mx={2}>
            <FormButton
              variant="text"
              color="primary"
              label={t('common::cancel')}
              onClick={onClose}
            />
            <FormButton
              submit
              variant="text"
              color="secondary"
              label={t('common::submit')}
            />
          </Box>
        </DialogActions>
      </Form>

    </Dialog>
  );
};

CollectionsEditGroupsFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string,
};

CollectionsEditGroupsFormDialog.defaultProps = {
  type: '',
};

export default CollectionsEditGroupsFormDialog;
