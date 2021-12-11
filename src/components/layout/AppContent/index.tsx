import Container from '@mui/material/Container';
import { AppContentProps } from '../../../interfaces/components';

const AppContent = ({ children }: AppContentProps): JSX.Element => <Container maxWidth="lg">{children}</Container>;

export default AppContent;
