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
      <Grid size={{ xs: 12 }} sx={{ mt: { xs: 2, md: 6, lg: 10 } }}>
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
              mb: { xs: 2, md: 6, lg: 10 },
            }}
          >
            Architecting Prosperity,
            <br />
            Beyond Investment
          </Typography>
        </motion.div>
      </Grid>

      <Grid size={{ xs: 12 }}>
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
      </Grid>
    </>
  );
};

export default ArchitectingProsperity;
