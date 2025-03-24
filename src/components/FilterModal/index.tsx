import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    searchTerm: string;
    statusFilter: string;
    priorityFilter: string;
  };
  onFiltersChange: (filters: {
    searchTerm: string;
    statusFilter: string;
    priorityFilter: string;
  }) => void;
  onApply: () => void;
  onReset: () => void;
  statuses: string[];
  priorities: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApply,
  onReset,
  statuses,
  priorities,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Filtrele</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Görev ara..."
            value={filters.searchTerm}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchTerm: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Durum</InputLabel>
            <Select
              value={filters.statusFilter}
              label="Durum"
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  statusFilter: e.target.value,
                })
              }
            >
              <MenuItem value="all" sx={{ justifyContent: "flex-start" }}>
                Tümü
              </MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Öncelik</InputLabel>
            <Select
              value={filters.priorityFilter}
              label="Öncelik"
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  priorityFilter: e.target.value,
                })
              }
            >
              <MenuItem value="all" sx={{ justifyContent: "flex-start" }}>
                Tümü
              </MenuItem>
              {priorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReset}>Sıfırla</Button>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={onApply} variant="contained">
          Uygula
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
