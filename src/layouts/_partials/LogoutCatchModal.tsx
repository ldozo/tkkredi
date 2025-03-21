import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface LogoutCatchModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutCatchModal: React.FC<LogoutCatchModalProps> = ({
  open,
  onClose,
  onLogout,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Oturumu Kapat</DialogTitle>
      <DialogContent>
        Oturumu kapatmak istediğinizden emin misiniz?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          İptal
        </Button>
        <Button onClick={onLogout} color="primary" variant="contained">
          Oturumu Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutCatchModal;
