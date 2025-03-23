import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Chip,
  IconButton,
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

interface Task {
  id: string;
  title: string;
  status: "BEKLEMEDE" | "TAMAMLANDI" | "REDDEDILDI";
  assignee: string;
  department: string;
  dueDate: string;
  taskId: string;
}

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onCopyTaskId: (e: React.MouseEvent, taskId: string) => void;
  getStatusColor: (status: Task["status"]) => "warning" | "success" | "error";
  onApproveTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onTaskClick,
  onCopyTaskId,
  getStatusColor,
  onApproveTask,
  onDeleteTask,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{
            display: "block",
            width: "100%",
            overflowX: "auto",
            maxWidth: "100vw",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": {
              height: 2,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: 2,
            },
          }}
        >
          <Table
            stickyHeader
            aria-label="görev tablosu"
            sx={{
              minWidth: 1100,
              tableLayout: "fixed",
              "& .MuiTableCell-root": {
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                backgroundColor: "white",
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 100,
                    minWidth: 100,
                    position: "sticky",
                    left: 0,
                    backgroundColor: "white",
                    zIndex: 3,
                    whiteSpace: "nowrap",
                  }}
                  align="center"
                >
                  GÖREV ID
                </TableCell>
                <TableCell align="center" sx={{ width: 150, minWidth: 150 }}>
                  DURUM
                </TableCell>
                <TableCell align="center" sx={{ width: 250, minWidth: 300 }}>
                  BAŞLIK
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 100,
                    minWidth: 100,
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  DEPARTMAN
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 250,
                    minWidth: 250,
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  OLUŞTURAN
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 100,
                    minWidth: 100,
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  TARİH
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: 120,
                    minWidth: 120,
                    position: "sticky",
                    right: 0,
                    backgroundColor: "white",
                    zIndex: 3,
                  }}
                >
                  İŞLEMLER
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ border: 0, height: "60px", backgroundColor: "white" }}
                  >
                    Gösterilecek veri bulunamadı
                  </TableCell>
                </TableRow>
              ) : (
                tasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell align="center">
                        <Tooltip
                          title="ID'yi kopyalamak için tıklayın"
                          placement="top"
                        >
                          <Box
                            onClick={(e) => onCopyTaskId(e, task.taskId)}
                            sx={{
                              cursor: "copy",
                              "&:hover": { color: "primary.main" },
                            }}
                          >
                            {task.taskId}
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={task.status}
                          color={getStatusColor(task.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={task.title} placement="top">
                          <Box
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {task.title}
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.department}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={task.assignee} placement="top">
                          <Box
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {task.assignee}
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.dueDate}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 0.25,
                          }}
                        >
                          {task.status === "BEKLEMEDE" && (
                            <Tooltip title="Görevi Onayla">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onApproveTask?.(task);
                                }}
                                sx={{ color: "#2e7d32" }}
                              >
                                <CheckCircleIcon sx={{ fontSize: "1.2rem" }} />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Detayı Gör">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                onTaskClick(task);
                              }}
                              sx={{ color: "#006F3C" }}
                            >
                              <VisibilityIcon sx={{ fontSize: "1.2rem" }} />
                            </IconButton>
                          </Tooltip>
                          {task.status === "BEKLEMEDE" && (
                            <Tooltip title="Görevi Sil">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteTask?.(task);
                                }}
                                sx={{ color: "#d32f2f" }}
                              >
                                <CancelIcon sx={{ fontSize: "1.2rem" }} />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
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

export default TaskTable;
