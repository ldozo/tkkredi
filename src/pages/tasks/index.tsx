import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { Column } from "../../components/DataTable";
import FilterModal from "../../components/FilterModal";
import TaskActionButtons from "../../components/TaskActionButtons";
import TaskDetailModal from "../../components/TaskDetailModal";
import { authStore } from "../../stores/auth.store";
import { taskStore } from "../../stores/task.store";

const Tasks: React.FC = observer(() => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    searchTerm: "",
    statusFilter: "all",
    priorityFilter: "all",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = authStore.getToken();
        if (!token) {
          navigate("/login");
          return;
        }
        await taskStore.fetchTasks();
      } catch (err: any) {
        if (err.response?.status === 401) {
          authStore.clearToken();
          navigate("/login");
        }
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenFilterModal = () => {
    setTempFilters({
      searchTerm,
      statusFilter,
      priorityFilter,
    });
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    setSearchTerm(tempFilters.searchTerm);
    setStatusFilter(tempFilters.statusFilter);
    setPriorityFilter(tempFilters.priorityFilter);
    setIsFilterModalOpen(false);
  };

  const handleResetFilters = () => {
    setTempFilters({
      searchTerm: "",
      statusFilter: "all",
      priorityFilter: "all",
    });
  };

  const handleViewTask = (taskId: string) => {
    taskStore.viewTask(taskId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    taskStore.setSelectedTask(null);
  };

  const filteredTasks = taskStore.tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedToName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statuses = Array.from(
    new Set(taskStore.tasks.map((task) => task.status))
  );
  const priorities = Array.from(
    new Set(taskStore.tasks.map((task) => task.priority))
  );

  const columns: Column[] = [
    {
      id: "title",
      label: "BAŞLIK",
      minWidth: 150,
      width: 150,
    },
    {
      id: "status",
      label: "DURUM",
      minWidth: 100,
      width: 100,
      align: "center",
      render: (value) => (
        <Chip
          label={value}
          color={taskStore.getStatusColor(value)}
          size="small"
          sx={{
            fontWeight: 500,
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
      ),
    },
    {
      id: "description",
      label: "AÇIKLAMA",
      minWidth: 200,
      width: 200,
    },
    {
      id: "createdByName",
      label: "OLUŞTURAN",
      minWidth: 120,
      width: 120,
    },
    {
      id: "priority",
      label: "ÖNCELİK",
      minWidth: 100,
      width: 100,
      align: "center",
      render: (value) => (
        <Chip
          label={value}
          color={taskStore.getPriorityColor(value)}
          size="small"
          sx={{
            fontWeight: 500,
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
      ),
    },
    {
      id: "departmentName",
      label: "DEPARTMAN",
      minWidth: 150,
      width: 150,
    },
    {
      id: "assignedToName",
      label: "ATANAN",
      minWidth: 120,
      width: 120,
    },
    {
      id: "actions",
      label: "İŞLEMLER",
      minWidth: 100,
      width: 100,
      align: "center",
      render: (_, row) => (
        <TaskActionButtons
          taskId={row.id}
          status={row.status}
          onView={handleViewTask}
          onApprove={taskStore.approveTask}
          onReject={taskStore.rejectTask}
        />
      ),
    },
  ];

  if (taskStore.loading) {
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

  if (taskStore.error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography color="error">{taskStore.error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleOpenFilterModal}
        >
          Filtrele
        </Button>
      </Stack>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        filters={tempFilters}
        onFiltersChange={setTempFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        statuses={statuses}
        priorities={priorities}
      />

      <DataTable
        columns={columns}
        rows={filteredTasks}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <TaskDetailModal
        task={taskStore.selectedTask}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        getStatusColor={taskStore.getStatusColor}
        getPriorityColor={taskStore.getPriorityColor}
      />
    </Box>
  );
});

export default Tasks;
