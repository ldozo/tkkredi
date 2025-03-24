import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: "relative",
          overflow: "visible",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "warning.main",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WarningAmberIcon sx={{ color: "white" }} />
      </Box>
      <DialogTitle sx={{ textAlign: "center", mt: 3 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography align="center" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="inherit"
          sx={{ minWidth: 100 }}
        >
          İptal
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ minWidth: 100 }}
        >
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
