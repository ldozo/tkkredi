import { Box, Typography } from "@mui/material";
import React from "react";

const MyTasks: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Görevlerim
      </Typography>
      <Typography color="text.secondary">
        Bu sayfa yakında güncellenecektir.
      </Typography>
    </Box>
  );
};

export default MyTasks;
