import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { typographyTokens } from "../../../../theme/MuiTheme";

/* -------------------- DATA -------------------- */

const initialSteps = [
  {
    id: "01",
    title: "Analysis",
    description:
      "We prioritize identifying only high-quality investment opportunities. Our team conducts thorough and meticulous research, leveraging our deep understanding of the Bali market. This involves comprehensive market analysis, financial due diligence, and risk assessment to ensure that each investment meets our stringent criteria.",
  },
  {
    id: "02",
    title: "Strategy",
    description:
      "We prioritize identifying only high-quality investment opportunities. Our team conducts thorough and meticulous research, leveraging our deep understanding of the Bali market. This involves comprehensive market analysis, financial due diligence, and risk assessment to ensure that each investment meets our stringent criteria.",
  },
  {
    id: "03",
    title: "Execution",
    description:
      "We prioritize identifying only high-quality investment opportunities. Our team conducts thorough and meticulous research, leveraging our deep understanding of the Bali market. This involves comprehensive market analysis, financial due diligence, and risk assessment to ensure that each investment meets our stringent criteria.",
  },
  {
    id: "04",
    title: "Monitoring",
    description:
      "We prioritize identifying only high-quality investment opportunities. Our team conducts thorough and meticulous research, leveraging our deep understanding of the Bali market. This involves comprehensive market analysis, financial due diligence, and risk assessment to ensure that each investment meets our stringent criteria.",
  },
];

/* -------------------- COMPONENT -------------------- */

