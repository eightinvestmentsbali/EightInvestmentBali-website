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

        <Grid container spacing={2}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={project.name}>
              <Box
                onClick={() =>
                  navigate("/project-details", {
                    state: { projectIndex: index },
                  })
                }
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
