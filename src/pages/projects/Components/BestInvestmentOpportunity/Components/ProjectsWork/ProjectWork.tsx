import React, { useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../../../../../theme/MuiTheme";

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

const ProjectWork: React.FC = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        px: { xs: 2, md: 4, lg: 6 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: {
            xs: "285.8px",
            sm: "500px",
            md: "600px",
            lg: "calc(100vh - 500px)",
          },
          display: "flex",
          flexDirection: "column",
          mb: { xs: 3, md: 2 },
        }}
      >
        <Box
          component="img"
          src={images[activeIndex]}
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
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
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
      <Box
        sx={{
          py: { xs: 6, md: 10 },
        }}
      >
        <Typography
          variant="heroTitle"
          component="h1"
          sx={{
            color: theme.palette.text.primary,
            mb: { xs: 2, md: 4 },
            fontWeight: typographyTokens.fontWeights.medium,
          }}
        >
          Projects
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid size={{ xs: 12, sm:6, md: 6 }} key={project.title}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "#1E1E1E",
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
                  sx={{
                    width: "100%",
                    height: { xs: 220, md: 360 },
                    objectFit: "cover",
                    transition: "transform .5s ease",
                  }}
                />

                {/* TITLE */}
                <Box sx={{ py: 2 }}>
                  <Typography
                    align="center"
                    sx={{
                      color: "#ffffff",
                      fontSize: "1.1rem",
                      fontWeight: 500,
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
    </Box>
  );
};

export default ProjectWork;
