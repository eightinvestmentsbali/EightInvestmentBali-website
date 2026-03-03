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
// import RealEstateDevelopemntImage from "../../../../assets/OurServicesImages/RealEstateDevelopment.jpg";
// import FacilityManagementImage from "../../../../assets/OurServicesImages/FacilityManagement.jpg";
// import PropertyAssetsManagementImage from "../../../../assets/OurServicesImages/PropertyAssetManagement.jpg";
// import StrategicInvestmentConsultancyImage from "../../../../assets/OurServicesImages/StrategicInvestmentConsultancy.jpg";

const services = [
  {
    title: "Real Estate\nDevelopment",
    image: "https://eightinvestment.s3.us-east-1.amazonaws.com/files/OurServicesImages/RealEstateDevelopment.jpg",
    subTitle:
      "Eight Investments Bali unlocks a world of bespoke Real Estate Development opportunities, allowing you to transform your vision into a reality that transcends exceptional property.",
    description:
      "We collaborate with investors to craft exceptional real estate experiences. Our team of experts will guide you through every step, from securing the most coveted locations to utilizing cutting-edge technologies and the finest materials to ensure a timeless investment that embodies investor's vision and delivers exceptional returns.",
  },
  {
    title: "Facility\nManagement",
    image: "https://eightinvestment.s3.us-east-1.amazonaws.com/files/OurServicesImages/FacilityManagement.jpg",
    subTitle:
      "Eight Investments Bali provides seamless integrated facility services, ensuring invested property operates flawlessly behind the scenes.",
    description:
      "Imagine a world where impeccable maintenance, pristine housekeeping, and top-tier security are effortlessly handled. Our dedicated team takes care of every detail, allowing investor to focus on the true luxury - enjoying your Bali retreat while maximizing rental income.",
  },
  {
    title: "Property Assets\nManagement",
    image: "https://eightinvestment.s3.us-east-1.amazonaws.com/files/OurServicesImages/PropertyAssetManagement.jpg",
    subTitle:
      "Investing in Bali's thriving real estate market unlocks a world of potential. But navigating day-to-day operations shouldn't disrupt investor's vision.",
    description: `Eight Investments Bali offers discerning asset management, ensuring owner's property thrives while investor seamlessly enjoy the rewards. Our dedicated team handles everything - from meticulous tenant selection to maximizing rental yields.
      {"\n\n"}
      Imagine worry-free ownership while the investment flourishes. Investor can focus on what matters most - experiencing the magic of Bali.`,
  },
  {
    title: "Strategic Investment\nConsultancy",
    image: "https://eightinvestment.s3.us-east-1.amazonaws.com/files/OurServicesImages/StrategicInvestmentConsultancy.jpg",
    subTitle:
      "Navigate with Confidence. Eight Investments Bali provides strategic investment counsel, guiding you towards maximizing your returns with astute precision.",
    description: `Our team of experts acts as investor's trusted advisor, meticulously analyzing market trends and identifying the most unique opportunities. We craft personalized investment strategies that align with investor's financial goals, ensuring every decision is informed and empowering.
      {"\n\n"}
      Embrace Bali's hidden potential with confidence.`,
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
        py: {
          xs: 3,
          sm: 4,
          md: 6.5,
          lg: 10,
        },
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER */}
        <Stack spacing={{ xs: 1, sm: 2, md: 4, lg: 6 }} mb={{ xs: 3, md: 6 }}>
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
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={service.title}>
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.9 },
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
                    height: {
                      xs: "250px",
                      sm: "280px",
                      md: "350px",
                      lg: "380px",
                      xl: "400px",
                    },
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
                        sm: typographyTokens.fontSizes.sm,
                        md: typographyTokens.fontSizes.sm,
                        lg: typographyTokens.fontSizes.md,
                        xl: typographyTokens.fontSizes.lg,
                      },
                      position: "absolute",
                      top: {
                        xs: "1%",
                        sm: "2%",
                        md: "3%",
                        lg: "3.5%",
                        xl: "4%",
                      },
                      left: "1%",
                      fontWeight: "regular",
                      width: {
                        xs: "80px",
                        sm: "90px",
                        md: "100px",
                        lg: "140px",
                        xl: "180px",
                      },
                      // bgcolor: "#ccc",
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
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
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
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "relative",
                  width: "95%",
                  maxWidth: "1000px",
                  height: "85vh", // Slightly taller for more content
                  backgroundColor: "#000",
                  borderRadius: "24px",
                  overflow: "hidden",
                  zIndex: 1,
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Background Image */}
                <Box
                  component="img"
                  src={selectedService.image}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%;",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                />

                {/* Combined Overlay: Gradient + Subtle Solid Backing for Text Area */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background: `linear-gradient(to top, 
                  rgba(0,0,0,0.9) 0%, 
                  rgba(0,0,0,0.6) 50%, 
                  rgba(0,0,0,0.2) 100%)`,
                  }}
                />

                {/* Close Button */}
                <IconButton
                  onClick={() => setIsModalOpen(false)}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 10,
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Content Wrapper with Background Color for Text */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "50%", // Adjust height as needed
                    zIndex: 1,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 90%, transparent 100%)",
                    backdropFilter: "blur(6px)",
                    WebkitMaskImage: `linear-gradient(to top, 
                      black 0%, 
                      black 90%, 
                      transparent 100%
                    )`,
                    maskImage: `linear-gradient(to top, 
                      black 0%, 
                      black 90%, 
                      transparent 100%
                    )`,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    zIndex: 2, // Higher Z-index than the plate
                    p: { xs: 3, md: 6 },
                  }}
                >
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Automatic Font Sizing using Clamp */}
                    <Typography
                      variant="h2"
                      sx={{
                        color: theme.palette.primary.contrastText,
                        // clamp(min, preferred, max)
                        fontSize: {
                          xs: "clamp(1.5rem, 8vw, 2.5rem)",
                          md: "clamp(2.5rem, 5vw, 3rem)",
                        },
                        mb: 1,
                        zIndex: 2,
                        fontWeight: 700,
                        whiteSpace: "pre-line",
                        lineHeight: 1.1,
                      }}
                    >
                      {selectedService.title}
                    </Typography>

                    {/* Subtitle with distinct styling */}
                    <Typography
                      sx={{
                        color: theme.palette.primary.main, // Or any highlight color
                        fontSize: {
                          xs: "clamp(0.9rem, 4vw, 1.1rem)",
                          md: "clamp(1.1rem, 2vw, 1.5rem)",
                        },
                        fontWeight: typographyTokens.fontWeights.medium,
                        lineHeight: 1.5,
                        mb: 3,
                      }}
                    >
                      {selectedService.subTitle || "Investment Opportunity"}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.contrastText,
                        lineHeight: 1.5,
                        fontSize: {
                          xs: "clamp(0.875rem, 3vw, 0.6rem)",
                          md: "clamp(1rem, 1.2vw, 1rem)",
                        },
                        maxWidth: "800px",
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
