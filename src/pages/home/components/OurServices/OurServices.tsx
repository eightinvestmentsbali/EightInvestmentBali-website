import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { typographyTokens } from "../../../../theme/MuiTheme";

const services = [
  {
    title: "Real Estate\nDevelopment",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description:
      "Our real estate development division focuses on creating sustainable, high-value properties that harmonize with the local environment while providing modern luxury. From initial site selection to final construction, we ensure every detail meets our rigorous standards of quality and design excellence.",
  },
  {
    title: "Facility\nManagement",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    description:
      "We provide comprehensive facility management services designed to preserve and enhance the value of your property. Our team handles everything from technical maintenance and security to landscaping and housekeeping, ensuring a seamless living experience for residents.",
  },
  {
    title: "Property Assets\nManagement",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    description:
      "Maximize your investment potential with our strategic asset management. We handle tenant relations, financial reporting, and long-term value appreciation strategies, allowing owners to enjoy passive income without the stress of day-to-day operations.",
  },
  {
    title: "Strategic Investment\nConsultancy",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    description:
      "Our consultancy services provide deep market insights and financial modeling for investors looking to enter the Bali market. We guide you through legal frameworks, ROI projections, and risk assessment to ensure your capital is deployed effectively.",
  },
];

const OurServices: React.FC = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (service: (typeof services)[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <Box
      id="our-services"
      sx={{
        bgcolor: theme.palette.background.paper,
        pb: { xs: 2, md: 5, lg: 10 },
        mt: { xs: 3.75, sm: 7.5, md: 13, lg: 26 },
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
            <Grid
              size={{ xs: 12, sm: 6, md: 6 }}
              sx={{ cursor: "pointer" }}
              key={service.title}
            >
              <Box
                sx={{
                  position: "relative",
                  curser: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => handleOpenModal(service)}
              >
                <svg width="0" height="0" style={{ position: "absolute" }}>
                  <defs>
                    <clipPath
                      id="topFrameClip"
                      clipPathUnits="objectBoundingBox"
                    >
                      <path
                        d="
                              M 0,0 
                              H 0.40 
                              Q 0.3,0 0.3,0.05 
                              V 0.15
                              Q 0.3,0.2 0.25,0.2 
                              H 0.05 
                              Q 0,0.2 0,0.25 
                              V 0.95 
                              Q 0,1 0.05,1 
                              H 0.95 
                              Q 1,1 1,0.95 
                              V 0.05 
                              Q 1,0 0.95,0 
                              Z
                            "
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "250px", sm: "300px", md: "400px" },
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
                      fontSize: {
                        xs: typographyTokens.fontSizes.sm,
                        md: typographyTokens.fontSizes.md,
                        sm: typographyTokens.fontSizes.sm,
                        lg: typographyTokens.fontSizes.lg,
                      },
                      position: "absolute",
                      top: { xs: "2%", sm: "3%", md: "5%" },
                      left: "10px",
                      fontWeight: "regular",
                      width: {
                        xs: "80px",
                        sm: "90px",
                        md: "140px",
                        lg: "180px",
                      },
                      lineHeight: 1.2,
                      zIndex: 2,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Box
                    component="img"
                    src={service.image} // Replace with your image source
                    alt="Facility Management"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      clipPath: "url(#topFrameClip)",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* MODAL SYSTEM */}
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
            selectedService && (
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
                style={{
                  position: "relative",
                  width: "90%",
                  maxWidth: "900px",
                  height: "80vh",
                  backgroundColor: "#000",
                  borderRadius: "16px",
                  overflow: "hidden",
                  zIndex: 1,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Background Image */}
                <Box
                  component="img"
                  src={selectedService.image}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                />

                {/* Dark Gradient Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background: `
                      linear-gradient(
                        to top,
                        rgba(0,0,0,0.85) 0%,
                        rgba(0,0,0,0.55) 40%,
                        rgba(0,0,0,0.15) 70%,
                        rgba(0,0,0,0) 100%
                      )
                    `,
                  }}
                />

                {/* Close Button */}
                <IconButton
                  onClick={() => setIsModalOpen(false)}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 3,
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Bottom-Left Content */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 20, md: 40 },
                    bottom: { xs: 20, md: 40 },
                    zIndex: 2,
                    maxWidth: "520px",
                  }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        color: "#fff",
                        mb: 2,
                        fontWeight: typographyTokens.fontWeights.medium,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {selectedService.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.8,
                        fontSize: { xs: "1rem", md: "1.125rem" },
                      }}
                    >
                      {selectedService.description}
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>
            )
          )}
        </>
      </Modal>
    </Box>
  );
};

export default OurServices;
