
import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';
import { css } from '@emotion/react';

const CenterBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;

const globalStyles = css`
  body {
    background-color: #1a1a1a;
  }
`;

const CustomContainer = styled.div`
  max-width: 25%;
  margin: 0 auto;
`;

const CustomPaper = styled(Paper)`
  background-color: #000;
`;

const styles = {
  CenterBox,
  globalStyles,
  CustomContainer,
  CustomPaper,
};

export default styles;