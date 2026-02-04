import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "./Components/FeaturedProjectCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { motion, AnimatePresence } from "framer-motion";
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

  React.useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  if (!data?.length || !data[activeIndex]) {
    return <CircularProgress />; // or Skeleton / Loader
  }

  const activeProject = data[activeIndex];
  const images = activeProject.featuresImages ?? [];

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
            <Typography
              variant="heroTitle"
              component="h1"
              sx={{
                color: theme.palette.text.primary,
                mb: { xs: 4, md: 6, lg: 10 },
              }}
            >
              Best investment <br /> opportunity
            </Typography>

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
            <FeaturedProjectCard
              key={activeIndex}
              projectName={activeProject?.name ?? ""}
              location={activeProject?.location ?? ""}
              image={activeProject?.image ?? ""}
              progressImage={activeProject?.progressImage ?? ""}
              projectNumber={`${activeIndex + 1}/${data.length}`}
            />

              {/* Image slider */}
            <Box mt={{ xs: 2, md: 4, lg: 6 }}>
              <Grid container spacing={{ xs: 0.7, md: 1.4, lg: 2 }}>
                {data.map((project, index) => (
                  <Grid size={{ xs: 3 }} key={index}>
                    <Box
                      onClick={() => setActiveIndex(index)}
                      sx={{
                        width: "100%",
                        border:
                          activeIndex === index
                            ? `2px solid ${theme.palette.primary.main}`
                            : "2px solid transparent",
                        p: { xs: 0.5, md: 1, lg: 1.5 },
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
                          height: { xs: "80px", md: "160px", lg: "280px" },
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
                        variant="h2"
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: typographyTokens.fontWeights.medium,
                          mb: { xs: 1, md: 1.5 },
                        }}
                      >
                        {item.name}
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
          gap: 2,
          justifyContent: "center",
          overflowX: "auto",
          mb: { xs: 4, md: 6, lg: 8 },
        }}
      >
        {images.map((img: string, index: number) => (
          <Box
            key={index}
            onClick={() => setFeaturedImageIndex(index)}
            sx={{
              minWidth: { xs: "80px", md: 0 },
              width: { xs: "80px", md: "auto" },
              height: { xs: 80, md: 180 },
              overflow: "hidden",
              cursor: "pointer",
              opacity: index === activeIndex ? 1 : 0.6,
              transition: "all .25s ease",

              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box
              component="img"
              src={img}
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
