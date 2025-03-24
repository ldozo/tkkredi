import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { taskStore } from "../../stores/task.store";
import { userStore } from "../../stores/user.store";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentId: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = observer(
  ({ isOpen, onClose, departmentId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(0);
    const [assignedToId, setAssignedToId] = useState("");

    useEffect(() => {
      if (isOpen) {
        userStore.fetchUsers();
      }
    }, [isOpen]);

    const handleSubmit = async () => {
      try {
        await taskStore.createTask({
          title,
          description,
          priority,
          departmentId,
          assignedToId,
        });
        handleClose();
      } catch (error) {
        console.error("Görev oluşturulurken hata:", error);
      }
    };

    const handleClose = () => {
      setTitle("");
      setDescription("");
      setPriority(0);
      setAssignedToId("");
      onClose();
    };

    return (
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Yeni Görev Oluştur</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Öncelik</InputLabel>
              <Select
                value={priority}
                label="Öncelik"
                onChange={(e) => setPriority(Number(e.target.value))}
              >
                <MenuItem value={0}>Düşük</MenuItem>
                <MenuItem value={1}>Orta</MenuItem>
                <MenuItem value={2}>Yüksek</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Atanan Kişi</InputLabel>
              <Select
                value={assignedToId}
                label="Atanan Kişi"
                onChange={(e) => setAssignedToId(e.target.value)}
                required
              >
                <MenuItem value="">Seçiniz</MenuItem>
                {userStore.users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {taskStore.error && (
              <Typography color="error">{taskStore.error}</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!title || !description || !assignedToId}
          >
            Oluştur
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default CreateTaskModal;
