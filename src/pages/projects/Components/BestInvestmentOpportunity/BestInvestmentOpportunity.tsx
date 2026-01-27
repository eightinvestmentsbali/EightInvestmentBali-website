import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "./Components/FeaturedProjectCard";

const BestInvestmentOpportunity: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <VideoPlayer />
      <Grid size={{ xs: 12 }}>
        <Box sx={{ mt: { xs: 15, md: 20, lg: 25 } }}>
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              mb: { xs: 2, md: 4, lg: 6 },
              maxWidth: "60%",
            }}
          >
            Best investment opportunity
          </Typography>

          <Divider
            sx={{
              height: "2px",
              backgroundColor: theme.palette.divider,
              mb: { xs: 2, md: 6, lg: 10 },
            }}
          />
          <FeaturedProjectCard />
        </Box>
      </Grid>
    </Box>
  );
};

export default BestInvestmentOpportunity;
