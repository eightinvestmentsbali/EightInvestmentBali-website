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
import EastIcon from "@mui/icons-material/East";
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
// import StrategicInvestmentIcon from "../../../../assets/DesignElement/StrategicInvestmentIcon";
// import PremierFacilitiesIcon from "../../../../assets/DesignElement/PremierFacilitiesIcon";
// import ArtfullyCraftedLivingIcon from "../../../../assets/DesignElement/ArtfullyCraftedLivingIcon";
// import StrongRentalIcon from "../../../../assets/DesignElement/StrongRentalIcon";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../../../../components/Data/projectsData";

// const features = [
//   {
//     title: "Strategic Investment",
//     desc: "A 30+ year investment strategy commitment designed to align with your financial goals, whether short, medium, or long-term.",
//     icon: <StrategicInvestmentIcon />,
//   },
//   {
//     title: "Premier Facilities",
//     desc: "Lili Village offers balanced living with spacious layouts, high-end finishes, and modern conveniences, including gym, pool bar, and swimming pool.",
//     icon: <PremierFacilitiesIcon />,
//   },
//   {
//     title: "Artfully Crafted Living",
//     desc: "Thoughtfully designed spaces where open layouts seamlessly connect living areas, fostering harmony with nature and community.",
//     icon: <ArtfullyCraftedLivingIcon />,
//   },
//   {
//     title: "Strong Rental Returns",
//     desc: "High rental yields driven by strategic growth and multi-developing infrastructure, making it ideal for reliable income.",
//     icon: <StrongRentalIcon />,
//   },
// ];

const BestInvestmentOpportunity = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const items = projectsData.map((p) => p.name);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  // const isInitialMount = useRef(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);
  const pauseTimeoutRef = useRef<number | undefined>(undefined);
  const images = projectsData[activeProjectIndex]?.featuresImages ?? [];

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

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //     return;
  //   }

  //   if (descriptionRef.current) {
  //     setTimeout(() => {
  //       descriptionRef.current?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }, 100);
  //   }
  // }, [activeIndex]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeProjectIndex]);

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
                Best investment <br /> opportunity
              </Typography>

              <Button
                onClick={() => {
                  navigate("/project-details", {
                    state: { projectIndex: activeProjectIndex },
                  });
                }}
                variant="outlined"
                sx={{
                  color: theme.palette.primary.contrastText,
                  borderColor: theme.palette.primary.contrastText,
                  borderRadius: 50,
                  display: { xs: "none", sm: "inline-flex" },
                  px: { xs: 2, sm: 2, md: 3 },
                  py: { xs: 0.5, sm: 0.8, md: 1, lg: 1.5, xl: 2 },
                  flexShrink: 0,
                  fontWeight: typographyTokens.fontWeights.regular,
                  fontSize: {
                    xs: "8px",
                    sm: "10px",
                    md: "12px",
                    lg: "16px",
                    xl: "32px",
                  },
                  "& .MuiButton-startIcon svg": {
                    fontSize: {
                      xs: "8px",
                      sm: "10px",
                      md: "12px",
                      lg: "16px",
                      xl: "32px",
                    },
                  },
                  "& .MuiButton-endIcon svg": {
                    fontSize: {
                      xs: "8px",
                      sm: "10px",
                      md: "12px",
                      lg: "16px",
                      xl: "32px",
                    },
                  },
                }}
                startIcon={<PlayCircleOutlineIcon />}
                endIcon={<EastIcon />}
              >
                CONSTRUCTION UPDATE
              </Button>
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
              progressImage={projectsData[activeProjectIndex].progressImage}
              onSeeMoreClick={() => setIsModalOpen(true)}
              statusBadge={projectsData[activeProjectIndex].statusBadge}
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
                      onClick={() => setActiveProjectIndex(index)}
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
                          loading="eager"
                          decoding="async"
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
                  onClick={() => setActiveProjectIndex(index)}
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
                  setActiveProjectIndex((prev) =>
                    prev === 0 ? items.length - 1 : prev - 1,
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
                  setActiveProjectIndex((prev) =>
                    prev === items.length - 1 ? 0 : prev + 1,
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
              variant="heroSubTitle"
              component="h1"
              sx={{
                color: theme.palette.text.secondary,
                mb: { xs: 2, md: 4, lg: 6 },
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
          // bgcolor: "#232323",
          // px: { xs: 2, md: 4, lg: 6 },
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
              key={activeImageIndex}
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
                src={images[activeImageIndex] || images[0]}
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
              animate={{ rotate: 360 }}
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
              initial={{ scale: 0.25, opacity: 0, rotate: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                scale: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                opacity: {
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                rotate: {
                  duration: 0,
                },
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "90%",
                maxWidth: "900px",
                maxHeight: "90vh",
                backgroundColor: "#000",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                zIndex: 1,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                transformOrigin: "center center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "250px", md: "400px" },
                  overflow: "hidden",
                }}
              >
                <IconButton
                  onClick={() => setIsModalOpen(false)}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 10,
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <motion.div
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Box
                    component="img"
                    src={projectsData[activeProjectIndex].image}
                    alt={projectsData[activeProjectIndex].name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
                {/* Progress Image - Bottom Right over the image */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 16, md: 24 },
                    right: { xs: 16, md: 24 },
                    zIndex: 5,
                    width: { xs: "120px", md: "180px", lg: "250px" },
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Box
                      component="img"
                      src={projectsData[activeProjectIndex].progressImage}
                      alt="Progress"
                      sx={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: 1,
                      }}
                    />
                  </motion.div>
                </Box>
              </Box>
              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Typography
                    variant="heroTitle"
                    component="h2"
                    sx={{
                      color: theme.palette.primary.contrastText,
                      mb: 2,
                      fontWeight: typographyTokens.fontWeights.medium,
                    }}
                  >
                    {projectsData[activeProjectIndex].name}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      fontWeight: typographyTokens.fontWeights.regular,
                    }}
                  >
                    {projectsData[activeProjectIndex].location}
                  </Typography>
                  <Typography
                    variant="heroSubTitle"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                    }}
                  >
                    {projectsData[activeProjectIndex].description}
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
