import { authStore } from "@/stores/auth.store";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";

interface TaskActionButtonsProps {
  taskId: string;
  status: string;
  onView: (taskId: string) => void;
  onApprove: (taskId: string) => void;
  onReject: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
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
  onDelete,
  createdById,
  assignedToId,
  departmentId,
  currentTab,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = authStore.getUser();
  if (!user) return null;

  const canApprove = assignedToId === user.id && status === "0";
  const canEdit = createdById === user.id && currentTab === 2 && status !== "3";
  const canDelete = createdById === user.id && currentTab === 2;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: () => void) => {
    action();
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Tooltip title="İşlemler">
        <IconButton
          size="small"
          onClick={handleClick}
          sx={{ color: "primary.main" }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleAction(() => onView(taskId))}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          Detayı Gör
        </MenuItem>

        {canEdit && (
          <MenuItem onClick={() => handleAction(() => onEdit(taskId))}>
            <EditNoteIcon
              fontSize="small"
              sx={{ mr: 1, color: "warning.main" }}
            />
            Düzenle
          </MenuItem>
        )}

        {canApprove && (
          <>
            <MenuItem onClick={() => handleAction(() => onApprove(taskId))}>
              <CheckCircleIcon
                fontSize="small"
                sx={{ mr: 1, color: "success.main" }}
              />
              Onayla
            </MenuItem>
            <MenuItem onClick={() => handleAction(() => onReject(taskId))}>
              <CancelIcon
                fontSize="small"
                sx={{ mr: 1, color: "error.main" }}
              />
              Reddet
            </MenuItem>
          </>
        )}

        {canDelete && (
          <MenuItem onClick={() => handleAction(() => onDelete(taskId))}>
            <DeleteIcon fontSize="small" sx={{ mr: 1, color: "error.main" }} />
            Sil
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default TaskActionButtons;
