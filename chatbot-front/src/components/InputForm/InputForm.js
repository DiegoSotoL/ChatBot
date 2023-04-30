import React from 'react';
import { Box} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import styles from './InputFormStyle'



const InputForm = ({ inputValue, setInputValue, handleSubmit }) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      p={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <styles.CustomTextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        placeholder="Escribe un mensaje..."
        variant="outlined"
      />
      <styles.CustomIconButton type="submit" color="primary" disabled={!inputValue.trim()}>
        <SendIcon />
      </styles.CustomIconButton>
    </Box>
  );
};

export default InputForm;
