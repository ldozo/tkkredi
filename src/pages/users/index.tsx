import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

interface User {
  id: string;
  email: string;
  department: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Örnek veri - Burada API'den kullanıcı listesi gelecek
  const users: User[] = [
    {
      id: "1",
      email: "ahmet.yilmaz@tkkredi.com",
      department: "Kredi",
      createdAt: "15.03.2024",
    },
    {
      id: "2",
      email: "mehmet.demir@tkkredi.com",
      department: "Lojistik",
      createdAt: "14.03.2024",
    },
    {
      id: "3",
      email: "ayse.kaya@tkkredi.com",
      department: "Operasyon",
      createdAt: "13.03.2024",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table stickyHeader aria-label="kullanıcılar tablosu">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 300,
                    minWidth: 300,
                  }}
                >
                  E-POSTA
                </TableCell>
                <TableCell
                  sx={{
                    width: 200,
                    minWidth: 200,
                  }}
                >
                  DEPARTMAN
                </TableCell>
                <TableCell
                  sx={{
                    width: 150,
                    minWidth: 150,
                  }}
                >
                  KAYIT TARİHİ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.email}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.department}
                      </Box>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Sayfa başına satır:"
        />
      </Paper>
    </Box>
  );
};

export default Users;
