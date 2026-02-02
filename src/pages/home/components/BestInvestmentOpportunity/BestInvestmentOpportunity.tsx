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
import { motion, useScroll, useTransform } from "framer-motion";
import StrategicInvestmentIcon from "../../../../assets/DesignElement/StrategicInvestmentIcon";
import PremierFacilitiesIcon from "../../../../assets/DesignElement/PremierFacilitiesIcon";
import ArtfullyCraftedLivingIcon from "../../../../assets/DesignElement/ArtfullyCraftedLivingIcon";
import StrongRentalIcon from "../../../../assets/DesignElement/StrongRentalIcon";

const features = [
  {
    title: "Strategic Investment",
    desc: "A 30+ year investment strategy commitment designed to align with your financial goals, whether short, medium, or long-term.",
    icon: <StrategicInvestmentIcon />,
  },
  {
    title: "Premier Facilities",
    desc: "Lili Village offers balanced living with spacious layouts, high-end finishes, and modern conveniences, including gym, pool bar, and swimming pool.",
    icon: <PremierFacilitiesIcon />,
  },
  {
    title: "Artfully Crafted Living",
    desc: "Thoughtfully designed spaces where open layouts seamlessly connect living areas, fostering harmony with nature and community.",
    icon: <ArtfullyCraftedLivingIcon />,
  },
  {
    title: "Strong Rental Returns",
    desc: "High rental yields driven by strategic growth and multi-developing infrastructure, making it ideal for reliable income.",
    icon: <StrongRentalIcon />,
  },
];

const projects = [
  {
    name: "Lili Village",
    location: "Abianbase–Mengwi, Bali",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    progressImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description:
      "Lili Village spans 2960 square meters of artfully designed space offering 18 unique townhouses crafted in 2-bedroom (155 sqm) and 3-bedroom (235 sqm) styles. At its heart lies a social clubhouse, blending art and balance, where a gym, pool bar, serene swimming pool, and a communal restaurant create a harmonious living experience.",
  },
  {
    name: "The Hive",
    location: "Abianbase–Mengwi, Bali",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    progressImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description:
      "The Hive represents a modern architectural masterpiece, featuring innovative design concepts that seamlessly blend contemporary living with traditional Balinese aesthetics. This development offers luxury residences with state-of-the-art amenities and breathtaking views of the surrounding landscape.",
  },
  {
    name: "Little Soho",
    location: "Abianbase–Mengwi, Bali",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    progressImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description:
      "Little Soho brings urban sophistication to Bali with its chic design and vibrant community spaces. Each unit is thoughtfully designed to maximize space and natural light, creating an inviting atmosphere that reflects the dynamic energy of modern living in paradise.",
  },
  {
    name: "Dynasty 8",
    location: "Abianbase–Mengwi, Bali",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    progressImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description:
      "Dynasty 8 embodies luxury and exclusivity, offering premium residences with world-class facilities. This prestigious development features elegant architecture, private amenities, and exceptional attention to detail, creating an unparalleled living experience for discerning investors.",
  },
];

const BestInvestmentOpportunity = () => {
  const theme = useTheme();
  const items = projects.map((p) => p.name);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  // const isInitialMount = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate opacity for the title - fades out as you scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

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

  return (
    <Box
      id="best-investment-opportunity"
      ref={containerRef}
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
              opacity: titleOpacity,
              y: titleY,
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
                sx={{
                  maxWidth: { xs: "100%", md: "60%" },
                }}
              >
                Best investment opportunity
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.primary.contrastText,
                  borderColor: theme.palette.primary.contrastText,
                  borderRadius: 50,
                  display: { xs: "none", sm: "inline-flex" },
                  px: { xs: 2, sm: 2, md: 3 },
                  py: { xs: 0.5, sm: 0.8, md: 1, lg: 2 },
                  flexShrink: 0,
                  fontWeight: typographyTokens.fontWeights.regular,
                  fontSize: { xs: "8px", sm: "12px", md: "16px", lg: "32px" },
                  "& .MuiButton-startIcon svg": {
                    fontSize: { xs: "8px", sm: "16px", md: "20px", lg: "32px" },
                  },
                  "& .MuiButton-endIcon svg": {
                    fontSize: { xs: "8px", sm: "16px", md: "20px", lg: "32px" },
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
          <FeaturedProjectCard
            projectName={projects[activeIndex].name}
            location={projects[activeIndex].location}
            image={projects[activeIndex].image}
            progressImage={projects[activeIndex].progressImage}
            onSeeMoreClick={() => setIsModalOpen(true)}
          />
          {/* CAROUSEL ITEMS */}
          <Box mt={{ xs: 2, md: 4, lg: 6 }}>
            <Grid container spacing={{ xs: 0.7, md: 1.4, lg: 2 }}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 3 }} key={project.name}>
                  <Box
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      borderRadius: 3,
                      p: { xs: 0.5, md: 1, lg: 1.5 },
                      cursor: "pointer",
                      border: index === activeIndex ? "2px solid #5CFF9D" : "",
                      transition: "all .3s ease",

                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={project.image}
                      sx={{
                        width: "100%",
                        height: { xs: "80px", md: "160px", lg: "280px" },
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />

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
              ))}
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
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    width: { xs: "10px", md: "12px", lg: "15px" },
                    height: { xs: "10px", md: "12px", lg: "15px" },
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: index === activeIndex ? "" : "2px solid #ffff",
                    bgcolor: index === activeIndex ? "#ffffff" : "",
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
                  setActiveIndex((prev) =>
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
                  setActiveIndex((prev) =>
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
              {projects[activeIndex].description}
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
            {features.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                <Stack spacing={2} p={{ xs: 2, md: 4, lg: 8 }}>
                  {/* ICON */}
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
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
                    src={projects[activeIndex].image}
                    alt={projects[activeIndex].name}
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
                      src={projects[activeIndex].progressImage}
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
                    {projects[activeIndex].name}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      fontWeight: typographyTokens.fontWeights.regular,
                    }}
                  >
                    {projects[activeIndex].location}
                  </Typography>
                  <Typography
                    variant="heroSubTitle"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                    }}
                  >
                    {projects[activeIndex].description}
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
