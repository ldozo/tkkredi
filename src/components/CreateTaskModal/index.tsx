import { authStore } from "@/stores/auth.store";
import { taskStore } from "@/stores/task.store";
import { userStore } from "@/stores/user.store";
import { Priority } from "@/types/task.types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Başlık zorunludur")
    .min(3, "Başlık en az 3 karakter olmalıdır"),
  description: Yup.string()
    .required("Açıklama zorunludur")
    .min(10, "Açıklama en az 10 karakter olmalıdır"),
  priority: Yup.number().required("Öncelik zorunludur"),
  departmentId: Yup.string().required("Departman zorunludur"),
  assignedToId: Yup.string().required("Atanan kişi zorunludur"),
  dueDate: Yup.date()
    .required("Bitiş tarihi zorunludur")
    .min(new Date(), "Geçmiş tarih seçilemez")
    .nullable(),
});

const CreateTaskModal = observer(({ open, onClose }: CreateTaskModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = authStore.getUser();

  const initialValues = {
    title: "",
    description: "",
    priority: Priority.Low,
    departmentId: user?.departmentId || "",
    assignedToId: "",
    dueDate: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const success = await taskStore.createTask({
          ...values,
          priority: Number(values.priority),
          dueDate: values.dueDate
            ? format(values.dueDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
            : undefined,
        });

        if (success) {
          handleClose();
          enqueueSnackbar("Görev başarıyla oluşturuldu", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(
            taskStore.error || "Görev oluşturulurken bir hata oluştu",
            {
              variant: "error",
            }
          );
        }
      } catch (error) {
        enqueueSnackbar(
          error instanceof Error ? error.message : "Bir hata oluştu",
          {
            variant: "error",
          }
        );
      }
    },
  });

  useEffect(() => {
    if (open) {
      formik.resetForm({
        values: {
          title: "",
          description: "",
          priority: Priority.Low,
          departmentId: user?.departmentId || "",
          assignedToId: "",
          dueDate: null,
        },
      });
      userStore.fetchUsers();
    }
  }, [open]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  // Benzersiz departmanları al
  const departments = useMemo(() => {
    return Array.from(
      new Set(
        userStore.users.map((user) => ({
          id: user.departmentId,
          name: user.departmentName,
        }))
      )
    ).filter(
      (dept, index, self) => index === self.findIndex((d) => d.id === dept.id)
    );
  }, [userStore.users]);

  // Seçili departmana göre kullanıcıları filtrele
  const filteredUsers = useMemo(() => {
    return userStore.users.filter(
      (user) =>
        !formik.values.departmentId ||
        user.departmentId === formik.values.departmentId
    );
  }, [userStore.users, formik.values.departmentId]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Görev Oluştur</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Başlık"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              fullWidth
              required
            />
            <TextField
              label="Açıklama"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              fullWidth
              multiline
              rows={4}
              required
            />
            <FormControl
              fullWidth
              error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
              <InputLabel>Öncelik</InputLabel>
              <Select
                name="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Öncelik"
                required
              >
                <MenuItem value={Priority.Low}>Düşük</MenuItem>
                <MenuItem value={Priority.Medium}>Orta</MenuItem>
                <MenuItem value={Priority.High}>Yüksek</MenuItem>
                <MenuItem value={Priority.Critical}>Kritik</MenuItem>
              </Select>
              {formik.touched.priority && formik.errors.priority && (
                <FormHelperText>{formik.errors.priority}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={
                formik.touched.departmentId &&
                Boolean(formik.errors.departmentId)
              }
            >
              <InputLabel>Departman</InputLabel>
              <Select
                name="departmentId"
                value={formik.values.departmentId}
                onChange={(e) => {
                  formik.setFieldValue("departmentId", e.target.value);
                  formik.setFieldValue("assignedToId", ""); // Departman değişince atanan kişiyi sıfırla
                }}
                onBlur={formik.handleBlur}
                label="Departman"
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.departmentId && formik.errors.departmentId && (
                <FormHelperText>{formik.errors.departmentId}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={
                formik.touched.assignedToId &&
                Boolean(formik.errors.assignedToId)
              }
            >
              <InputLabel>Atanan Kişi</InputLabel>
              <Select
                name="assignedToId"
                value={formik.values.assignedToId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Atanan Kişi"
                required
                disabled={!formik.values.departmentId} // Departman seçilmeden atanan kişi seçilemez
              >
                {filteredUsers.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.assignedToId && formik.errors.assignedToId && (
                <FormHelperText>{formik.errors.assignedToId}</FormHelperText>
              )}
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Bitiş Tarihi"
                value={formik.values.dueDate}
                minDate={new Date()}
                onChange={(newValue) => {
                  formik.setFieldValue("dueDate", newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: Boolean(
                      formik.touched.dueDate && formik.errors.dueDate
                    ),
                    helperText:
                      formik.touched.dueDate && formik.errors.dueDate
                        ? formik.errors.dueDate
                        : "",
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Oluştur
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default CreateTaskModal;
