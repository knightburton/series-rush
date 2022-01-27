import Box from '@mui/material/Box';

export interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps): JSX.Element => {
  return (
    <Box role="tabpanel" hidden={value !== index} id={`core-tab-panel-${index}`} aria-labelledby={`core-tab-panel-${index}`} sx={{ mt: 2 }}>
      {value === index && children}
    </Box>
  );
};

export default TabPanel;
