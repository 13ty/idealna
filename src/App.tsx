import React from 'react';
import { Box } from '@mui/material';
import FloatingContainer from './components/FloatingInterface/FloatingContainer';

function App() {
  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.default' }}>
      <FloatingContainer>
        {/* Content will be added here */}
        <Box sx={{ p: 2 }}>Initial Setup</Box>
      </FloatingContainer>
    </Box>
  );
}

export default App;
