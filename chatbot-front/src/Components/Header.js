import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onMenuClick }) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center">
      <IconButton color="primary" onClick={onMenuClick}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
