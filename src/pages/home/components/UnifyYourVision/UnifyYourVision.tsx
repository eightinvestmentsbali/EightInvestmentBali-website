import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";

const UnifyYourVision: React.FC = () => {
  const theme = useTheme();

  const Counter: React.FC<{ value: string; duration?: number }> = ({
    value,
    duration = 2000,
  }) => {
    const [count, setCount] = React.useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Parsing logic
    const target = parseInt(value.replace(/\D/g, ""), 10);
    const prefix = value.startsWith("$") ? "$" : "";
    const suffix = value.replace(/[0-9$.]/g, "");

    React.useEffect(() => {
      // Only run the logic if the component is in view
      if (!isInView) return;

      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Optional: Add an easing function for a smoother finish
        // const easeOutQuad = (t: number) => t * (2 - t);
        // const easedProgress = easeOutQuad(progress);

        setCount(Math.floor(progress * target));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }, [isInView, target, duration]);

    return (
      <span ref={ref}>
        {prefix}
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <Grid size={{ xs: 12 }} id="about-us">
      <Box
        sx={{
          mb: { xs: 3.75, sm: 6.5, md: 7.5, lg: 13, xl: 20 },
          mt: { xs: 1.5, md: 2.5, lg: 6, xl: 7.5 },
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
              mb: { xs: 2, md: 4, lg: 6, xl: 8 },
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
              mb: { xs: 2, md: 4, lg: 6, xl: 8 },
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
            { value: "$16M+", label: "Total Project Investments" },
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
                    {/* 1. Big stat number */}
                    <Typography
                      variant="heroSubTitle"
                      component="h1"
                      sx={{
                        fontWeight: typographyTokens.fontWeights.medium,
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Counter value={item.value} />
                    </Typography>

                    {/* 2. Label — now directly below the number */}
                    <Typography
                      variant="heroSubTitle"
                      component="h2"
                      sx={{
                        color: "#484848",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.label}
                    </Typography>

                    {/* 3. Disclaimer — smallest, at the bottom */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.disabled,
                        fontSize: {
                          xs: "0.45rem",
                          sm: "0.7rem",
                          md: "0.75rem",
                        },
                        lineHeight: 1.4,
                        textAlign: "center",
                        mt: 0.5,
                      }}
                    >
                      Figures shown are indicative & updated periodically.
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
