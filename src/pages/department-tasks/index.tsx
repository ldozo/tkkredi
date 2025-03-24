import { Box, Typography } from "@mui/material";
import React from "react";

const DepartmentTasks: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Departman Görevleri
      </Typography>
      <Typography color="text.secondary">
        Bu sayfa yakında güncellenecektir.
      </Typography>
    </Box>
  );
};

export default DepartmentTasks;
