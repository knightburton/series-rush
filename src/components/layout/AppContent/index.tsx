export interface AppContentProps {
  children?: React.ReactNode;
}

const AppContent = ({ children }: AppContentProps): JSX.Element => <div>{children}</div>;

export default AppContent;
