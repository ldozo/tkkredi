import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface OutlinedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        borderColor: "#0B5D1E",
        color: "#0B5D1E",
        "&:hover": {
          borderColor: "#0B5D1E",
          backgroundColor: "rgba(11, 93, 30, 0.04)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
