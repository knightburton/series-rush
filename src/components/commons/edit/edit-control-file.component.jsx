import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import Tooltip from '../tooltip/tooltip.component';
import EditControlWrapper from './edit-control-wrapper.component';

import useStlyes from './edit.styles';

const EditControlFile = ({ id, type, state: { value, error }, label, helperText, disabled, required, onChange }) => {
  const classes = useStlyes();
  const { t } = useTranslation();
  const fileInput = useRef(null);
  const fileName = (value && value.length && value[0].name) || t('alert:form/noFileSelected');

  const handleAddClick = () => fileInput.current.children[0].click();

  return (
    <>
      <Tooltip title={t('common:browse')}>
        <IconButton color="primary" onClick={handleAddClick} className={classes.addFileButton}>
          <AddPhotoIcon />
        </IconButton>
      </Tooltip>
      <EditControlWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        required={required}
      >
        <Input
          id={`${id}-text`}
          type="text"
          value={fileName}
          onChange={() => {}}
          aria-describedby={`${id}-helper-text`}
          disabled
        />
      </EditControlWrapper>
      <Input
        ref={fileInput}
        id={id}
        type={type}
        name={id}
        onChange={e => onChange({ target: { name: id, value: e.target.files } })}
        autoFocus={false}
        aria-describedby={`${id}-helper-text`}
        style={{ display: 'none' }}
      />
    </>
  );
};

EditControlFile.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    error: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditControlFile;
