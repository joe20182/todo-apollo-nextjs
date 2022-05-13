import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading} sx={{ zIndex: 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
