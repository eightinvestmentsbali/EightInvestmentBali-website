import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { typographyTokens } from "../../../../theme/MuiTheme";

const services = [
  {
    title: "Real Estate\nDevelopment",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    title: "Facility\nManagement",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
  {
    title: "Property Assets\nManagement",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
  {
    title: "Strategic Investment\nConsultancy",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

const OurServices: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      id="our-services"
      sx={{
        bgcolor: theme.palette.background.paper,
        py: { xs: 2, md: 5, lg: 10 },
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <Stack spacing={{ xs: 2, md: 4, lg: 6 }} mb={{ xs: 3, md: 6 }}>
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: typographyTokens.fontWeights.medium,
            }}
          >
            Our Services
          </Typography>
          <Divider sx={{ width: "100%", height: "2px", bgcolor: "#67697C" }} />
        </Stack>
        {/* GRID */}
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid size={{ xs: 12, md: 6 }} key={service.title}>
              <Box>
                <Box
                  sx={{
                    position: "relative",
                    height: 400,
                    width: "100%",
                    // Add a light background color to see the "cutout" area if needed
                    // backgroundColor: "#f5f5f5",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  {/* The Text Label in the cutout area */}
                  <Typography
                    variant="h5"
                    sx={{
                      position: "absolute",
                      top: 15,
                      left: 15,
                      fontWeight: "regular",
                      width: "200px", // Limits width to stay in the notch
                      lineHeight: 1.2,
                      zIndex: 2,
                    }}
                  >
                    {service.title}
                  </Typography>

                  <svg width="0" height="0" style={{ position: "absolute" }}>
                    <defs>
                      <clipPath
                        id="stairClip"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path
                          d="
                            M 0,0.25 
                            V 0.95 
                            Q 0,1 0.05,1 
                            H 0.95 
                            Q 1,1 1,0.95 
                            V 0.05 
                            Q 1,0 0.95,0 
                            H 0.35 
                            Q 0.3,0 0.3,0.05 
                            V 0.15
                            Q 0.3,0.2 0.25,0.2 
                            H 0.05 
                            Q 0,0.2 0,0.25 
                            Z
                          "
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <Box
                    component="img"
                    src={service.image} // Replace with your image source
                    alt="Facility Management"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      clipPath: "url(#stairClip)",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurServices;
