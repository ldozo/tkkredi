import TaskDetailModal from "@/components/TaskDetailModal";
import TaskTable from "@/components/TaskTable";
import TaskTabs from "@/components/TaskTabs";
import { Box } from "@mui/material";
import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  status: "BEKLEMEDE" | "TAMAMLANDI" | "REDDEDILDI";
  assignee: string;
  department: string;
  dueDate: string;
  taskId: string;
}

const DepartmentTasks: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleCopyTaskId = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(taskId);
  };

  const handleApproveTask = (task: Task) => {
    // TODO: API çağrısı yapılacak
    console.log("Görev onaylandı:", task);
  };

  const handleDeleteTask = (task: Task) => {
    // TODO: API çağrısı yapılacak
    console.log("Görev silindi:", task);
  };

  const getStatusColor = (status: Task["status"]) => {
    const colors = {
      BEKLEMEDE: "warning",
      TAMAMLANDI: "success",
      REDDEDILDI: "error",
    } as const;
    return colors[status];
  };

  // Örnek veri - Burada API'den departmana ait görevler gelecek
  const tasks: Task[] = [
    {
      id: "1",
      taskId: "TASK-001",
      title: "Tarım Kredisi Başvuru Değerlendirmesi",
      status: "BEKLEMEDE",
      assignee: "ahmet.yilmaz@tkkredi.com",
      department: "Kredi",
      dueDate: "15.03.2024",
    },
    {
      id: "2",
      taskId: "TASK-002",
      title: "Lojistik Rota Optimizasyonu",
      status: "BEKLEMEDE",
      assignee: "mehmet.demir@tkkredi.com",
      department: "Lojistik",
      dueDate: "14.03.2024",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <TaskTabs
        tasks={tasks}
        tabValue={tabValue}
        onTabChange={handleTabChange}
      />

      <TaskTable
        tasks={
          tabValue === 0
            ? tasks
            : tabValue === 1
            ? tasks.filter((task) => task.status === "BEKLEMEDE")
            : tabValue === 2
            ? tasks.filter((task) => task.status === "TAMAMLANDI")
            : tasks.filter((task) => task.status === "REDDEDILDI")
        }
        onTaskClick={handleTaskClick}
        onCopyTaskId={handleCopyTaskId}
        getStatusColor={getStatusColor}
        onApproveTask={handleApproveTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskDetailModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        getStatusColor={getStatusColor}
      />
    </Box>
  );
};

export default DepartmentTasks;
