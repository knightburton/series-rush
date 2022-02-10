import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import Paper from 'components/core/Paper';
import { useSelector } from 'hooks/redux';
import { getUserDisplayName, getUserProfilePhoto } from 'store/auth';

const Profile = () => {
  const profilePhoto = useSelector<string>(getUserProfilePhoto);
  const displayName = useSelector<string>(getUserDisplayName);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ position: 'relative', pl: 20, mt: 6 }}>
        <Box
          sx={({ spacing }) => ({
            position: 'absolute',
            top: spacing(-4),
            left: spacing(2),
            p: 0.5,
            width: spacing(16),
            height: spacing(16),
            border: 1,
            borderRadius: '50%',
            borderStyle: 'dashed',
            borderColor: 'text.secondary',
            bgcolor: 'transparent',
            overflow: 'hidden',
          })}
        >
          {profilePhoto ? (
            <img src={profilePhoto} alt="User avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
              }}
            >
              <NoPhotographyOutlinedIcon color="disabled" />
            </Box>
          )}
        </Box>
        <Typography color="text.secondary" variant="h6">
          {displayName}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
