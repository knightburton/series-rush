import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '../../../core/Button';
import { useSelector, useDispatch } from '../../../../hooks/redux';
import { getIsAuthenticated, getUserAvatar, getUserAvatarCharacter, signOut } from '../../../../store/auth';

const AccountMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = useMemo<boolean>(() => Boolean(anchorEl), [anchorEl]);
  const isAuthenticated = useSelector<boolean>(getIsAuthenticated);
  const avatarSource = useSelector<string>(getUserAvatar);
  const avatarCharacter = useSelector<string>(getUserAvatarCharacter);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const handleSignOut = useCallback<() => void>(() => dispatch(signOut()), [dispatch]);
  const handleSignIn = useCallback<() => void>(() => navigate('/sign-in'), [navigate]);

  return isAuthenticated ? (
    <>
      <Tooltip title={t('appBar.accountMenu')}>
        <IconButton
          onClick={handleOpen}
          size="small"
          sx={{ ml: 1 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} src={avatarSource}>
            {avatarCharacter}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            minWidth: 280,
            maxWidth: '100%',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        MenuListProps={{
          dense: true,
        }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('appBar.signOut')} />
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Button color="inherit" onClick={handleSignIn} sx={{ ml: 1 }}>
      {t('signIn.title')}
    </Button>
  );
};

export default AccountMenu;
