import { Box, Chip, Tab, Tabs } from "@mui/material";
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

interface TaskTabsProps {
  tasks: Task[];
  tabValue: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const TaskTabs: React.FC<TaskTabsProps> = ({
  tasks,
  tabValue,
  onTabChange,
}) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs value={tabValue} onChange={onTabChange}>
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>TÜM GÖREVLER</span>
              <Chip label={tasks.length} size="small" />
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>BEKLEYEN</span>
              <Chip
                label={
                  tasks.filter((task) => task.status === "BEKLEMEDE").length
                }
                size="small"
              />
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>TAMAMLANAN</span>
              <Chip
                label={
                  tasks.filter((task) => task.status === "TAMAMLANDI").length
                }
                size="small"
              />
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>REDDEDİLEN</span>
              <Chip
                label={
                  tasks.filter((task) => task.status === "REDDEDILDI").length
                }
                size="small"
              />
            </Box>
          }
        />
      </Tabs>
    </Box>
  );
};

export default TaskTabs;
