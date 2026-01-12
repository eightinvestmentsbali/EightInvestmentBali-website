import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { typographyTokens } from "../../../../theme/MuiTheme";
import CuratedSwiper from "../../../../components/Swipers/CuratedSwiper";

const WhyDoInvestorschoose: React.FC = () => {
  
  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ my: { xs: 8, md: 16 } }}>
        <Typography
          sx={{
            fontWeight: typographyTokens.fontWeights.medium,
            fontSize: { xs: "2.5rem", md: "5rem", lg: "6.5rem" },
            lineHeight: 1.1,
            color: "#000",
            mb: { xs: 6, md: 10 },
            letterSpacing: "-0.02em",
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
