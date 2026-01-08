import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ViewPort: React.FC = () => {

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ViewPort;
