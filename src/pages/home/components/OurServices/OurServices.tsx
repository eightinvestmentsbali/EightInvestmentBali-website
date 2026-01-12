import React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const services = [
  {
    title: "Real Estate\nDevelopment",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  {
    title: "Facility\nManagement",
    image:
      "https://images.unsplash.com/photo-1581092334394-6b4b79c2c8c9",
  },
  {
    title: "Property Assets\nManagement",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
  {
    title: "Strategic Investment\nConsultancy",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

const OurServices: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#F6F8FA", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        {/* HEADER */}
        <Typography
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: 500,
            color: "#000",
            mb: 2,
          }}
        >
          Our Services
        </Typography>

        <Divider sx={{ mb: 6 }} />

        {/* GRID */}
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid size={{ xs: 12, md: 6 }} key={service.title}>
              <Box>
                {/* LABEL */}
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#000",
                    mb: 1,
                    whiteSpace: "pre-line",
                  }}
                >
                  {service.title}
                </Typography>

                {/* IMAGE CARD */}
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    height: 260,
                    cursor: "pointer",

                    "& img": {
                      transition: "transform .5s ease",
                    },

                    "&:hover img": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={service.image}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* VIEW MORE (only first card in screenshot) */}
                  {service.title.includes("Real Estate") && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                      }}
                    >
                      View More
                    </Box>
                  )}
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
