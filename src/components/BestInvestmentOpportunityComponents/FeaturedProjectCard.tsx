import { Box, Stack, Typography } from "@mui/material";
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

const FeaturedProjectCard = ({ projectName, location, image, progressImage, onSeeMoreClick }: FeaturedProjectCardProps) => {
  const theme = useTheme();

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
          top: "6.5%",
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
            // Responsive Font Size
            fontSize: {
              xs: typographyTokens.fontSizes["xs"], // Mobile size
              sm: typographyTokens.fontSizes["5xl"], // Tablet size
            },
            // Optional: Adjust alignment or margin for mobile
            textAlign: { xs: 'left', md: 'left' },
          }}
        >
          SOLD OUT IN <br /> 3 WEEKS
        </Typography>
      </Box>

      <Box
        onClick={onSeeMoreClick}
        sx={{
          position: "absolute",
          bottom: "4.5%",
          right: "5%",
          zIndex: 20,
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 2,
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
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          See more
        </Typography>
        <ArrowNortEastIcon />
      </Box>

      {/* Main Container with Curve Clip */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: { xs: "300px", md: "600px", lg: "900px" },
          px: { xs: 4, md: 10 },
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
            height: { xs: "300px", md: "465px", lg: "765px" },
            width: "40%",
            display: "flex",
            alignItems: "center",
            // bgcolor: "#ccc",
            // justifyContent: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="heroSubTitle"
              component="h1"
              color={theme.palette.primary.contrastText}
              fontWeight={typographyTokens.fontWeights.medium}
            >
              {projectName}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={typographyTokens.fontWeights.regular}
              color={theme.palette.text.secondary}
            >
              <LocationIcon /> {location}
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
            height: { xs: "300px", md: "465px", lg: "765px" },
            width: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // bgcolor: "#ccc",
          }}
        >
          <Box
            sx={{
              position: "relative",
              // borderRadius: "70px 200px 70px 70px",
              overflow: "hidden",
              height: { xs: "150px", md: "420px", lg: "660px" },
              width: { xs: "400px", md: "100%" },
            }}
          >
            <Box
              component="img"
              src={image}
              sx={{
                width: "110%",
                height: "100%",
                left: "20%",
                top:0,
                position: "absolute",
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
