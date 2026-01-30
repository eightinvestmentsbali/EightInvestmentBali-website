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
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { typographyTokens } from "../../../../theme/MuiTheme";

const services = [
  {
    title: "Real Estate\nDevelopment",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "Our real estate development division focuses on creating sustainable, high-value properties that harmonize with the local environment while providing modern luxury. From initial site selection to final construction, we ensure every detail meets our rigorous standards of quality and design excellence.",
  },
  {
    title: "Facility\nManagement",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    description: "We provide comprehensive facility management services designed to preserve and enhance the value of your property. Our team handles everything from technical maintenance and security to landscaping and housekeeping, ensuring a seamless living experience for residents.",
  },
  {
    title: "Property Assets\nManagement",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    description: "Maximize your investment potential with our strategic asset management. We handle tenant relations, financial reporting, and long-term value appreciation strategies, allowing owners to enjoy passive income without the stress of day-to-day operations.",
  },
  {
    title: "Strategic Investment\nConsultancy",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    description: "Our consultancy services provide deep market insights and financial modeling for investors looking to enter the Bali market. We guide you through legal frameworks, ROI projections, and risk assessment to ensure your capital is deployed effectively.",
  },
];

const OurServices: React.FC = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (service: typeof services[0]) => {
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
            <Grid size={{ xs: 12, md: 6 }} sx={{ cursor: "pointer" }} key={service.title}>
              <Box sx={{ position: "relative", curser: "pointer", "&:hover": { opacity: 0.8 } }} onClick={() => handleOpenModal(service)}>
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
                      top: "20px",
                      left: "10px",
                      fontWeight: "regular",
                      width: "200px",
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
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
      >
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "relative",
                width: "80px",
                height: "80px",
                backgroundColor: "#000",
                borderRadius: "16px",
                border: `2px solid #5CFF9D`,
                zIndex: 1,
              }}
            />
          ) : (
            selectedService && (
              <motion.div
                initial={{ scale: 0.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
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
                }}
              >
                <Box sx={{ position: "relative", width: "100%", height: { xs: "250px", md: "400px" } }}>
                  <IconButton
                    onClick={() => setIsModalOpen(false)}
                    sx={{ position: "absolute", top: 16, right: 16, zIndex: 10, bgcolor: "rgba(0, 0, 0, 0.5)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}
                  >
                    <CloseIcon />
                  </IconButton>
                  
                  <Box
                    component="img"
                    src={selectedService.image}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>

                <Box sx={{ p: { xs: 3, md: 5 }, overflowY: "auto", flex: 1 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#fff",
                      mb: 2,
                      fontWeight: typographyTokens.fontWeights.medium,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {selectedService.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.8,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                    }}
                  >
                    {selectedService.description}
                  </Typography>
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
