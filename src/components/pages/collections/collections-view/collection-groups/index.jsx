import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import ChipArray from '../../../../commons/chip-array';
import Tooltip from '../../../../commons/tooltip';

import {
  getGroupsByType,
  getSelectedGroupByType,
  collectionSelectGroup,
} from '../../../../../store/collections';
import { APP_PATHS } from '../../../../../constants/paths';

const CollectionGroups = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groups = useSelector(getGroupsByType(type));
  const selectedGroup = useSelector(getSelectedGroupByType(type));

  const handleChipClick = useCallback(key => {
    dispatch(collectionSelectGroup(type, key));
  }, [dispatch, type]);

  const handleEditClick = useCallback(() => {
    navigate(APP_PATHS.COLLECTIONS_EDIT.to.replace(':type', type));
  }, [navigate, type]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
      mb={1}
    >
      <ChipArray
        items={groups}
        breakpoint="xs"
        selected={selectedGroup}
        onClick={handleChipClick}
      />
      <Tooltip title={t('page.collections.edit.groups.title', { type })}>
        <IconButton onClick={handleEditClick}>
          <EditTwoToneIcon
            fontSize="small"
            color="primary"
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CollectionGroups;
