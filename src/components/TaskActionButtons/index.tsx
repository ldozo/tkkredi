import { authStore } from "@/stores/auth.store";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

interface TaskActionButtonsProps {
  taskId: string;
  status: string;
  onView: (taskId: string) => void;
  onApprove: (taskId: string) => void;
  onReject: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  createdById: string;
  assignedToId: string;
  departmentId: string;
  currentTab: number;
}

const TaskActionButtons: React.FC<TaskActionButtonsProps> = ({
  taskId,
  status,
  onView,
  onApprove,
  onReject,
  onEdit,
  createdById,
  assignedToId,
  departmentId,
  currentTab,
}) => {
  const user = authStore.getUser();
  if (!user) return null;

  const canApprove = assignedToId === user.id;
  const canEdit = createdById === user.id && currentTab === 2;

  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
      <Tooltip title="Görüntüle">
        <IconButton
          size="small"
          onClick={() => onView(taskId)}
          sx={{ color: "primary.main" }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {canEdit && (
        <Tooltip title="Düzenle">
          <IconButton
            size="small"
            onClick={() => onEdit(taskId)}
            sx={{ color: "warning.main" }}
          >
            <EditNoteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {canApprove && status === "0" && (
        <>
          <Tooltip title="Onayla">
            <IconButton
              size="small"
              onClick={() => onApprove(taskId)}
              sx={{ color: "success.main" }}
            >
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reddet">
            <IconButton
              size="small"
              onClick={() => onReject(taskId)}
              sx={{ color: "error.main" }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default TaskActionButtons;
