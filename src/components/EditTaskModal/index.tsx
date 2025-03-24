import { taskStore } from "@/stores/task.store";
import { userStore } from "@/stores/user.store";
import { Task } from "@/types/task.types";
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

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const EditTaskModal: React.FC<EditTaskModalProps> = observer(
  ({ isOpen, onClose, task }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(0);
    const [assignedToId, setAssignedToId] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    useEffect(() => {
      if (isOpen && task) {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(Number(task.priority));
        setAssignedToId(task.assignedToId);
        setDepartmentId(task.departmentId);
        userStore.fetchUsers();
      }
    }, [isOpen, task]);

    const handleSubmit = async () => {
      if (!task) return;
      try {
        await taskStore.updateTask(task.id, {
          title,
          description,
          priority,
          departmentId,
          assignedToId,
        });
        handleClose();
      } catch (error) {
        console.error("Görev güncellenirken hata:", error);
      }
    };

    const handleClose = () => {
      setTitle("");
      setDescription("");
      setPriority(0);
      setAssignedToId("");
      setDepartmentId("");
      onClose();
    };

    // Benzersiz departmanları al
    const departments = Array.from(
      new Set(
        userStore.users.map((user) => ({
          id: user.departmentId,
          name: user.departmentName,
        }))
      )
    ).filter(
      (dept, index, self) => index === self.findIndex((d) => d.id === dept.id)
    );

    if (!task) return null;

    return (
      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Görevi Düzenle</DialogTitle>
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

            <FormControl fullWidth required>
              <InputLabel>Departman</InputLabel>
              <Select
                value={departmentId}
                label="Departman"
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <MenuItem value="">Seçiniz</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
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
                {userStore.users
                  .filter(
                    (user) =>
                      !departmentId || user.departmentId === departmentId
                  )
                  .map((user) => (
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
            disabled={!title || !description || !assignedToId || !departmentId}
          >
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default EditTaskModal;
