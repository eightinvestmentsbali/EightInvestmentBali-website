import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "./Components/FeaturedProjectCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { typographyTokens } from "../../../../theme/MuiTheme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import {
  motion,
  AnimatePresence,
  useTransform,
  useScroll,
} from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface Props {
  data: any[];
  initialActiveIndex?: number; // Add this prop
}

const BestInvestmentOpportunity: React.FC<Props> = ({
  data,
  initialActiveIndex = 0,
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const cardRef = useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  if (!data?.length || !data[activeIndex]) {
    return <CircularProgress />; // or Skeleton / Loader
  }

  const activeProject = data[activeIndex];
  const images = activeProject.featuresImages ?? [];
  const primaryCTA = activeProject?.primaryCTA;
  const secondaryCTA = activeProject?.secondaryCTA;
  const brochure = activeProject?.brochure;
  const isLittleSohoProject =
    (activeProject?.name ?? "").toLowerCase() === "little soho";
  const shouldHideDownloadCtaForProject = isLittleSohoProject;
  const isPrimaryDownloadCta = (primaryCTA ?? "").toLowerCase().includes("download");
  const isSecondaryDownloadCta = (secondaryCTA ?? "")
    .toLowerCase()
    .includes("download");
  const showPrimaryCTA = Boolean(
    primaryCTA && !(shouldHideDownloadCtaForProject && isPrimaryDownloadCta),
  );
  const showSecondaryCTA = Boolean(
    secondaryCTA && !(shouldHideDownloadCtaForProject && isSecondaryDownloadCta),
  );
  const showFallbackBrochureCta = Boolean(
    brochure &&
      !shouldHideDownloadCtaForProject &&
      !isPrimaryDownloadCta &&
      !isSecondaryDownloadCta,
  );

  const getCtaIcon = (cta?: string) => {
    const value = (cta ?? "").toLowerCase();
    if (value.includes("download")) return <DownloadOutlinedIcon />;
    if (value.includes("register")) return <HowToRegOutlinedIcon />;
    if (value.includes("book")) return <HotelOutlinedIcon />;
    if (value.includes("request")) return <EventAvailableOutlinedIcon />;
    if (value.includes("schedule")) return <EventNoteOutlinedIcon />;
    if (value.includes("brew")) return <LocalCafeOutlinedIcon />;
    return <OpenInNewOutlinedIcon />;
  };

  const handleCtaClick = (cta?: string) => {
    const value = (cta ?? "").toLowerCase();
    if (!value) return;

    if (value.includes("download")) {
      if (shouldHideDownloadCtaForProject) return;
      if (!brochure) return;
      const link = document.createElement("a");
      link.href = brochure;
      link.download = `${(activeProject?.name ?? "Project").replace(/\s+/g, "-")}-Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (
      value.includes("register") ||
      value.includes("request") ||
      value.includes("schedule")
    ) {
      const action = value.includes("register")
        ? "register"
        : value.includes("request")
          ? "request"
          : "schedule";

      sessionStorage.setItem(
        "contactIntent",
        JSON.stringify({
          action,
          projectName: activeProject?.name ?? "",
        }),
      );
      window.dispatchEvent(new Event("contact-intent-updated"));

      const contactSection = document.getElementById("contact-us");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Box sx={{ py: { xs: 2, md: 4, lg: 6 } }}>
        <VideoPlayer data={activeProject} />
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mt: { xs: 2, md: 8, lg: 20 } }}>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: { xs: "flex-start", md: "center" },
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 4, md: 4, lg: 6 },
                  mb: { xs: 4, md: 6, lg: 10 },
                }}
              >
                <Typography
                  variant="heroTitle"
                  component="h1"
                  sx={{
                    color: theme.palette.text.primary,
                    mb: 0,
                  }}
                >
                  Best investment opportunity
                </Typography>

                {(showPrimaryCTA || showSecondaryCTA || showFallbackBrochureCta) && (
                  <Stack
                    spacing={2}
                    sx={{
                      width: { xs: "100%", md: "auto" },
                      minWidth: { md: 260 },
                    }}
                  >
                    {showPrimaryCTA && (
                      <Button
                        variant="contained"
                        startIcon={getCtaIcon(primaryCTA)}
                        onClick={() => handleCtaClick(primaryCTA)}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          py: 1.4,
                          px: 2.5,
                          fontWeight: typographyTokens.fontWeights.medium,
                          bgcolor: theme.palette.primary.main,
                          "&:hover": {
                            bgcolor: theme.palette.primary.main,
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                          },
                          "&:focus-visible": {
                            outline: "none",
                            boxShadow: "none",
                          },
                          "&:active": {
                            outline: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {primaryCTA}
                      </Button>
                    )}
                    {showSecondaryCTA && (
                      <Button
                        variant="outlined"
                        startIcon={getCtaIcon(secondaryCTA)}
                        onClick={() => handleCtaClick(secondaryCTA)}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          py: 1.4,
                          px: 2.5,
                          fontWeight: typographyTokens.fontWeights.medium,
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                          },
                          "&:focus-visible": {
                            outline: "none",
                            boxShadow: "none",
                          },
                          "&:active": {
                            outline: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {secondaryCTA}
                      </Button>
                    )}
                    {showFallbackBrochureCta && (
                        <Button
                          variant="outlined"
                          startIcon={<DownloadOutlinedIcon />}
                          onClick={() => handleCtaClick("Download Brochure")}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            py: 1.4,
                            px: 2.5,
                            fontWeight: typographyTokens.fontWeights.medium,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            "&:hover": {
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                            },
                            "&:focus": {
                              outline: "none",
                              boxShadow: "none",
                            },
                            "&:focus-visible": {
                              outline: "none",
                              boxShadow: "none",
                            },
                            "&:active": {
                              outline: "none",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Download Brochure
                        </Button>
                      )}
                  </Stack>
                )}
              </Box>

              <Divider
                sx={{
                  height: "2px",
                  backgroundColor: theme.palette.divider,
                  mb: { xs: 4, md: 6, lg: 8 },
                  mx: { xs: -2, md: -4, lg: -6 },
                  width: {
                    xs: "calc(100% + 32px)",
                    md: "calc(100% + 64px)",
                    lg: "calc(100% + 96px)",
                  },
                }}
              />
            </motion.div>
            <Box ref={cardRef}>
                <FeaturedProjectCard
                  key={activeIndex}
                  projectName={activeProject?.name ?? ""}
                  location={activeProject?.location ?? ""}
                  image={activeProject?.image ?? ""}
                  projectLogo={activeProject?.projectLogo ?? ""}
                  progressImage={activeProject?.progressImage ?? ""}
                  projectNumber={`${activeIndex + 1}/${data.length}`}
                  statusBadge={activeProject?.statusBadge ?? ""}
                  phases={activeProject?.phases ?? []}
                  currentPhase={activeProject?.currentPhase ?? 0}
                  progressCardHeader={
                    activeProject?.progressCardHeader ?? "Current Progress"
                  }
                />
              </Box>

            {/* Image slider */}
            <Box mt={{ xs: 2, md: 4, lg: 6 }}>
              <Grid container spacing={{ xs: 0.7, md: 1.4, lg: 2 }}>
                {data.map((project, index) => {
                  const isLoaded = loadedImages[index];
                  return (
                    <Grid size={{ xs: 3 }} key={index}>
                      <Box
                        onClick={() => setActiveIndex(index)}
                        sx={{
                          width: "100%",
                          border:
                            activeIndex === index
                              ? `2px solid ${theme.palette.primary.main}`
                              : "transparent",
                          p: { xs: 0.5, md: 1, lg: 1.5 },
                          borderRadius: 3,
                          transition: "all .3s ease",
                          cursor: "pointer",

                          "&:hover": {
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: "80px", md: "160px", lg: "280px" },
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
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
                          <Box
                            loading={index === activeIndex ? "eager" : "lazy"}
                            fetchPriority={index === activeIndex ? "high" : "auto"}
                            decoding="async"
                            component="img"
                            src={project.image}
                            alt={project.name}
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
                          color={theme.palette.text.primary}
                          textAlign="center"
                        >
                          {project.name}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              {/* Arrows between images and text */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: { xs: 3, md: 4, lg: 5 },
                  mb: { xs: 2, md: 3, lg: 4 },
                }}
              >
                <Box
                  onClick={handlePrev}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: theme.palette.text.primary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  <ArrowBackIosIcon style={{ fontSize: "18px" }} />
                </Box>
                <Box
                  onClick={handleNext}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: theme.palette.text.primary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </Box>
              </Box>

              {/* Text */}
              <Box mt={{ xs: 4, md: 6, lg: 8 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Typography
                      variant="h3"
                      component="h1"
                      sx={{
                        color: "#484848",
                        fontWeight: typographyTokens.fontWeights.regular,
                        mb: { xs: 4, md: 5, lg: 6 },
                        lineHeight: 2.2,
                      }}
                    >
                      {activeProject.expandedDescription ?? ""}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
              {/* Text */}
              <Box mt={{ xs: 4, md: 6, lg: 8 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Typography
                      variant="h3"
                      component="h1"
                      sx={{
                        color: "#484848",
                        fontWeight: typographyTokens.fontWeights.regular,
                        mb: { xs: 4, md: 5, lg: 6 },
                        lineHeight: 2.2,
                      }}
                    >
                      {activeProject.description ?? ""}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
              <Divider
                sx={{
                  mb: { xs: 4, md: 6, lg: 8 },
                  mx: { xs: -2, md: -4, lg: -6 },
                  width: {
                    xs: "calc(100% + 32px)",
                    md: "calc(100% + 64px)",
                    lg: "calc(100% + 96px)",
                  },
                }}
              />
              <Grid
                container
                spacing={{ xs: 3, md: 4, lg: 5 }}
                mt={{ xs: 4, md: 5, lg: 6 }}
              >
                {activeProject?.features.map((item: any, index: number) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Stack
                      spacing={{ xs: 2, md: 2.5 }}
                      sx={{
                        // p: { xs: 3, md: 4, lg: 5 },
                        height: "100%",
                      }}
                    >
                      {/* ICON */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          mb: { xs: 1, md: 1.5 },
                        }}
                      >
                        <item.icon color={theme.palette.text.primary} />
                      </Box>

                      {/* TITLE */}
                      <Typography
                        variant="h3"
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: typographyTokens.fontWeights.medium,
                          mb: { xs: 1, md: 1.5 },
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* DESCRIPTION */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: typographyTokens.fontWeights.regular,
                          color: theme.palette.text.primary,
                          lineHeight: 1.8,
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Box>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: { xs: "auto", md: "800px", lg: "70vh" },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          mb: 1,
        }}
      >
        <Box
          component="img"
          src={images[featuredImageIndex]}
          alt={`${activeProject?.name ?? "Project"} preview ${featuredImageIndex + 1}`}
          loading={featuredImageIndex === 0 ? "eager" : "lazy"}
          fetchPriority={featuredImageIndex === 0 ? "high" : "auto"}
          decoding="async"
          sizes="100vw"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.6)",
            color: theme.palette.primary.contrastText,
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.6)",
            color: theme.palette.primary.contrastText,
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box
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
             mb: { xs: 4, md: 6, lg: 8 },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
        }}
      >
        {images.map((img: string, index: number) => (
          <Box
            key={index}
            onClick={() => setFeaturedImageIndex(index)}
            sx={{
              flex: { xs: "0 0 80px", md: "0 0 calc((100% - 64px) / 5)" },
              minWidth: { xs: "80px", md: "calc((100% - 64px) / 5)" },
              width: { xs: "80px", md: "calc((100% - 64px) / 5)" },
              height: { xs: 80, md: 180 },
              overflow: "hidden",
              cursor: "pointer",
              opacity: index === featuredImageIndex ? 1 : 0.6,
              transition: "all .25s ease",
              scrollSnapAlign: "start",

              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`${activeProject?.name ?? "Project"} thumbnail ${index + 1}`}
              loading={index === featuredImageIndex ? "eager" : "lazy"}
              fetchPriority={index === featuredImageIndex ? "high" : "auto"}
              decoding="async"
              sizes="(max-width: 900px) 80px, 20vw"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default BestInvestmentOpportunity;
