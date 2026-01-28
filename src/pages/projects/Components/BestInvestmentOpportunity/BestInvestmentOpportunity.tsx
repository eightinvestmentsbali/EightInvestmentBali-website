import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "./Components/FeaturedProjectCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { motion, AnimatePresence } from "framer-motion";
import StrategicInvestmentIcon from "../../../../assets/DesignElement/StrategicInvestmentIcon";
import PremierFacilitiesIcon from "../../../../assets/DesignElement/PremierFacilitiesIcon";
import ArtfullyCraftedLivingIcon from "../../../../assets/DesignElement/ArtfullyCraftedLivingIcon";
import StrongRentalIcon from "../../../../assets/DesignElement/StrongRentalIcon";

const projects = [
  {
    name: "Lili Village",
    location: "Abianbase–Mengwi, Bali",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description: "Lili Village spans 2,960 square meters of artfully designed space, offering 18 unique townhouses crafted in 2-bedroom (155 sqm) and 3-bedroom (235 sqm) styles. At its heart lies a social clubhouse, blending art and balance, where a gym, pool bar, serene swimming pool, and a communal restaurant create a harmonious living experience.",
  },
  {
    name: "The Hive",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1676500684456-99f21e42a6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description: "The Hive represents a modern architectural masterpiece, featuring innovative design concepts that seamlessly blend contemporary living with traditional Balinese aesthetics. This development offers luxury residences with state-of-the-art amenities and breathtaking views of the surrounding landscape.",
  },
  {
    name: "Little Soho",
    location: "Canggu, Bali",
    image: "https://images.unsplash.com/photo-1634344656611-0773d8dbbe2c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description: "Little Soho brings urban sophistication to Bali with its chic design and vibrant community spaces. Each unit is thoughtfully designed to maximize space and natural light, creating an inviting atmosphere that reflects the dynamic energy of modern living in paradise.",
  },
  {
    name: "Dynasty 8",
    location: "Seminyak, Bali",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    description: "Dynasty 8 embodies luxury and exclusivity, offering premium residences with world-class facilities. This prestigious development features elegant architecture, private amenities, and exceptional attention to detail, creating an unparalleled living experience for discerning investors.",
  },
];

const features = [
  {
    title: "Strategic Investment",
    desc: "A 30+ year investment strategy commitment designed to align with your financial goals, whether short, medium, or long-term.",
    icon: <StrategicInvestmentIcon color="#000" />,
  },
  {
    title: "Premier Facilities",
    desc: "Lili Village offers balanced living with spacious layouts, high-end finishes, and modern conveniences, including gym, pool bar, and swimming pool.",
    icon: <PremierFacilitiesIcon color="#000" />,
  },
  {
    title: "Artfully Crafted Living",
    desc: "Thoughtfully designed spaces where open layouts seamlessly connect living areas, fostering harmony with nature and community.",
    icon: <ArtfullyCraftedLivingIcon color="#000" />,
  },
  {
    title: "Strong Rental Returns",
    desc: "High rental yields driven by strategic growth and multi-developing infrastructure, making it ideal for reliable income.",
    icon: <StrongRentalIcon color="#000" />,
  },
];

const BestInvestmentOpportunity: React.FC = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const activeProject = projects[activeIndex];

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <VideoPlayer />
      <Grid size={{ xs: 12 }}>
        <Box sx={{ mt: { xs: 2, md: 3, lg: 4 }, }}>
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              mb: { xs: 3, md: 4, lg: 5 },
              maxWidth: "60%",
            }}
          >
            Best investment opportunity
          </Typography>

          <Divider
            sx={{
              height: "2px",
              backgroundColor: theme.palette.divider,
              mb: { xs: 4, md: 6, lg: 8 },
              mx: { xs: -2, md: -4, lg: -6 },
              width: { xs: "calc(100% + 32px)", md: "calc(100% + 64px)", lg: "calc(100% + 96px)" },
            }}
          />
          <FeaturedProjectCard
            key={activeIndex}
            projectName={activeProject.name}
            location={activeProject.location}
            image={activeProject.image}
            progressImage={activeProject.progressImage}
            projectNumber={`${activeIndex + 1}/${projects.length}`}
          />
          <Box sx={{ mt: { xs: 4, md: 6, lg: 8 } }}>
            {/* Image slider */}
            <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                  <Box
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      width: "100%",
                      border:
                        activeIndex === index
                          ? `2px solid ${theme.palette.primary.main}`
                          : "2px solid transparent",
                      p: activeIndex === index ? 1.5 : 0,
                      borderRadius: 3,
                      opacity: index === activeIndex ? 1 : 0.6,
                      transition: "all .3s ease",
                      cursor: "pointer",

                      "&:hover": {
                        opacity: 1,
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={project.image}
                      sx={{
                        width: "100%",
                        height: { xs: 200, md: 250, lg: 280 },
                        borderRadius: 2,
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
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
                    variant="h1"
                    component="h1"
                    sx={{
                      color: "#484848",
                      fontWeight: typographyTokens.fontWeights.regular,
                      mb: { xs: 4, md: 5, lg: 6 },
                      lineHeight: 2.2,
                    }}
                  >
                    {activeProject.description}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
            <Divider
              sx={{
                mb: { xs: 4, md: 6, lg: 8 },
                mx: { xs: -2, md: -4, lg: -6 },
                width: { xs: "calc(100% + 32px)", md: "calc(100% + 64px)", lg: "calc(100% + 96px)" },
              }}
            />
            <Grid
              container
              spacing={{ xs: 3, md: 4, lg: 5 }}
              mt={{ xs: 4, md: 5, lg: 6 }}
            >
              {features.map((item, index) => (
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
                      {item.icon}
                    </Box>

                    {/* TITLE */}
                    <Typography
                      variant="h2"
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
                      variant="h3"
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
  );
};

export default BestInvestmentOpportunity;
