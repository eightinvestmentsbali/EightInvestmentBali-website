import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

const UnifyYourVision: React.FC = () => {
  const theme = useTheme();
  return (
    <Grid size={{ xs: 12 }} id="about-us">
      <Box sx={{ mb: { xs: 3.75, sm: 6.5, md: 7.5, lg: 13, xl: 20 } }}>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              mb: { xs: 2, md: 4, lg: 6, xl: 8},
            }}
          >
            Unify your vision with <br /> limitless possibilities
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <Divider
            sx={{
              height: "2px",
              backgroundColor: theme.palette.divider,
              mb: { xs: 2, md: 4, lg: 6, xl: 8},
            }}
          />
        </motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
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
        </motion.div>

        {/* ===== STATS ===== */}
        <Grid container spacing={4} alignItems="center">
          {[
            { value: "4", label: "Ongoing Projects" },
            { value: "$16M+", label: "Total Projects Investments" },
            { value: "$40M+", label: "Total Managed Investments" },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
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

                  {index !== 2 && (
                    <Box
                      sx={{
                        height: {
                          xs: "50px",
                          sm: "70px",
                          md: "90px",
                          lg: "110px",
                        },
                        width: "2px",
                        backgroundColor: "#cfd8dc",
                        mx: 3,
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                  )}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default UnifyYourVision;
