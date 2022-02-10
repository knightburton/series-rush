import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Title from 'components/core/Title';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Title>{t('profile.title')}</Title>
    </Container>
  );
};

export default Profile;
