import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FeaturedProjectCard from "../../../../components/BestInvestmentOpportunityComponents/FeaturedProjectCard";
import { typographyTokens } from "../../../../theme/MuiTheme";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import EastIcon from "@mui/icons-material/East";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import StrategicInvestmentIcon from "../../../../assets/DesignElement/StrategicInvestmentIcon";
import PremierFacilitiesIcon from "../../../../assets/DesignElement/PremierFacilitiesIcon";
import ArtfullyCraftedLivingIcon from "../../../../assets/DesignElement/ArtfullyCraftedLivingIcon";
import StrongRentalIcon from "../../../../assets/DesignElement/StrongRentalIcon";

const features = [
  {
    title: "Strategic Investment",
    desc: "A 30+ year investment strategy commitment designed to align with your financial goals, whether short, medium, or long-term.",
    icon: <StrategicInvestmentIcon />,
  },
  {
    title: "Premier Facilities",
    desc: "Lili Village offers balanced living with spacious layouts, high-end finishes, and modern conveniences, including gym, pool bar, and swimming pool.",
    icon: <PremierFacilitiesIcon />,
  },
  {
    title: "Artfully Crafted Living",
    desc: "Thoughtfully designed spaces where open layouts seamlessly connect living areas, fostering harmony with nature and community.",
    icon: <ArtfullyCraftedLivingIcon />,
  },
  {
    title: "Strong Rental Returns",
    desc: "High rental yields driven by strategic growth and multi-developing infrastructure, making it ideal for reliable income.",
    icon: <StrongRentalIcon />,
  },
];

const BestInvestmentOpportunity = () => {
  const theme = useTheme();
  const items = ["Lili Village", "The Hive", "Little Soho", "Dynasty 8"];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      sx={{
        bgcolor: "#232323",
        px: { xs: 2, md: 4, lg: 6 },
        pt: { xs: 2, md: 4, lg: 6 },
      }}
    >
      <Box
        sx={{
          bgcolor: "#000",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          {/* HEADER */}
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
            mb={{ xs: 6, md: 10 }}
          >
            <Typography
              variant="heroTitle"
              component="h1"
              color={theme.palette.primary.contrastText}
              sx={{
                maxWidth: "60%",
              }}
            >
              Best investment opportunity
            </Typography>

            <Button
              variant="outlined"
              sx={{
                color: theme.palette.primary.contrastText,
                borderColor: theme.palette.primary.contrastText,
                borderRadius: 50,
                px: 3,
                py: 1,
                fontWeight: typographyTokens.fontWeights.regular,
                fontSize: typographyTokens.fontSizes["3xl"],
                "& .MuiButton-startIcon svg": {
                  fontSize: 32,
                },
              }}
              startIcon={<PlayCircleOutlineIcon />}
              endIcon={<EastIcon />}
            >
              CONSTRUCTION UPDATE
            </Button>
          </Stack>
          <Divider
            sx={{
            backgroundColor: theme.palette.divider,
              mt: 4,
              mb: { xs: 6, md: 10 },
            }}
          />
          <FeaturedProjectCard />
          <Box mt={{ xs: 2, md: 4, lg: 6 }} display="flex" gap={3}>
            <Grid container spacing={2}>
              {items.map((item, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <Box
                    key={item}
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      borderRadius: 3,
                      p: 1.5,
                      cursor: "pointer",
                      border: index === activeIndex ? "2px solid #5CFF9D" : "",
                      transition: "all .3s ease",

                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
                      sx={{
                        width: "100%",
                        height: 350,
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />

                    <Typography
                      mt={2}
                      fontSize={16}
                      fontWeight={500}
                      color="white"
                      textAlign="center"
                    >
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* DOTS + NAVIGATION */}
          <Box
            mt={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* DOTS */}
            <Box display="flex" gap={1.5} justifyContent="center" flex={1}>
              {items.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: index === activeIndex ? "" : "2px solid #ffff",
                    bgcolor: index === activeIndex ? "#ffffff" : "",
                    transition: "all .3s ease",
                  }}
                />
              ))}
            </Box>

            {/* PREV / NEXT */}
            <Box display="flex" gap={1}>
              {/* PREV */}
              <Box
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? items.length - 1 : prev - 1,
                  )
                }
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 24,
                  userSelect: "none",
                  transition: "all .2s ease",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <ArrowBackIosNewIcon />
              </Box>

              {/* NEXT */}
              <Box
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === items.length - 1 ? 0 : prev + 1,
                  )
                }
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  bgcolor: "#ffffff",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 24,
                  userSelect: "none",
                  transition: "all .2s ease",

                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <ArrowForwardIosIcon />
              </Box>
            </Box>
          </Box>
          {/* PROJECT DESCRIPTION */}
          <Box mt={8}>
            <Typography
              variant="heroSubTitle"
              component="h1"
              sx={{
                color: theme.palette.text.secondary,
                mb: { xs: 2, md: 4, lg: 6 },
                lineHeight: 1.6,
              }}
            >
              Lili Village spans 2960 square meters of artfully designed space
              offering 18 unique townhouses crafted in 2-bedroom (155 sqm) and
              3-bedroom (235 sqm) styles. At its heart lies a social clubhouse,
              blending art and balance, where a gym, pool bar, serene swimming
              pool, and a communal restaurant create a harmonious living
              experience.
            </Typography>

            <Button
              variant="text"
              sx={{
                color: theme.palette.primary.contrastText,
                fontSize: typographyTokens.fontSizes["3xl"],
                fontWeight: typographyTokens.fontWeights.regular,
                textTransform: "none",
                px: 0,
                "&:hover": { background: "transparent" },
              }}
              endIcon={
                <NorthEastIcon
                  sx={{ fontSize: typographyTokens.fontSizes["3xl"] }}
                />
              }
            >
              Read More
            </Button>
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
                <Stack spacing={2} p={{ xs: 2, md: 4, lg: 8 }}>
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
                      color: theme.palette.primary.contrastText,
                      fontWeight: typographyTokens.fontWeights.medium,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: typographyTokens.fontWeights.regular,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default BestInvestmentOpportunity;
