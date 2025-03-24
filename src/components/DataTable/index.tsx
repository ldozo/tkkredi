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
  Tooltip,
} from "@mui/material";
import React from "react";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  width?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#006F3C",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#005a31",
              },
            },
          }}
        >
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    sx={{
                      width: column.width,
                      minWidth: column.minWidth,
                      backgroundColor: "#006F3C",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      py: 1.5,
                      px: 2,
                      borderBottom: "none",
                      borderRight: "none",
                      whiteSpace: "nowrap",
                      position: "relative",
                      "&:first-of-type": {
                        borderTopLeftRadius: "8px",
                      },
                      "&:last-child": {
                        borderTopRightRadius: "8px",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: "20%",
                        height: "60%",
                        width: 0,
                      },
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#f8f9fa",
                        cursor: "pointer",
                      },
                      transition: "background-color 0.2s",
                      "& td": {
                        borderBottom: "1px solid #e0e0e0",
                      },
                      "&:last-child td": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        sx={{
                          py: 1.5,
                          px: 2,
                          fontSize: "0.875rem",
                          color: "#333",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: column.width,
                          border: "none",
                        }}
                      >
                        <Tooltip
                          title={
                            column.render
                              ? ""
                              : column.format
                              ? column.format(row[column.id])
                              : row[column.id] || ""
                          }
                          arrow
                        >
                          <Box
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {column.render
                              ? column.render(row[column.id], row)
                              : column.format
                              ? column.format(row[column.id])
                              : row[column.id]}
                          </Box>
                        </Tooltip>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Sayfa başına satır:"
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
