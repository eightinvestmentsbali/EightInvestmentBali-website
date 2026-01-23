import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ArchitectureSVG from "../../../../assets/DesignElement/ArchitectureSVG";
import { useTheme } from "@mui/material/styles";

const ArchitectingProsperity: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Grid size={{ xs: 12 }} sx={{ mx: "auto", mt: { xs: 2, md: 6, lg: 10} }}>
        <Typography
          variant="heroTitle"
          component="h1"
          sx={{
            color: theme.palette.text.primary,
            mb: { xs: 2, md: 6, lg: 10 }
          }}
        >
          Architecting Prosperity,
          <br />
          Beyond Investment
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Box>
          <ArchitectureSVG width="100%" height="100%" />
        </Box>
      </Grid>
    </>
  );
};

export default ArchitectingProsperity;