const OurProcess: React.FC = () => {
  const theme = useTheme();
  const [steps, setSteps] = useState(initialSteps);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Use intersection observer to detect if section is in view
  const { ref } = useInView({
    threshold: 0.3, // Trigger when 30% of section is visible
    triggerOnce: false, // Keep checking
  });
  // const { ref, inView } = useInView({
  //   threshold: 0.3, // Trigger when 30% of section is visible
  //   triggerOnce: false, // Keep checking
  // });

  const activeStep = steps[0];
  const cardColor = parseInt(activeStep.id) % 2 === 1 ? "#258873" : "#A0B5D9";
  const greenColor = "#258873";
  const blueColor = "#A0B5D9";

  // Calculate stacked card colors - opposite pattern from main card
  const isMainGreen = cardColor === greenColor;
  const stackedBottomColor = isMainGreen ? blueColor : greenColor;
  const stackedMiddleColor = isMainGreen ? greenColor : blueColor;
  const stackedTopColor = isMainGreen ? blueColor : greenColor;

  /* -------------------- AUTO ROTATION -------------------- */
  useEffect(() => {
    if (!isPaused && !isFlipping) {
      intervalRef.current = setInterval(() => {
        if (!isFlipping && !isPaused) {
          setIsFlipping(true);

          setTimeout(() => {
            setSteps((prev) => {
              // const currentFirstStepId = prev[0].id; // Step before rotation
              const updated = [...prev];
              const [first] = updated.splice(0, 1);
              updated.push(first);
              // const newFirstStepId = updated[0].id; // Step after rotation

              // Check if cycle completed (went from "04" to "01")
              // Only scroll if section is currently in view
              // COMMENTED OUT: Auto-scroll to next section
              // if (
              //   currentFirstStepId === "04" &&
              //   newFirstStepId === "01" &&
              //   inView
              // ) {
              //   setTimeout(() => {
              //     const nextSection = document.getElementById("our-services");
              //     if (nextSection && inView) {
              //       nextSection.scrollIntoView({
              //         behavior: "smooth",
              //         block: "start",
              //       });
              //     }
              //   }, 500);
              // }

              return updated;
            });
            setIsFlipping(false);
          }, 600);
        }
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isPaused, isFlipping]);

  const pauseAutoRotation = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  /* -------------------- HANDLER -------------------- */
  const handleStepClick = (index: number) => {
    if (index === 0 || isFlipping) return; // Already active or animating

    pauseAutoRotation();
    setIsFlipping(true);

    // Delay the actual state change to sync with animation
    setTimeout(() => {
      setSteps((prev) => {
        // const currentFirstStepId = prev[0].id; // Step before click
        const updated = [...prev];
        const [clicked] = updated.splice(index, 1);
        updated.unshift(clicked);
        // const newFirstStepId = updated[0].id; // Step after click

        // Check if cycle completed (went from "04" to "01")
        // Only scroll if section is currently in view
        // COMMENTED OUT: Auto-scroll to next section
        // if (currentFirstStepId === "04" && newFirstStepId === "01" && inView) {
        //   setTimeout(() => {
        //     const nextSection = document.getElementById("our-services");
        //     if (nextSection && inView) {
        //       nextSection.scrollIntoView({
        //         behavior: "smooth",
        //         block: "start",
        //       });
        //     }
        //   }, 500);
        // }

        return updated;
      });
      setIsFlipping(false);
    }, 600); // Match animation duration
  };

  /* -------------------- PAGE PEEL ANIMATION -------------------- */
  const pagePeelVariants = {
    initial: {
      rotateY: 0,
      x: 0,
      scale: 1,
      opacity: 1,
    },
    animate: {
      rotateY: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: {
      rotateY: -180,
      x: -100,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: [0.55, 0.06, 0.68, 0.19] as const,
      },
    },
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      scale: 0.96,
      y: 10,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.2,
      },
    },
  };

  return (
    <Box
      ref={ref}
      data-section="our-process"
      sx={{
        bgcolor: theme.palette.background.paper,
        overflow: { xs: "visible", md: "visible" },
        width: "100%",
        pt: { xs: 2, md: 5, lg: 10 },
        pb: { xs: 3.75, sm: 7.5, md: 13, lg: 20 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          overflow: { xs: "visible", md: "visible" },
        }}
      >
        {/* -------------------- HEADER -------------------- */}
        <Stack spacing={{ xs: 2, md: 4, lg: 6 }} mb={{ xs: 3, md: 6 }}>
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: typographyTokens.fontWeights.medium,
              mb: { xs: 2, md: 6 },
            }}
          >
            Our Process
          </Typography>

          <Divider sx={{ width: "100%", height: "2px", bgcolor: "#67697C" }} />

          <Typography
            variant="h4"
            sx={{
              color: "#484848",
              fontWeight: typographyTokens.fontWeights.regular,
              lineHeight: 1.3,
              fontSize: {
                xs: "1rem",
                sm: "1.125rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          >
            Our thought process is deeply rooted in our core values. These
            values shape every decision we make and guide our approach to
            investment management.
          </Typography>
        </Stack>

        {/* -------------------- CONTENT -------------------- */}
        <Grid
          container
          spacing={{ xs: 4, sm: 4, md: 8 }}
          mt={{ xs: 2, md: 6 }}
          alignItems="center"
          sx={{ flexWrap: "wrap" }}
        >
          {/* -------------------- LEFT CARD -------------------- */}
          <Grid
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              pl: { xs: 2, sm: 3, md: 6 },
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                position: "relative",
                maxWidth: { xs: "100%", md: 520 },
                width: "100%",
                mx: { xs: 0, md: 0 },
                perspective: "1500px", // 3D perspective for the peel effect
                overflow: "visible",
              }}
              onMouseEnter={pauseAutoRotation}
              onMouseLeave={() => {
                if (pauseTimeoutRef.current) {
                  clearTimeout(pauseTimeoutRef.current);
                }
                pauseTimeoutRef.current = setTimeout(() => {
                  setIsPaused(false);
                }, 2000);
              }}
            >
              {/* STACKED CARDS - Dynamic colors based on active step */}
              <Box
                sx={{
                  position: "absolute",
                  top: 48,
                  left: -45,
                  width: "100%",
                  height: "86%",
                  bgcolor: stackedBottomColor,
                  borderRadius: "0px 120px 0px 0px",
                  zIndex: 0,
                  transition: "background-color 0.6s ease",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 24,
                  left: -30,
                  width: "100%",
                  height: "92%",
                  bgcolor: stackedMiddleColor,
                  borderRadius: "0px 120px 0px 0px",
                  zIndex: 0,
                  transition: "background-color 0.6s ease",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: -15,
                  width: "100%",
                  height: "96%",
                  bgcolor: stackedTopColor,
                  borderRadius: "0px 120px 0px 0px",
                  zIndex: 1,
                  transition: "background-color 0.6s ease",
                }}
              />

              {/* MAIN CARD WITH PAGE PEEL ANIMATION */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 10,
                  transformStyle: "preserve-3d",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    variants={pagePeelVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                      position: "relative",
                      transformStyle: "preserve-3d",
                      transformOrigin: "left center", // Peel from left edge
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: cardColor,
                        color: "#fff",
                        borderRadius: {
                          xs: "0px 40px 0px 0px",
                          sm: "0px 60px 0px 0px",
                          md: "0px 120px 0px 0px",
                        },
                        px: { xs: 3, sm: 4, md: 6 },
                        py: { xs: 4, sm: 5, md: 7 },
                        height: "auto",
                        minHeight: { xs: 350, sm: 450, md: 500 },
                        overflow: "hidden",
                        boxShadow: {
                          xs: "0 10px 30px rgba(0,0,0,0.2)",
                          md: "0 20px 60px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <motion.div
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "1.25rem",
                              sm: "1.5rem",
                              md: "1.9rem",
                            },
                            fontWeight: typographyTokens.fontWeights.medium,
                            mb: { xs: 1.5, md: 2 },
                          }}
                        >
                          {activeStep.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.875rem",
                              sm: "1rem",
                              md: "1.3rem",
                              lg: "1.5rem",
                            },
                            fontWeight: 400,
                            lineHeight: { xs: 1.6, md: 1.7 },
                            opacity: 0.95,
                          }}
                        >
                          {activeStep.description}
                        </Typography>
                      </motion.div>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>
          </Grid>

          {/* -------------------- RIGHT STEPS -------------------- */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Stack spacing={{ xs: 3, sm: 4, md: 5 }} mt={{ xs: 4, md: 0 }}>
              {steps.map((step, index) => {
                const isActive = index === 0;

                return (
                  <motion.div
                    key={step.id}
                    layout
                    initial={false}
                    onClick={() => handleStepClick(index)}
                    onMouseEnter={pauseAutoRotation}
                    style={{
                      cursor: index === 0 ? "default" : "pointer",
                      width: "100%",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                      mass: 0.8,
                      layout: {
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94] as const,
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      flexWrap="wrap"
                      sx={{
                        opacity: isActive ? 1 : 0.35,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          opacity: index === 0 ? 1 : 0.6,
                        },
                      }}
                    >
                      <Typography
                        variant={isActive ? "heroTitle" : "heroSubTitle"}
                        sx={{
                          fontWeight: isActive ? 600 : 500,
                          color: isActive
                            ? theme.palette.text.primary
                            : "#727272",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Stack>
                  </motion.div>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurProcess;
