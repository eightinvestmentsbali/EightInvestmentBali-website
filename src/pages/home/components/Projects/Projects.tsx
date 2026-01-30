import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { typographyTokens } from "../../../../theme/MuiTheme";

const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
];

const projects = [
  {
    title: "Lilli Village",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    title: "The Hive",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Little Soho",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  },
  {
    title: "Dynasty 8",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
  },
];

const Projects: React.FC = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);
  const pauseTimeoutRef = useRef<number | undefined>(undefined);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring" as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.3 },
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    pauseAutoRotation();
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    pauseAutoRotation();
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    pauseAutoRotation();
  };

  const pauseAutoRotation = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isPaused]);

  return (
    <>
      <Box
        id="our-projects"
        sx={{
          bgcolor: "#232323",
          px: { xs: 2, md: 4, lg: 6 },
          minHeight: { xs: "auto", md: "100vh" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "1 1 0" },
            height: { xs: "285.8px", md: "calc(100vh - 200px)" },
            display: "flex",
            flexDirection: "column",
            position: "relative",
            mb: { xs: 3, md: 2 },
            overflow: "hidden",
          }}
          onMouseEnter={pauseAutoRotation}
          onMouseLeave={() => {
            if (pauseTimeoutRef.current) {
              clearTimeout(pauseTimeoutRef.current);
            }
            setIsPaused(false);
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={images[activeIndex]}
                loading="eager"
                fetchPriority="high"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  imageRendering: "-webkit-optimize-contrast",
                }}
              />
            </motion.div>
          </AnimatePresence>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1.5}
            sx={{
              p: 2,
              mt: "auto",
              position: "relative",
              zIndex: 2,
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={handlePrev}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                  color: "#000000",
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                  borderRadius: "50%",
                  border: "none",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                  },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={handleNext}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 1)",
                  color: "#000000",
                  width: { xs: 44, md: 52 },
                  height: { xs: 44, md: 52 },
                  borderRadius: "50%",
                  border: "none",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
              </IconButton>
            </motion.div>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 2 },
            justifyContent: "center",
            flexShrink: 0,
            height: { xs: "auto", md: "180px" },
            overflowX: { xs: "auto", md: "visible" },
            overflowY: "hidden",
            pb: { xs: 1, md: 0 },
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              component={motion.div}
              onClick={() => handleThumbnailClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                flex: { xs: "0 0 auto", md: 1 },
                minWidth: { xs: "80px", md: 0 },
                width: { xs: "80px", md: "auto" },
                height: { xs: 80, md: 180 },
                overflow: "hidden",
                cursor: "pointer",
                opacity: index === activeIndex ? 1 : 0.6,
                border:
                  index === activeIndex
                    ? { xs: "2px solid #ffffff", md: "3px solid #ffffff" }
                    : {
                        xs: "2px solid transparent",
                        md: "3px solid transparent",
                      },
                transition:
                  "opacity .3s ease, filter .3s ease, border .3s ease",
                "&:hover": {
                  opacity: 1,
                  filter: "brightness(1.2)",
                  border:
                    index === activeIndex
                      ? { xs: "2px solid #ffffff", md: "3px solid #ffffff" }
                      : {
                          xs: "2px solid rgba(255, 255, 255, 0.5)",
                          md: "3px solid rgba(255, 255, 255, 0.5)",
                        },
                },
              }}
            >
              <Box
                component="img"
                src={img}
                loading={index <= 2 ? "eager" : "lazy"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  imageRendering: "-webkit-optimize-contrast",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#232323",
          px: { xs: 2, md: 4, lg: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Typography
          variant="heroTitle"
          component="h1"
          sx={{
            color: theme.palette.primary.contrastText,
            mb: { xs: 2, md: 4 },
            fontWeight: typographyTokens.fontWeights.medium,
          }}
        >
          Projects
        </Typography>

        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid size={{ xs: 12, md: 6 }} key={project.title}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  // bgcolor: "#1E1E1E",
                  cursor: "pointer",
                  transition: "all .35s ease",

                  "&:hover img": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={project.image}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: { xs: 200, md: 280 },
                    objectFit: "cover",
                    transition: "transform .5s ease",
                    imageRendering: "-webkit-optimize-contrast",
                  }}
                />

                {/* TITLE */}
                <Box sx={{ py: 1.5, bgcolor: "transparent" }}>
                  <Typography
                    align="center"
                    sx={{
                      color: "#ffffff",
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      fontWeight: 500,
                      bgcolor: "transparent",
                    }}
                  >
                    {project.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Projects;
