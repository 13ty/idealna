
import React from 'react'
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  Tooltip 
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

interface SegmentSelectorProps {
  segments: Array<{
    id: string;
    content: string;
    type: string;
  }>;
  onAddSegment?: (segment: any) => void;
}

const SegmentSelector: React.FC<SegmentSelectorProps> = ({ 
  segments, 
  onAddSegment 
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Segment Selector
      </Typography>
      <Grid container spacing={2}>
        {segments.map((segment) => (
          <Grid item xs={12} md={4} key={segment.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  {segment.content}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  mt: 2 
                }}>
                  <Tooltip title="Add Segment">
                    <IconButton 
                      color="primary"
                      onClick={() => onAddSegment?.(segment)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SegmentSelector
  </bolt