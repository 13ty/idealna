```typescript
import React, { useState } from 'react';
import { Box, Paper, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Draggable from 'react-draggable';

const FloatingWrapper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: '400px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const DragHandle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  cursor: 'move',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

interface FloatingContainerProps {
  children: React.ReactNode;
}

const FloatingContainer: React.FC<FloatingContainerProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <Draggable 
      handle=".drag-handle"
      bounds="parent"
      position={position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
    >
      <FloatingWrapper elevation={3}>
        <DragHandle className="drag-handle">
          <DragIndicatorIcon fontSize="small" />
          <IconButton 
            size="small" 
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{ color: 'inherit' }}
          >
            {isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </DragHandle>
        
        <Collapse in={isExpanded}>
          {children}
        </Collapse>
      </FloatingWrapper>
    </Draggable>
  );
};

export default FloatingContainer;
```
