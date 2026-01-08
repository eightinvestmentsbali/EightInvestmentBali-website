import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { typographyTokens } from "../../../../theme/MuiTheme";
import ArchitectureSVG from "../../../../assets/DesignElement/ArchitectureSVG";
import { useTheme } from "@mui/material/styles";

const ArchitectingProsperity: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Grid size={{ xs: 12 }} sx={{ mx: "auto", mt: { xs: 2, md: 10 } }}>
        <Typography
          sx={{
            fontWeight: typographyTokens.fontWeights.medium,
            fontSize: { xs: "2.5rem", md: "5rem", lg: "6.5rem" },
            lineHeight: 1.1,
            color: theme.palette.text.primary,
            mb: 6,
            letterSpacing: "-0.02em",
          }}
        >
          Architecting Prosperity,
          <br />
          Beyond Investment
        </Typography>
      </Grid>

      {/* Image / SVG */}
      <Grid size={{ xs: 12 }}>
        <Box>
          <ArchitectureSVG width="100%" height="100%" />
        </Box>
      </Grid>
    </>
  );
};

export default ArchitectingProsperity;
