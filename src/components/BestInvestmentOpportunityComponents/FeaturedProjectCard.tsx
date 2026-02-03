import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import LocationIcon from "../../assets/DesignElement/LocationIcon";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../theme/MuiTheme";
import ArrowNortEastIcon from "../../assets/DesignElement/ArrowNortEastIcon";

interface FeaturedProjectCardProps {
  projectName: string;
  location: string;
  image: string;
  progressImage: string;
  onSeeMoreClick?: () => void;
}

const FeaturedProjectCard = ({
  projectName,
  location,
  image,
  progressImage,
  onSeeMoreClick,
}: FeaturedProjectCardProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const clipPathData =
    "M 0,0.20 Q 0,0.15 0.05,0.15 H 0.20 Q 0.25,0.15 0.25,0.1 V 0.05 Q 0.25,0 0.30,0 H 0.95 Q 1,0 1,0.05 V 0.80 Q 1,0.85 0.95,0.85 H 0.80 Q 0.75,0.85 0.75,0.9 V 0.95 Q 0.75,1 0.70,1 H 0.05 Q 0,1 0,0.95 Z";
  return (
    <Box sx={{ position: "relative" }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="outerFrameClip" clipPathUnits="objectBoundingBox">
            <path d={clipPathData} />
          </clipPath>
        </defs>
      </svg>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "5%", md: "6.5%" },
          left: "12%",
          zIndex: 10, // Higher than background
          px: 3,
          maxWidth: "30%",
          py: 1,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="h1"
          lineHeight={1.2} // Tightened slightly for large headers
          color={theme.palette.primary.contrastText}
          fontWeight={typographyTokens.fontWeights.medium}
          sx={{
            fontSize: {
              xs: typographyTokens.fontSizes["xs"], // Mobile size
              sm: typographyTokens.fontSizes["xl"], // Tablet size
              md: typographyTokens.fontSizes["3xl"],
              lg: typographyTokens.fontSizes["5xl"], // Desktop size
            },
            textAlign: { xs: "left", md: "left" },
          }}
        >
          SOLD OUT IN <br /> 3 WEEKS
        </Typography>
      </Box>

      <Box
        onClick={onSeeMoreClick}
        sx={{
          position: "absolute",
          bottom: { xs: "2%", md: "3%", lg: "4.5%" },
          right: { xs: "1%", md: "3%", lg: "5%" },
          zIndex: 20,
          maxWidth: "25%",
          px: 2,
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.5, md: 2 },
          cursor: "pointer",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "translateX(4px)",
          },
        }}
      >
        <Typography
          variant="h1"
          color={theme.palette.primary.contrastText}
          fontWeight={typographyTokens.fontWeights.medium}
          sx={{
            fontSize: {
              xs: typographyTokens.fontSizes["xs"], // Mobile size
              sm: typographyTokens.fontSizes["xl"], // Tablet size
              md: typographyTokens.fontSizes["3xl"],
              lg: typographyTokens.fontSizes["5xl"], // Desktop size
            },
            lineHeight: 1.2,
          }}
        >
          See more
        </Typography>
        <ArrowNortEastIcon
          width={isSmallScreen ? 15 : 25}
          height={isSmallScreen ? 15 : 25}
        />
      </Box>

      {/* Main Container with Curve Clip */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: { xs: "300px", sm: "400px", md: "600px", lg: "900px" },
          px: { xs: 3, sm: 5, md: 6, lg: 10 },
          clipPath: "url(#outerFrameClip)",
          background: theme.palette.primary.main,
          overflow: "visible",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "3px",
            clipPath: "url(#outerFrameClip)",
            zIndex: 0,
            background: `
        linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 90%),
        linear-gradient(180deg, rgba(69,197,168,0.9) 0%, rgba(69,197,168,0.55) 30%, rgba(107,143,214,0.65) 65%, rgba(107,143,214,0.95) 100%),
        #000
      `,
          },
        }}
      >
        {/* LEFT CONTENT */}
        <Box
          sx={{
            zIndex: 1,
            alignSelf: "flex-end",
            height: { xs: "255px", sm: "340px", md: "510px", lg: "765px" },
            width: "40%",
            display: "flex",
            alignItems: "center",
            // bgcolor: "#ccc",
            // justifyContent: "center",
          }}
        >
          <Stack spacing={{ xs: 1, md: 2, lg: 3 }}>
            <Typography
              variant="heroSubTitle"
              component="h1"
              color={theme.palette.primary.contrastText}
              fontWeight={typographyTokens.fontWeights.medium}
              sx={{
                fontSize: {
                  xs: typographyTokens.fontSizes["2xl"],
                  sm: typographyTokens.fontSizes["3xl"],
                  md: typographyTokens.fontSizes["4xl"],
                  lg: "3.1875rem",
                },
              }}
            >
              {projectName}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={typographyTokens.fontWeights.regular}
              color={theme.palette.text.secondary}
              lineHeight={{ xs: 1.2, md: 1.4 }}
              sx={{
                fontSize: {
                  xs: typographyTokens.fontSizes["sm"], // Mobile size
                  sm: typographyTokens.fontSizes["md"], // Tablet size
                  md: typographyTokens.fontSizes["xl"],
                  lg: typographyTokens.fontSizes["2xl"],
                },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocationIcon
                width={isSmallScreen ? 16 : 25}
                height={isSmallScreen ? 16 : 25}
              />
              {location}
            </Typography>

            <Box sx={{ width: { md: "200px", lg: "430px" } }}>
              <Box
                component="img"
                src={progressImage}
                alt="Progress"
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 1,
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            zIndex: 1,
            alignSelf: "flex-start",
            height: { xs: "255px", sm: "340px", md: "510px", lg: "765px" },
            width: { xs: "50%", md: "60%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: {
                xs: "30px 50px 30px 20px",
                md: "30px 100px 30px 30px",
                lg: "70px 200px 70px 70px",
              },
              overflow: "hidden",
              height: { xs: "200px", sm: "260px", md: "420px", lg: "660px" },
              width: { xs: "100%", md: "100%" },
            }}
          >
            <Box
              component="img"
              src={image}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProjectCard;
