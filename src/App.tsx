import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import MainInterface from './components/MainInterface';
import TopBar from './components/TopBar';
import { ModelConfig, PerformanceMetrics } from './types';

function App() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    type: 'ollama',
    endpoint: 'http://localhost:11434',
    modelName: 'llama2',
    parameters: {
      temperature: 0.7,
      maxTokens: 2000
    }
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar 
        metrics={metrics} 
        modelConfig={modelConfig}
        onModelConfigChange={setModelConfig}
      />
      <Container maxWidth="xl" sx={{ mt: 8, mb: 4, flexGrow: 1 }}>
        <MainInterface
          modelConfig={modelConfig}
          onMetricsUpdate={setMetrics}
        />
      </Container>
    </Box>
  );
}

export default App;
