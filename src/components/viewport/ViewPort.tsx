import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

const ViewPort: React.FC = () => {

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ensure each route renders scrolled to top */}
      <ScrollToTop />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ViewPort;
