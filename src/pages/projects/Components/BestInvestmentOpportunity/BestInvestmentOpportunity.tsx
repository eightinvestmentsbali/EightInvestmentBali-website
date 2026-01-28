import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "./Components/FeaturedProjectCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { typographyTokens } from "../../../../theme/MuiTheme";
import StrategicInvestmentIcon from "../../../../assets/DesignElement/StrategicInvestmentIcon";
import PremierFacilitiesIcon from "../../../../assets/DesignElement/PremierFacilitiesIcon";
import ArtfullyCraftedLivingIcon from "../../../../assets/DesignElement/ArtfullyCraftedLivingIcon";
import StrongRentalIcon from "../../../../assets/DesignElement/StrongRentalIcon";

const images = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1676500684456-99f21e42a6fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1634344656611-0773d8dbbe2c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <VideoPlayer />
      <Grid size={{ xs: 12 }}>
        <Box sx={{ mt: { xs: 15, md: 20, lg: 25 } }}>
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              mb: { xs: 2, md: 4, lg: 6 },
              maxWidth: "60%",
            }}
          >
            Best investment opportunity
          </Typography>

          <Divider
            sx={{
              height: "2px",
              backgroundColor: theme.palette.divider,
              mb: { xs: 2, md: 6, lg: 10 },
            }}
          />
          <FeaturedProjectCard />
          <Box sx={{ mt: { xs: 3, md: 6, lg: 12 } }}>
            {/* Image slider */}
            <Grid container spacing={5}>
              {images.map((img, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <Box
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      width: "100%",
                      height: "320px",
                      border:
                        activeIndex === index
                          ? `2px solid ${theme.palette.primary.main}`
                          : "2px solid transparent",
                      p: activeIndex === index ? 1 : 0,
                      borderRadius: 3,
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
                        borderRadius: 3,
                        objectFit: "cover",
                        cursor: "pointer",
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
                mt: 4,
                mb: 3,
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
            <Box mt={8}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: "#484848",
                  fontWeight: typographyTokens.fontWeights.regular,
                  mb: { xs: 2, md: 4, lg: 6 },
                  lineHeight: 2.2,
                }}
              >
                Lili Village spans 2,960 square meters of artfully designed
                space, offering 18 unique townhouses crafted in 2-bedroom (155
                sqm) and 3-bedroom (235 sqm) styles. At its heart lies a social
                clubhouse, blending art and balance, where a gym, pool bar,
                serene swimming pool, and a communal restaurant create a
                harmonious living experience.
              </Typography>
            </Box>
            <Grid
              container
              spacing={6}
              mt={{ xs: 2, md: 4, lg: 6 }}
              maxWidth={{ xs: "100%", md: "80%" }}
              mx="auto"
            >
              {features.map((item, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Stack spacing={2} p={{ xs: 2, md: 4 }}>
                    {/* ICON */}
                    <Box
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
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
                        lineHeight: 2,
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
