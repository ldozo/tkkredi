import { taskStore } from "@/stores/task.store";
import { Priority, TaskStatus } from "@/types/task.types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const TaskList = observer(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, task: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (!selectedTask) return;

    let success = false;
    switch (newStatus) {
      case TaskStatus.Completed:
        success = await taskStore.approveTask(selectedTask.id);
        break;
      case TaskStatus.Rejected:
        success = await taskStore.rejectTask(selectedTask.id);
        break;
      case TaskStatus.InProgress:
        success = await taskStore.updateTask(selectedTask.id, {
          ...selectedTask,
          status: TaskStatus.InProgress,
        });
        break;
      default:
        break;
    }

    if (success) {
      handleMenuClose();
    }
  };

  const getFilteredTasks = () => {
    if (taskStore.currentTab === "all") {
      return taskStore.getFilteredTasks();
    }
    return taskStore
      .getFilteredTasks()
      .filter((task) => task.status === Number(taskStore.currentTab));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {getFilteredTasks().map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" component="div">
                    {task.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, task)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography color="text.secondary" gutterBottom>
                  {task.description}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={taskStore.getStatusLabel(
                      Number(task.status) as TaskStatus
                    )}
                    color={taskStore.getStatusColor(
                      Number(task.status) as TaskStatus
                    )}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={taskStore.getPriorityLabel(
                      Number(task.priority) as Priority
                    )}
                    color={taskStore.getPriorityColor(
                      Number(task.priority) as Priority
                    )}
                    size="small"
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Atanan: {task.assignedToName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Departman: {task.departmentName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bitiş Tarihi:{" "}
                    {format(new Date(task.dueDate), "dd MMMM yyyy", {
                      locale: tr,
                    })}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedTask?.status === TaskStatus.Assigned && (
          <MenuItem onClick={() => handleStatusChange(TaskStatus.InProgress)}>
            Devam Et
          </MenuItem>
        )}
        {selectedTask?.status === TaskStatus.InProgress && (
          <>
            <MenuItem onClick={() => handleStatusChange(TaskStatus.Completed)}>
              Tamamla
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange(TaskStatus.Rejected)}>
              Reddet
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
});

export default TaskList;
