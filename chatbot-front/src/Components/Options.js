import React from 'react';
import { Button, Box } from '@mui/material';

const Options = ({ options, onOptionClick }) => {
  return (
    <Box display="flex" flexDirection="column">
      {options.items.map((option, index) => (
        <Button
          key={index}
          variant="contained"
          color="primary"
          onClick={() => onOptionClick(option)}
          sx={{ mb: 1 }}
        >
          {option}
        </Button>
      ))}
    </Box>
  );
};

export default Options;
