```typescript
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import { defaultPrompts } from '../../../config/defaultPrompts';

interface PromptSettingsProps {
  onChange: () => void;
}

const PromptSettings: React.FC<PromptSettingsProps> = ({ onChange }) => {
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [editingPrompt, setEditingPrompt] = useState<{
    key: string;
    value: string;
  } | null>(null);

  const handleEdit = (key: string, value: string) => {
    setEditingPrompt({ key, value });
  };

  const handleSave = () => {
    if (editingPrompt) {
      setPrompts(prev => ({
        ...prev,
        [editingPrompt.key]: editingPrompt.value
      }));
      setEditingPrompt(null);
      onChange();
    }
  };

  const handleRestore = (key: string) => {
    if (window.confirm('Restore default prompt?')) {
      setPrompts(prev => ({
        ...prev,
        [key]: defaultPrompts[key as keyof typeof defaultPrompts]
      }));
      onChange();
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Prompt Templates
      </Typography>

      <List>
        {Object.entries(prompts).map(([key, value]) => (
          <ListItem
            key={key}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Chip
                    label={value === defaultPrompts[key as keyof typeof defaultPrompts] 
                      ? 'Default' 
                      : 'Modified'}
                    size="small"
                    color={value === defaultPrompts[key as keyof typeof defaultPrompts] 
                      ? 'default' 
                      : 'primary'}
                  />
                </Box>
              }
              secondary={value.slice(0, 100) + '...'}
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                onClick={() => handleEdit(key, value)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                edge="end"
                onClick={() => handleRestore(key)}
                disabled={value === defaultPrompts[key as keyof typeof defaultPrompts]}
              >
                <RestoreIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={Boolean(editingPrompt)}
        onClose={() => setEditingPrompt(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit {editingPrompt?.key} Prompt
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={8}
            value={editingPrompt?.value || ''}
            onChange={(e) => setEditingPrompt(prev => prev ? {
              ...prev,
              value: e.target.value
            } : null)}
            margin="normal"
          />
          <Typography variant="caption" color="text.secondary">
            Available variables: {{variable}}, {{context}}, {{type}}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingPrompt(null)}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PromptSettings;
```
