import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";

const UnifyYourVision: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ mt: { xs: 8, md: 16 } }}>
        <Typography
          sx={{
            fontWeight: typographyTokens.fontWeights.medium,
            fontSize: { xs: "2.5rem", md: "5rem", lg: "6.5rem" },
            lineHeight: 1.1,
            color: theme.palette.text.primary,
            mb: { xs: 6, md: 10 },
            letterSpacing: "-0.02em",
          }}
        >
          Unify your vision with limitless possibilities
        </Typography>

        <Divider
          sx={{
            height: "2px",
            backgroundColor: theme.palette.divider,
            mb: { xs: 6, md: 10 },
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "3.1875rem" },
            color: theme.palette.text.secondary,
            mb: { xs: 6, md: 10 },
            lineHeight: 1.6,
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
                    sx={{
                      fontSize: "3.5rem",
                      fontWeight: typographyTokens.fontWeights.medium,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "2rem",
                        md: "2.4rem",
                        lg: "2.8rem",
                      },
                      color: theme.palette.text.secondary,
                      mt: 1,
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
