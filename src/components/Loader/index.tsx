import { loaderStore } from "@/stores/loader.store";
import { Backdrop, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";

const Loader = observer(() => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparan arka plan
      }}
      open={loaderStore.isLoading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
});

export default Loader;
