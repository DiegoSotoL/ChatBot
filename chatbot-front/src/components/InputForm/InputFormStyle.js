import { TextField, IconButton} from '@mui/material';
import styled from '@emotion/styled';

const CustomTextField = styled(TextField)`
  label {
    color: #39ff14;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #39ff14;
    }
    &:hover fieldset {
      border-color: #39ff14;
    }
    &.Mui-focused fieldset {
      border-color: #39ff14;
    }
  }
  .MuiInputBase-input {
    color: #39ff14;
  }
`;

const CustomIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: #39ff14;
  }
  &:hover {
    background-color: rgba(57, 255, 20, 0.15);
  }
`;
const styles = {
    CustomIconButton,
    CustomTextField

  };
  
  export default styles;