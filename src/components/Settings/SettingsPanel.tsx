```typescript
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Tabs,
  Tab,
  IconButton,
  Typography,
  Button,
  Alert,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import ModelSettings from './Sections/ModelSettings';
import PromptSettings from './Sections/PromptSettings';
import AppearanceSettings from './Sections/AppearanceSettings';
import IntegrationSettings from './Sections/IntegrationSettings';
import AdvancedSettings from './Sections/AdvancedSettings';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    // Save all settings
    setHasChanges(false);
  };

  const handleRestore = () => {
    // Restore default settings
    if (window.confirm('Are you sure you want to restore default settings?')) {
      // Implement restore logic
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '500px',
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Model" />
          <Tab label="Prompts" />
          <Tab label="Appearance" />
          <Tab label="Integrations" />
          <Tab label="Advanced" />
        </Tabs>

        {/* Content */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {activeTab === 0 && <ModelSettings onChange={() => setHasChanges(true)} />}
          {activeTab === 1 && <PromptSettings onChange={() => setHasChanges(true)} />}
          {activeTab === 2 && <AppearanceSettings onChange={() => setHasChanges(true)} />}
          {activeTab === 3 && <IntegrationSettings onChange={() => setHasChanges(true)} />}
          {activeTab === 4 && <AdvancedSettings onChange={() => setHasChanges(true)} />}
        </Box>

        {/* Footer */}
        <Box sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          bgcolor: 'background.default'
        }}>
          {hasChanges && (
            <Alert severity="info" sx={{ mb: 2 }}>
              You have unsaved changes
            </Alert>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RestoreIcon />}
              onClick={handleRestore}
              sx={{ flex: 1 }}
            >
              Restore Defaults
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!hasChanges}
              sx={{ flex: 1 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SettingsPanel;
```
