import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

interface TaskActionButtonsProps {
  taskId: string;
  status: string;
  onView: (taskId: string) => void;
  onApprove: (taskId: string) => void;
  onReject: (taskId: string) => void;
}

const TaskActionButtons: React.FC<TaskActionButtonsProps> = ({
  taskId,
  status,
  onView,
  onApprove,
  onReject,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 0.5,
      }}
    >
      <Tooltip title="Detayı Gör">
        <IconButton
          size="small"
          onClick={() => onView(taskId)}
          sx={{ color: "#006F3C" }}
        >
          <VisibilityIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </Tooltip>

      {status === "BEKLEMEDE" && (
        <>
          <Tooltip title="Onayla">
            <IconButton
              size="small"
              onClick={() => onApprove(taskId)}
              sx={{ color: "#2e7d32" }}
            >
              <CheckCircleIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reddet">
            <IconButton
              size="small"
              onClick={() => onReject(taskId)}
              sx={{ color: "#d32f2f" }}
            >
              <CancelIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default TaskActionButtons;
