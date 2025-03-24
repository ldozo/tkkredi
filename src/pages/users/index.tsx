import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { Column } from "../../components/DataTable";
import { authStore } from "../../stores/auth.store";
import { userStore } from "../../stores/user.store";

const Users: React.FC = observer(() => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = authStore.getToken();
        if (!token) {
          navigate("/login");
          return;
        }
        await userStore.fetchUsers();
      } catch (err: any) {
        if (err.response?.status === 401) {
          authStore.clearAuth();
          navigate("/login");
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const departments = Array.from(
    new Set(userStore.users?.map((user) => user.departmentName) || [])
  );

  const filteredUsers =
    userStore.users?.filter((user) => {
      if (!searchTerm && departmentFilter === "all") return true;

      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        user.name.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower) ||
        user.departmentName.toLowerCase().includes(searchTermLower);

      const matchesDepartment =
        departmentFilter === "all" || user.departmentName === departmentFilter;

      return matchesSearch && matchesDepartment;
    }) || [];

  const columns: Column[] = [
    {
      id: "name",
      label: "AD SOYAD",
      minWidth: 200,
      width: 200,
    },
    {
      id: "email",
      label: "E-POSTA",
      minWidth: 250,
      width: 250,
    },
    {
      id: "departmentName",
      label: "DEPARTMAN",
      minWidth: 200,
      width: 200,
    },
  ];

  if (userStore.loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (userStore.error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography color="error">{userStore.error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Kullanıcı ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Departman</InputLabel>
          <Select
            value={departmentFilter}
            label="Departman"
            onChange={(e) => setDepartmentFilter(e.target.value)}
            sx={{
              "& .MuiSelect-select": {
                textAlign: "left",
              },
            }}
          >
            <MenuItem value="all" sx={{ justifyContent: "flex-start" }}>
              Tümü
            </MenuItem>
            {departments.map((dept) => (
              <MenuItem
                key={dept}
                value={dept}
                sx={{ justifyContent: "flex-start" }}
              >
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Box
        sx={{
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflow: "hidden",
          backgroundColor: "white",
          "& .MuiPaper-root": {
            boxShadow: "none",
            borderRadius: 0,
          },
          "&::-webkit-scrollbar": {
            height: "8px",
            bgcolor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#006F3C",
            borderRadius: "4px",
            "&:hover": {
              bgcolor: "#005a31",
            },
          },
        }}
      >
        <DataTable
          columns={columns}
          rows={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
});

export default Users;
