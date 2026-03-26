import { Box, Grid, Typography } from "@mui/material";
import React from "react";
// import ArchitectureSVG from "../../../../assets/DesignElement/ArchitectureSVG";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import HeroCarousel from "../../../../components/Carousal/HeroCarousal";

const ArchitectingProsperity: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      {/* Title: Bottom to Top */}
      <Grid size={{ xs: 12 }}>
        <Box
          id="hero"
          sx={{
            mt: { xs: 2, md: 4, lg: 5, xl: 8 },
            mb: { xs: 3.75, sm: 6.5, md: 7.5, lg: 13 },
          }}
        >
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
                mb: { xs: 1, md: 2, lg: 4, },
              }}
            >
              Architecting Prosperity, Beyond Investment
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 14,
              delay: 0.2,
            }}
          >
            <Box>
              {/* <ArchitectureSVG width="100%" height="100%" /> */}
              <HeroCarousel />
            </Box>
          </motion.div>
        </Box>
      </Grid>
    </>
  );
};

export default ArchitectingProsperity;
