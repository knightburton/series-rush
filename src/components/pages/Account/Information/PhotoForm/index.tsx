import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useSelector } from '../../../../../hooks/redux';
import { getUserAvatar } from '../../../../../store/auth';

const PhotoForm = (): JSX.Element => {
  const { t } = useTranslation();
  const [hover, setHover] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File>();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const avatar = useSelector(getUserAvatar);

  const handleAddClick = useCallback<() => void>(() => {
    fileInput.current?.click();
  }, []);
  const handleInputChange = useCallback<(event: React.ChangeEvent<HTMLInputElement>) => void>(event => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      setPhoto(file);
    }
  }, []);

  return (
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
          borderColor: 'text.secondary',
          cursor: hover ? 'pointer' : 'auto',
          overflow: 'hidden',
        })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleAddClick}
      >
        {avatar && !photo && <img src={avatar} alt="User avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
        {photo && <img src={URL.createObjectURL(photo)} alt="User temporary avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
        {!avatar && !photo && (
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
            <NoPhotographyOutlinedIcon color="disabled" />
            <Typography variant="caption" color="text.secondary">
              {t('account.imageMissing')}
            </Typography>
          </Box>
        )}
        {hover && (
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
            <Typography variant="caption">{t('account.imageAdd')}</Typography>
          </Box>
        )}
      </Box>
      <Typography variant="caption" color="text.secondary">
        {t('account.imageTypes')}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {t('account.imageSize')}
      </Typography>
      <Input inputProps={{ ref: fileInput, accept: '.jpeg,.jpg,.png,.gif' }} type="file" sx={{ display: 'none' }} onChange={handleInputChange} />
    </Stack>
  );
};

export default PhotoForm;
