import ConfirmationDialog from "@/components/ConfirmationDialog";
import CreateTaskModal from "@/components/CreateTaskModal";
import DataTable, { Column } from "@/components/DataTable";
import EditTaskModal from "@/components/EditTaskModal";
import FilterModal from "@/components/FilterModal";
import TaskActionButtons from "@/components/TaskActionButtons";
import TaskDetailModal from "@/components/TaskDetailModal";
import { authStore } from "@/stores/auth.store";
import { taskStore } from "@/stores/task.store";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tasks: React.FC<{}> = observer(() => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [tempFilters, setTempFilters] = useState({
    searchTerm: "",
    statusFilter: "all",
    priorityFilter: "all",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const user = authStore.getUser();

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
          authStore.clearAuth();
          navigate("/login");
        }
      }
    };

    fetchTasks();
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

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditTask = (taskId: string) => {
    taskStore.viewTask(taskId);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    taskStore.setSelectedTask(null);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setPage(0);
  };

  const handleDeleteTask = async (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);

      try {
        const success = await taskStore.deleteTask(taskToDelete);
        if (!success) {
          enqueueSnackbar(
            taskStore.error || "Görev silinirken bir hata oluştu",
            {
              variant: "error",
              anchorOrigin: { horizontal: "left", vertical: "bottom" },
              autoHideDuration: 3000,
            }
          );
          return;
        }
        enqueueSnackbar("Görev başarıyla silindi", {
          variant: "success",
          anchorOrigin: { horizontal: "left", vertical: "bottom" },
          autoHideDuration: 3000,
        });
      } catch (error) {
        enqueueSnackbar("Görev silinirken bir hata oluştu", {
          variant: "error",
          anchorOrigin: { horizontal: "left", vertical: "bottom" },
          autoHideDuration: 3000,
        });
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const filteredTasks = taskStore.tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedToName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || String(task.status) === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === Number(priorityFilter);

    // Tab filtresi
    let matchesTab = true;
    switch (currentTab) {
      case 0: // Tüm Görevler
        matchesTab = true;
        break;
      case 1: // Departman Görevleri
        matchesTab = task.departmentId === user?.departmentId;
        break;
      case 2: // Oluşturduğum Görevler
        matchesTab = task.createdByName === user?.name;
        break;
      default:
        matchesTab = true;
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesTab;
  });

  const statuses = Array.from(
    new Set(taskStore.tasks.map((task) => String(task.status)))
  );
  const priorities = Array.from(
    new Set(taskStore.tasks.map((task) => String(task.priority)))
  );

  const columns: Column[] = [
    {
      id: "title",
      label: "BAŞLIK",
      minWidth: 200,
      width: 200,
    },
    {
      id: "status",
      label: "DURUM",
      minWidth: 100,
      width: 100,
      align: "center",
      render: (value) => (
        <Chip
          label={taskStore.getStatusText(value)}
          color={taskStore.getStatusColor(value)}
          size="small"
          sx={{
            fontWeight: 500,
            borderRadius: "4px",
            width: "100px",
            "& .MuiChip-label": {
              px: 0.5,
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
      ),
    },
    {
      id: "createdByName",
      label: "OLUŞTURAN",
      minWidth: 150,
      width: 150,
    },
    {
      id: "priority",
      label: "ÖNCELİK",
      minWidth: 100,
      width: 100,
      align: "center",
      render: (value) => (
        <Chip
          label={taskStore.getPriorityText(value)}
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
      minWidth: 170,
      width: 170,
    },
    {
      id: "assignedToName",
      label: "ATANAN",
      minWidth: 150,
      width: 150,
    },
    {
      id: "actions",
      label: "İŞLEMLER",
      minWidth: 60,
      width: 60,
      align: "center",
      render: (_, row) => (
        <TaskActionButtons
          taskId={row.id}
          status={row.status}
          createdById={row.createdById}
          assignedToId={row.assignedToId}
          departmentId={row.departmentId}
          onView={handleViewTask}
          onApprove={taskStore.approveTask}
          onReject={taskStore.rejectTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, position: "relative" }}>
      {taskStore.loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            onClick={handleOpenFilterModal}
            startIcon={<FilterListIcon />}
            size="small"
          >
            Filtrele
          </Button>
        </Stack>
        <Button
          variant="contained"
          onClick={handleOpenCreateModal}
          startIcon={<AddIcon />}
          size="small"
        >
          Yeni Görev
        </Button>
      </Stack>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Tüm Görevler" />
        <Tab label="Departman Görevleri" />
        <Tab label="Oluşturduğum Görevler" />
      </Tabs>

      <DataTable
        columns={columns}
        rows={filteredTasks}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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

      <TaskDetailModal
        task={taskStore.selectedTask}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        getStatusColor={taskStore.getStatusColor}
        getPriorityColor={taskStore.getPriorityColor}
      />

      <CreateTaskModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={taskStore.selectedTask}
      />

      <ConfirmationDialog
        open={isDeleteModalOpen}
        title="Görevi Sil"
        message="Bu görevi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
});

export default Tasks;
