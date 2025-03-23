import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

interface Task {
  id: string;
  title: string;
  status: "BEKLEMEDE" | "TAMAMLANDI" | "REDDEDILDI";
  assignee: string;
  department: string;
  dueDate: string;
  taskId: string;
}

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: Task["status"]) => "warning" | "success" | "error";
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  getStatusColor,
}) => {
  if (!task) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="task-detail-modal"
      aria-describedby="task-detail-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "60%" },
          maxWidth: 800,
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            backgroundColor: "#F8F9FA",
          }}
        >
          <Typography variant="h6" component="h2">
            Görev Detayı
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3, pb: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Görev ID
              </Typography>
              <Typography variant="body1">{task.taskId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Başlık
              </Typography>
              <Typography variant="body1">{task.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Durum
              </Typography>
              <Chip
                label={task.status}
                color={getStatusColor(task.status)}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Departman
              </Typography>
              <Typography variant="body1">{task.department}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Oluşturan
              </Typography>
              <Typography variant="body1">{task.assignee}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Tarih
              </Typography>
              <Typography variant="body1">{task.dueDate}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskDetailModal;
