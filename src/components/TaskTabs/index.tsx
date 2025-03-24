import { Box, Tab, Tabs } from "@mui/material";
import { observer } from "mobx-react-lite";
import { TaskStatus, taskStore } from "../../stores/task.store";

const TaskTabs = observer(() => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    taskStore.setCurrentTab(newValue);
  };

  const counts = taskStore.getTaskCounts();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={taskStore.currentTab}
        onChange={handleTabChange}
        aria-label="task tabs"
      >
        <Tab label={`Tümü (${counts.all})`} value="all" />
        <Tab
          label={`Oluşturuldu (${counts.created})`}
          value={TaskStatus.Created.toString()}
        />
        <Tab
          label={`Atandı (${counts.assigned})`}
          value={TaskStatus.Assigned.toString()}
        />
        <Tab
          label={`Devam Ediyor (${counts.inProgress})`}
          value={TaskStatus.InProgress.toString()}
        />
        <Tab
          label={`Tamamlandı (${counts.completed})`}
          value={TaskStatus.Completed.toString()}
        />
        <Tab
          label={`Reddedildi (${counts.rejected})`}
          value={TaskStatus.Rejected.toString()}
        />
      </Tabs>
    </Box>
  );
});

export default TaskTabs;
