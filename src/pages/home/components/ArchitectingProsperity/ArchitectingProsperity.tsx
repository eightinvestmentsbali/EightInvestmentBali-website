import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ArchitectureSVG from "../../../../assets/DesignElement/ArchitectureSVG";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

const ArchitectingProsperity: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      {/* Title: Bottom to Top */}
      <Grid size={{ xs: 12 }}>
        <Box id="hero" sx={{ mt: { xs: 2, md: 4, lg: 5, xl: 8}, mb: { xs: 3, md: 5, lg: 7.5, xl: 15} }}>
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
                mb: { xs: 2, md: 4, lg: 4, xl: 8 },
              }}
            >
              Architecting Prosperity,
              <br />
              Beyond Investment
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
              <ArchitectureSVG width="100%" height="100%" />
            </Box>
          </motion.div>
        </Box>
      </Grid>
    </>
  );
};

export default ArchitectingProsperity;
