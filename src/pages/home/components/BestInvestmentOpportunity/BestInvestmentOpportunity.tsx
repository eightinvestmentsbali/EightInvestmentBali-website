import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Modal,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "../../../../components/BestInvestmentOpportunityComponents/FeaturedProjectCard";
import { typographyTokens } from "../../../../theme/MuiTheme";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useState, useEffect, useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CloseIcon from "@mui/icons-material/Close";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../../../../components/Data/projectsData";


const BestInvestmentOpportunity = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const items = projectsData.map((p) => p.name);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [loadedFeatureImages, setLoadedFeatureImages] = useState<
    Record<string, boolean>
  >({});
  const [isGalleryImageLoading, setIsGalleryImageLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);
  const pauseTimeoutRef = useRef<number | undefined>(undefined);
  const images = projectsData[activeProjectIndex]?.featuresImages ?? [];
  const activeGalleryImage = images[activeImageIndex] || images[0] || "";

  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start 350px", "start 100px"],
  });

  const headerOpacity = useTransform(cardProgress, [0, 1], [1, 0]);
  const headerY = useTransform(cardProgress, [0, 1], [0, -24]);
  const headerBlur = useTransform(
    cardProgress,
    [0, 1],
    ["blur(0px)", "blur(4px)"],
  );

  useEffect(() => {
    setDirection(0);
    setActiveImageIndex(0);
  }, [activeProjectIndex]);

  useEffect(() => {
    if (!images.length) {
      setIsGalleryImageLoading(false);
      return;
    }

    images.forEach((img) => {
      if (loadedFeatureImages[img]) return;
      const preloadImage = new Image();
      preloadImage.src = img;
      preloadImage.onload = () => {
        setLoadedFeatureImages((prev) =>
          prev[img] ? prev : { ...prev, [img]: true },
        );
      };
    });
  }, [activeProjectIndex, images, loadedFeatureImages]);

  useEffect(() => {
    if (!activeGalleryImage) {
      setIsGalleryImageLoading(false);
      return;
    }

    setIsGalleryImageLoading(!loadedFeatureImages[activeGalleryImage]);
  }, [activeGalleryImage, loadedFeatureImages]);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400); // 0.4 seconds loading time

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [isModalOpen]);

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
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    pauseAutoRotation();
  };

  const handleNext = () => {
    setDirection(1);
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    pauseAutoRotation();
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > activeImageIndex ? 1 : -1);
    setActiveImageIndex(index);
    pauseAutoRotation();
  };

  const handleProjectChange = (index: number) => {
    setDirection(0);
    setActiveImageIndex(0);
    setIsGalleryImageLoading(true);
    setActiveProjectIndex(index);
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
    if (!images.length) return;

    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setDirection(1);
        setActiveImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1,
        );
      }, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isPaused, images.length]);

  return (
    <Box
      id="best-investment-opportunity"
      sx={{
        bgcolor: "#232323",
        px: { xs: 2, md: 4, lg: 6 },
        pt: { xs: 2, md: 4, lg: 6 },
        position: "relative",
      }}
    >
      <Box
        sx={{
          bgcolor: "#000",
          py: { xs: 4, md: 8, lg: 12 },
        }}
      >
        <Container maxWidth="xl">
          {/* HEADER */}
          <motion.div
            style={{
              opacity: headerOpacity,
              y: headerY,
              filter: headerBlur,
              position: "sticky",
              top: "80px",
              zIndex: 0,
            }}
          >
            <Stack
              direction="row"
              alignItems="flex-end"
              justifyContent="space-between"
              mb={{ xs: 4, md: 6, lg: 10 }}
            >
              <Typography
                variant="heroTitle"
                component="h1"
                color={theme.palette.primary.contrastText}
              >
                Best investment opportunity
              </Typography>

              <IconButton
                aria-label="Open construction update"
                onClick={() => {
                  navigate("/project-details", {
                    state: { projectIndex: activeProjectIndex },
                  });
                }}
                sx={{
                  color: theme.palette.primary.contrastText,
                  // border: `1px solid ${theme.palette.primary.contrastText}`,
                  borderRadius: "50%",
                  display: { xs: "none", sm: "flex" },
                  // width: { sm: 38, md: 44, lg: 50 },
                  // height: { sm: 38, md: 44, lg: 50 },
                  flexShrink: 0,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderColor: theme.palette.primary.contrastText,
                  },
                }}
              >
                <PlayCircleOutlineIcon
                  sx={{
                    fontSize: "clamp(4rem, 0.9rem + 0.45vw, 10.4rem)",
                  }}
                />
              </IconButton>
            </Stack>
            <Divider
              sx={{
                backgroundColor: theme.palette.divider,
                mt: 1,
                mb: { xs: 4, md: 6, lg: 10 },
              }}
            />
          </motion.div>

          <Box ref={cardRef}>
            <FeaturedProjectCard
              projectName={projectsData[activeProjectIndex].name}
              location={projectsData[activeProjectIndex].location}
              image={projectsData[activeProjectIndex].image}
              onSeeMoreClick={() =>  navigate("/project-details", {
                    state: { projectIndex: activeProjectIndex },
                  })}
              statusBadge={projectsData[activeProjectIndex].statusBadge}
              projectLogo={projectsData[activeProjectIndex].projectLogo}
              phases={projectsData[activeProjectIndex].phases}
              currentPhase={projectsData[activeProjectIndex].currentPhase}
              progressCardHeader={projectsData[activeProjectIndex].progressCardHeader}
            />
          </Box>
          {/* CAROUSEL ITEMS */}
          <Box mt={{ xs: 2, md: 4, lg: 6 }}>
            <Grid container spacing={{ xs: 0.7, md: 1.4, lg: 2 }}>
              {projectsData.map((project, index) => {
                const isLoaded = loadedImages[index];

                return (
                  <Grid size={{ xs: 3 }} key={project.name}>
                    <Box
                      onClick={() => handleProjectChange(index)}
                      sx={{
                        borderRadius: 3,
                        p: { xs: 0.5, md: 1, lg: 1.5 },
                        cursor: "pointer",
                        border:
                          index === activeProjectIndex
                            ? "2px solid #5CFF9D"
                            : "",
                        transition: "all .3s ease",
                        backgroundColor: "#000",

                        "&:hover": {
                          transform: "translate3d(0,-4px,0)",
                        },
                      }}
                    >
                      {/* IMAGE WRAPPER */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: { xs: "80px", md: "160px", lg: "280px" },
                          borderRadius: 2,
                          overflow: "hidden",
                          backgroundColor: "#111",
                        }}
                      >
                        {/* LOADER */}
                        {!isLoaded && (
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 10,
                            }}
                          >
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height="100%"
                              sx={{ bgcolor: "#868686" }}
                            />
                          </Box>
                        )}

                        {/* IMAGE */}
                        <Box
                          component="img"
                          src={project.image}
                          alt={project.name}
                          loading={
                            index === activeProjectIndex ? "eager" : "lazy"
                          }
                          fetchPriority={
                            index === activeProjectIndex ? "high" : "auto"
                          }
                          decoding="async"
                          sizes="(max-width: 900px) 25vw, 280px"
                          onLoad={() =>
                            setLoadedImages((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isLoaded ? 1 : 0,
                            transition: "opacity .3s ease",
                          }}
                        />
                      </Box>

                      <Typography
                        mt={{ xs: 0.7, md: 1.4, lg: 2 }}
                        fontSize={16}
                        fontWeight={500}
                        color="white"
                        textAlign="center"
                      >
                        {project.name}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* DOTS + NAVIGATION */}
          <Box
            mt={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            {/* DOTS */}
            <Box display="flex" gap={1.5} justifyContent="center" flex={1}>
              {items.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleProjectChange(index)}
                  sx={{
                    width: { xs: "10px", md: "12px", lg: "15px" },
                    height: { xs: "10px", md: "12px", lg: "15px" },
                    borderRadius: "50%",
                    cursor: "pointer",
                    border:
                      index === activeProjectIndex ? "" : "2px solid #ffff",
                    bgcolor: index === activeProjectIndex ? "#ffffff" : "",
                    transition: "all .3s ease",
                  }}
                />
              ))}
            </Box>

            {/* PREV / NEXT */}
            <Box display="flex" gap={1}>
              {/* PREV */}
              <Box
                onClick={() =>
                  handleProjectChange(
                    activeProjectIndex === 0
                      ? items.length - 1
                      : activeProjectIndex - 1,
                  )
                }
                sx={{
                  width: { xs: "33px", md: "44px", lg: "55px" },
                  height: { xs: "33px", md: "44px", lg: "55px" },
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: { xs: 2, md: 20, lg: 24 },
                  userSelect: "none",
                  transition: "all .2s ease",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <ArrowBackIosNewIcon
                  sx={{
                    fontSize: {
                      xs: "14px",
                      md: "20px",
                      lg: "24px",
                    },
                  }}
                />
              </Box>

              {/* NEXT */}
              <Box
                onClick={() =>
                  handleProjectChange(
                    activeProjectIndex === items.length - 1
                      ? 0
                      : activeProjectIndex + 1,
                  )
                }
                sx={{
                  width: { xs: "33px", md: "44px", lg: "55px" },
                  height: { xs: "33px", md: "44px", lg: "55px" },
                  borderRadius: "50%",
                  bgcolor: "#ffffff",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 24,
                  userSelect: "none",
                  transition: "all .2s ease",

                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: {
                      xs: "14px",
                      md: "20px",
                      lg: "24px",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* PROJECT DESCRIPTION */}
          <Box ref={descriptionRef} mt={8} width="100%">
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: typographyTokens.fontWeights.regular,
                mb: { xs: 2, md: 3, lg: 4 },
                lineHeight: 1.6,
              }}
            >
              {projectsData[activeProjectIndex].description}
            </Typography>

            <Button
              variant="text"
              onClick={() => setIsModalOpen(true)}
              sx={{
                color: theme.palette.primary.contrastText,
                fontSize: typographyTokens.fontSizes["3xl"],
                fontWeight: typographyTokens.fontWeights.regular,
                textTransform: "none",
                px: 0,
                cursor: "pointer",
                "&:hover": { background: "transparent" },
              }}
              endIcon={
                <NorthEastIcon
                  sx={{ fontSize: typographyTokens.fontSizes["3xl"] }}
                />
              }
            >
              Read More
            </Button>
          </Box>

          <Grid
            container
            spacing={6}
            mt={{ xs: 2, md: 4, lg: 6 }}
            maxWidth={{ xs: "100%", md: "80%" }}
            mx="auto"
          >
            {projectsData[activeProjectIndex].features.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                <Stack spacing={2} p={{ xs: 2, md: 4, lg: 8 }}>
                  {/* ICON */}
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon />
                  </Box>

                  {/* TITLE */}
                  <Typography
                    variant="h2"
                    sx={{
                      color: theme.palette.primary.contrastText,
                      fontWeight: typographyTokens.fontWeights.medium,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: typographyTokens.fontWeights.regular,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          minHeight: { xs: "auto", md: "800px", lg: "100vh" },
          pb: { xs: 2, md: 3, lg: 4 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "1 1 0" },
            height: {
              xs: "285.8px",
              sm: "500px",
              md: "600px",
              lg: "calc(100vh - 500px)",
            },
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
              key={`${activeProjectIndex}-${activeImageIndex}`}
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
              {isGalleryImageLoading && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    bgcolor: "#1a1a1a",
                  }}
                />
              )}
              <Box
                component="img"
                src={activeGalleryImage}
                alt={`${projectsData[activeProjectIndex]?.name ?? "Project"} preview ${activeImageIndex + 1}`}
                loading={activeImageIndex === 0 ? "eager" : "lazy"}
                fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                decoding="async"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 92vw, 1400px"
                onLoad={() => {
                  if (!activeGalleryImage) return;
                  setLoadedFeatureImages((prev) => ({
                    ...prev,
                    [activeGalleryImage]: true,
                  }));
                  setIsGalleryImageLoading(false);
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  imageRendering: "-webkit-optimize-contrast",
                  opacity: isGalleryImageLoading ? 0 : 1,
                  transition: "opacity .25s ease",
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
          key={`thumbnails-${activeProjectIndex}`}
          sx={{
            display: "flex",
            gap: { xs: 1, md: 2 },
            justifyContent: "flex-start",
            flexShrink: 0,
            height: { xs: "auto", md: "180px" },
            overflowX: "auto",
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
              key={`${activeProjectIndex}-${index}`}
              component={motion.div}
              onClick={() => handleThumbnailClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                flex: { xs: "0 0 80px", md: "0 0 calc((100% - 64px) / 5)" },
                minWidth: { xs: "80px", md: "calc((100% - 64px) / 5)" },
                width: { xs: "80px", md: "calc((100% - 64px) / 5)" },
                height: { xs: 80, md: 180 },
                overflow: "hidden",
                cursor: "pointer",
                opacity: index === activeImageIndex ? 1 : 0.6,
                border:
                  index === activeImageIndex
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
                    index === activeImageIndex
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
                alt={`${projectsData[activeProjectIndex]?.name ?? "Project"} thumbnail ${index + 1}`}
                loading={index === activeImageIndex ? "eager" : "lazy"}
                fetchPriority={index === activeImageIndex ? "high" : "auto"}
                decoding="async"
                sizes="(max-width: 900px) 80px, 240px"
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

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setIsModalOpen(false)}
          />
          {isLoading ? (
            <motion.div
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                backgroundColor: "#000",
                borderRadius: "16px",
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 30px rgba(92, 255, 157, 0.5)`,
                transformOrigin: "center center",
                zIndex: 1,
              }}
            />
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "95%",
                maxWidth: "1000px",
                height: "85vh",
                backgroundColor: "#000",
                borderRadius: "24px",
                overflow: "hidden",
                zIndex: 1,
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Box
                component="img"
                src={projectsData[activeProjectIndex].image}
                alt={projectsData[activeProjectIndex].name}
                loading="lazy"
                decoding="async"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "30%",
                  left: 0,
                  bottom: 0,
                  zIndex: 1,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 90%, transparent 100%)",
                  backdropFilter: "blur(6px)",
                  WebkitMaskImage:
                    "linear-gradient(to top, black 0%, black 90%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to top, black 0%, black 90%, transparent 100%)",
                }}
              />

              <IconButton
                onClick={() => setIsModalOpen(false)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  zIndex: 2,
                  p: { xs: 3, md: 6 },
                }}
              >
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      color: theme.palette.primary.contrastText,
                      fontSize: {
                        xs: "clamp(1.5rem, 8vw, 2.5rem)",
                        md: "clamp(2.5rem, 5vw, 3rem)",
                      },
                      mb: 1,
                      fontWeight: typographyTokens.fontWeights.bold,
                      lineHeight: 1.1,
                    }}
                  >
                    {projectsData[activeProjectIndex].name}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: {
                        xs: "clamp(0.9rem, 4vw, 1.1rem)",
                        md: "clamp(1.1rem, 2vw, 1.5rem)",
                      },
                      fontWeight: typographyTokens.fontWeights.medium,
                      lineHeight: 1.5,
                      mb: 3,
                    }}
                  >
                    {projectsData[activeProjectIndex].location}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.5,
                      fontSize: {
                        xs: "clamp(0.875rem, 3vw, 1rem)",
                        md: "clamp(1rem, 1.2vw, 1rem)",
                      },
                      maxWidth: "800px",
                    }}
                  >
                    {projectsData[activeProjectIndex].expandedDescription}
                  </Typography>
                </motion.div>
              </Box>
            </motion.div>
          )}
        </>
      </Modal>
    </Box>
  );
};

export default BestInvestmentOpportunity;
