import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import CustomThemeContext from '../../../../contexts/customTheme';

const ThemeSelector = (): JSX.Element => {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useContext(CustomThemeContext);
  const [title, Icon] = useMemo<[string, React.ElementType]>(
    () => [t(`appBar.${colorMode === 'light' ? 'turnOffLight' : 'turnOnLight'}`), colorMode === 'light' ? DarkModeOutlinedIcon : LightModeOutlinedIcon],
    [colorMode, t],
  );

  return (
    <Tooltip title={title}>
      <IconButton onClick={toggleColorMode} color="inherit">
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSelector;
