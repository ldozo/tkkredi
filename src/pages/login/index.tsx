import logo from "@/assets/logo.png";
import OutlinedButton from "@/components/OutlinedButton";
import TextField from "@/components/TextField";
import { authService } from "@/services/auth.service";
import { authStore } from "@/stores/auth.store";
import { getEnv } from "@/utils/env";
import { Alert, Box, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi gereklidir"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  console.log("import.meta.env", getEnv());
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        const response = await authService.login({
          email: values.email,
        });

        if (response.success && response.data) {
          authStore.setToken(response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/tasks");
        } else {
          if (response.message === "Invalid email") {
            setError("Kullanıcı bulunamadı");
          } else {
            setError(response.message || "Giriş işlemi başarısız oldu");
          }
        }
      } catch (err) {
        setError("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F5F5F5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "180px",
            marginBottom: "2rem",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#0B5D1E",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              height: "3px",
              backgroundColor: "#0B5D1E",
              borderRadius: "2px",
            },
          }}
        >
          Giriş Yap
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="E-posta"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <OutlinedButton
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
            sx={{
              height: "56px",
              fontSize: "1rem",
            }}
          >
            {formik.isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
          </OutlinedButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
