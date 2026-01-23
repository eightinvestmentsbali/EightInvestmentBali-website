import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CuratedSwiper from "../../../../components/Swipers/CuratedSwiper";
import { useTheme } from "@mui/material/styles";

const WhyDoInvestorschoose: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ my: { xs: 8, md: 16 } }}>
        <Typography
          variant="heroTitle"
          component="h1"
          sx={{
            color: theme.palette.text.primary,
            mb: { xs: 6, md: 10 },
          }}
        >
          Why do investors choose Eight Investments Bali
        </Typography>

        <Divider
          sx={{
            height: "2px",
            backgroundColor: "#cfd8dc",
            my: 2,
          }}
        />
        <CuratedSwiper />
      </Box>
    </Grid>
  );
};

export default WhyDoInvestorschoose;
