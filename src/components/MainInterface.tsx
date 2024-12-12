import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ModelConfig, PerformanceMetrics, ResponseSegment } from '../types';
import { ModelService } from '../services/ModelService';
import SegmentedResponse from './SegmentedResponse';
import FinalIdea from './FinalIdea';

interface MainInterfaceProps {
  modelConfig: ModelConfig;
  onMetricsUpdate: (metrics: PerformanceMetrics) => void;
}

const MainInterface: React.FC<MainInterfaceProps> = ({
  modelConfig,
  onMetricsUpdate
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [segments, setSegments] = useState<ResponseSegment[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<ResponseSegment[]>([]);

  const handleGenerate = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const modelService = new ModelService(modelConfig);
      const { segments, metrics } = await modelService.generate(input);
      
      setSegments(segments);
      onMetricsUpdate(metrics);
    } catch (error) {
      console.error('Generation failed:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
      <Box sx={{ flex: 1 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Describe Your App Idea
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your app idea description..."
            disabled={isLoading}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
            >
              Generate Ideas
            </Button>
          </Box>
        </Paper>

        <SegmentedResponse
          segments={segments}
          onSegmentSelect={(segment) => {
            setSelectedSegments([...selectedSegments, segment]);
          }}
        />
      </Box>

      <FinalIdea
        segments={selectedSegments}
        onRemoveSegment={(segmentId) => {
          setSelectedSegments(segments => 
            segments.filter(s => s.id !== segmentId)
          );
        }}
      />
    </Box>
  );
};

export default MainInterface;
