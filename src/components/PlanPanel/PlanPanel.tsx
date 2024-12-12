import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
  TextField,
  Menu,
  MenuItem,
  Chip,
  Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Plan, PlanItem } from '../ResponseSegments/types';

interface PlanPanelProps {
  open: boolean;
  plan: Plan;
  onPlanUpdate: (plan: Plan) => void;
  onClose: () => void;
}

const PlanPanel: React.FC<PlanPanelProps> = ({
  open,
  plan,
  onPlanUpdate,
  onClose
}) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleStatusChange = (itemId: string, status: PlanItem['status']) => {
    const updatedPlan = {
      ...plan,
      items: plan.items.map(item =>
        item.id === itemId ? { ...item, status } : item
      ),
      updated: new Date()
    };
    onPlanUpdate(updatedPlan);
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedPlan = {
      ...plan,
      items: plan.items.filter(item => item.id !== itemId),
      updated: new Date()
    };
    onPlanUpdate(updatedPlan);
  };

  const handleUpdateNotes = (itemId: string, notes: string) => {
    const updatedPlan = {
      ...plan,
      items: plan.items.map(item =>
        item.id === itemId ? { ...item, notes } : item
      ),
      updated: new Date()
    };
    onPlanUpdate(updatedPlan);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          bgcolor: 'background.default'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Project Plan
        </Typography>
        <TextField
          fullWidth
          label="Plan Name"
          value={plan.name}
          onChange={(e) => onPlanUpdate({
            ...plan,
            name: e.target.value,
            updated: new Date()
          })}
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {plan.items.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem
              sx={{
                borderLeft: 3,
                borderColor: item.status === 'completed' 
                  ? 'success.main'
                  : item.status === 'in-progress'
                    ? 'primary.main'
                    : 'grey.300'
              }}
            >
              <DragIndicatorIcon 
                sx={{ 
                  mr: 1, 
                  cursor: 'grab',
                  color: 'text.secondary'
                }} 
              />
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      {item.content}
                    </Typography>
                    <Chip
                      label={item.type}
                      size="small"
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={item.status}
                      size="small"
                      color={
                        item.status === 'completed' ? 'success' :
                        item.status === 'in-progress' ? 'primary' :
                        'default'
                      }
                      sx={{ mr: 1 }}
                    />
                    {item.metadata?.estimatedTime && (
                      <Chip
                        label={item.metadata.estimatedTime}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
              />
              <IconButton
                size="small"
                onClick={(e) => {
                  setSelectedItem(item.id);
                  setMenuAnchor(e.currentTarget);
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </ListItem>

            <Collapse in={expandedItem === item.id}>
              <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Add notes..."
                  value={item.notes || ''}
                  onChange={(e) => handleUpdateNotes(item.id, e.target.value)}
                  size="small"
                />
              </Box>
            </Collapse>
          </React.Fragment>
        ))}
      </List>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
          setSelectedItem(null);
        }}
      >
        <MenuItem onClick={() => {
          if (selectedItem) handleStatusChange(selectedItem, 'todo');
          setMenuAnchor(null);
        }}>
          Mark as Todo
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedItem) handleStatusChange(selectedItem, 'in-progress');
          setMenuAnchor(null);
        }}>
          Mark as In Progress
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedItem) handleStatusChange(selectedItem, 'completed');
          setMenuAnchor(null);
        }}>
          Mark as Completed
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          if (selectedItem) setExpandedItem(
            expandedItem === selectedItem ? null : selectedItem
          );
          setMenuAnchor(null);
        }}>
          {expandedItem === selectedItem ? 'Hide' : 'Show'} Notes
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedItem) handleDeleteItem(selectedItem);
          setMenuAnchor(null);
        }} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            // Export or save plan
          }}
        >
          Export Plan
        </Button>
      </Box>
    </Drawer>
  );
};

export default PlanPanel;
