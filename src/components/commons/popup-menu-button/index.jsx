import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';

const PopupMenuButton = ({ icon, color, size, disabled, menu, title }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleMenuItemClick = useCallback(id => {
    menu.itemOnClick(id);
    setOpen(false);
  }, [menu]);

  const handleToggleClick = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const handleClose = useCallback(event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  }, [anchorRef]);

  return (
    <Box>
      <IconButton
        ref={anchorRef}
        color={color}
        size={size}
        disabled={disabled}
        onClick={handleToggleClick}
      >
        {icon}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              subheader={title && (
                <ListSubheader disableSticky>
                  {title}
                </ListSubheader>
              )}
            >
              {menu.options.map(option => (
                <MenuItem
                  key={option.id}
                  onClick={() => handleMenuItemClick(option.id)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Box>
  );
};

PopupMenuButton.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  menu: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })),
    itemOnClick: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string,
};

PopupMenuButton.defaultProps = {
  color: 'default',
  size: 'medium',
  disabled: false,
  title: '',
};

export default PopupMenuButton;
