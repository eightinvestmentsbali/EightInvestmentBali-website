import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { projectsData } from "../../../../components/Data/projectsData";
import { useNavigate } from "react-router-dom";

const projects = projectsData;
const Projects: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#232323" }}>
      <Box
        id="our-projects"
        sx={{
          px: { xs: 2, md: 4, lg: 6 },
          pb: { xs: 4, md: 6 },
          pt: { xs: 4, md: 6, lg: 8 },
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

        <Grid container spacing={5}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={project.name}>
              <Box
                onClick={() =>
                  navigate("/project-details", {
                    state: { projectIndex: index },
                  })
                }
                sx={{
                  overflow: "hidden",
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
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  sx={{
                    borderRadius: { xs: 3, md: 4, lg: 5 },
                    width: "100%",
                    height: { xs: 200, md: 280, lg: 350, xl: 400 },
                    objectFit: "cover",
                    transition: "transform .5s ease",
                    imageRendering: "-webkit-optimize-contrast",
                  }}
                />

                {/* TITLE */}
                <Box sx={{ py: 1.5, bgcolor: "transparent" }}>
                  <Typography
                    variant="h3"
                    align="center"
                    sx={{
                      color: theme.palette.primary.contrastText,
                      fontWeight: typographyTokens.fontWeights.medium,
                      bgcolor: "transparent",
                    }}
                  >
                    {project.name}
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

export default Projects;
