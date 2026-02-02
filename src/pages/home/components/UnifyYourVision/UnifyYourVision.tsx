import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";

const UnifyYourVision: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid size={{ xs: 12 }} id="about-us">
      <Box sx={{ mt: { xs: 3.75, sm: 7.5, md: 13, lg: 26 } }}>
        <Typography
          variant="heroTitle"
          component="h1"
          sx={{
            color: theme.palette.text.primary,
            mb: { xs: 2, md: 6, lg: 8 },
          }}
        >
          Unify your vision with limitless possibilities
        </Typography>

        <Divider
          sx={{
            height: "2px",
            backgroundColor: theme.palette.divider,
            mb: { xs: 2, md: 6, lg: 8 },
          }}
        />
        <Typography
          variant="heroSubTitle"
          component="h1"
          sx={{
            color: "#484848",
            mb: { xs: 2, md: 6, lg: 8 },
          }}
        >
          We connect global investors with a haven of exclusive investment
          opportunities in Bali
        </Typography>

        {/* ===== STATS ===== */}
        <Grid container spacing={4} alignItems="center">
          {[
            { value: "4", label: "Ongoing Projects" },
            { value: "$16M+", label: "Total Projects Investments" },
            { value: "$40M+", label: "Total Managed Investments" },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="heroSubTitle"
                    component="h1"
                    sx={{
                      fontWeight: typographyTokens.fontWeights.medium,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="heroSubTitle"
                    component="h1"
                    sx={{
                      color: "#484848",
                      mt: 1,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>

                {/* Vertical divider */}
                {index !== 2 && (
                  <Box
                    sx={{
                      height: 70,
                      width: "2px",
                      backgroundColor: "#cfd8dc",
                      mx: 3,
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default UnifyYourVision;
