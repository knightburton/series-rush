import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrevious } from '@knightburton/react-hooks-toolkit';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Paper from '../../../../core/Paper';
import Title from '../../../../core/Title';
import Button from '../../../../core/Button';
import Confirmation from '../../../../core/Confirmation';
import { useSelector, useDispatch } from '../../../../../hooks/redux';
import { getInProgressByType, getUserProfilePhoto, updateProfilePhoto, deleteProfilePhoto, ProgressTypes } from '../../../../../store/auth';
import { MAX_FILE_SIZE_IN_B, MAX_FILE_SIZE_IN_MB } from '../../../../../constants/core';

const PhotoForm = (): JSX.Element => {
  const { t } = useTranslation(['translation', 'common', 'alert']);
  const [hover, setHover] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const profilePhoto = useSelector<string>(getUserProfilePhoto);
  const previousProfilePhoto = usePrevious<string>(profilePhoto);
  const deleteInProgress = useSelector<boolean>(getInProgressByType(ProgressTypes.PhotoDelete));
  const uploadInProgress = useSelector<boolean>(getInProgressByType(ProgressTypes.PhotoUpload));

  const isInProgress = useMemo<boolean>(() => deleteInProgress || uploadInProgress, [deleteInProgress, uploadInProgress]);

  const handleAdd = useCallback<() => void>(() => {
    fileInput.current?.click();
  }, []);
  const handleInputChange = useCallback<(event: React.ChangeEvent<HTMLInputElement>) => void>(event => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      setFile(input.files[0]);
      setError(input.files[0].size > MAX_FILE_SIZE_IN_B);
    }
  }, []);
  const handleUpload = useCallback<() => void>(() => {
    if (file) dispatch(updateProfilePhoto(file));
  }, [dispatch, file]);
  const handleCancel = useCallback<() => void>(() => {
    setFile(undefined);
    setError(false);
  }, []);
  const handleDeleteAgree = useCallback<() => void>(() => {
    dispatch(deleteProfilePhoto());
  }, [dispatch]);
  const confirmationToggle = useCallback<(show: () => void) => JSX.Element>(
    show => (
      <Button variant="contained" color="error" disabled={!profilePhoto || isInProgress} loading={deleteInProgress} onClick={() => show()}>
        {t('common:delete')}
      </Button>
    ),
    [t, profilePhoto, deleteInProgress, isInProgress],
  );

  useEffect(() => {
    if (profilePhoto && !previousProfilePhoto && file) setFile(undefined);
  }, [profilePhoto, previousProfilePhoto, file]);

  return (
    <Paper>
      <Title variant="secondary">{t('translation:account.image')}</Title>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Box
          sx={({ spacing }) => ({
            my: 1,
            p: 0.5,
            position: 'relative',
            width: spacing(16),
            height: spacing(16),
            border: 1,
            borderRadius: '50%',
            borderStyle: 'dashed',
            borderColor: error ? 'error.main' : 'text.secondary',
            cursor: hover && !isInProgress ? 'pointer' : 'auto',
            overflow: 'hidden',
          })}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={isInProgress ? undefined : handleAdd}
        >
          {profilePhoto && !file && <img src={profilePhoto} alt="User avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
          {file && <img src={URL.createObjectURL(file)} alt="User temporary avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
          {!profilePhoto && !file && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'action.disabled',
                borderRadius: '50%',
              }}
            >
              {!hover && (
                <>
                  <NoPhotographyOutlinedIcon color="disabled" />
                  <Typography variant="caption" color="text.secondary">
                    {t('translation:account.imageMissing')}
                  </Typography>
                </>
              )}
            </Box>
          )}
          {hover && !isInProgress && (
            <Box
              sx={({ spacing }) => ({
                position: 'absolute',
                top: spacing(0.5),
                left: spacing(0.5),
                width: `calc(100% - ${spacing(1)})`,
                height: `calc(100% - ${spacing(1)})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                opacity: 0.65,
                borderRadius: '50%',
              })}
            >
              <AddAPhotoIcon />
              <Typography variant="caption">{t('translation:account.imageAdd')}</Typography>
            </Box>
          )}
        </Box>
        {error && (
          <Typography variant="caption" color="error">
            {t('alert:maxFileSize', { limit: MAX_FILE_SIZE_IN_MB })}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          {t('translation:account.imageTypes')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {t('translation:account.imageSize', { limit: MAX_FILE_SIZE_IN_MB })}
        </Typography>
        <Input value="" inputProps={{ ref: fileInput, accept: '.jpeg,.jpg,.png,.gif' }} type="file" sx={{ display: 'none' }} onChange={handleInputChange} />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
        {file ? (
          <Button variant="contained" color="warning" onClick={handleCancel} disabled={isInProgress}>
            {t('common:cancel')}
          </Button>
        ) : (
          <Confirmation
            id="delete-profile-photo"
            title={t('translation:account.imageDelete')}
            description={t('translation:account.imageDeleteDescription')}
            onAgree={handleDeleteAgree}
            toggle={confirmationToggle}
          />
        )}

        <Button variant="contained" disabled={!file || isInProgress} loading={uploadInProgress} onClick={handleUpload}>
          {t('common:upload')}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PhotoForm;
