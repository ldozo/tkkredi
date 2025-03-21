import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import React from "react";

const TextField: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <MuiTextField
      sx={{
        textTransform: "none",
        color: "#0B5D1E",
        "&:hover": {
          borderColor: "#0B5D1E",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "0.7rem",
          marginLeft: "2px",
        },
      }}
      variant="outlined"
      {...props}
    />
  );
};

export default TextField;
