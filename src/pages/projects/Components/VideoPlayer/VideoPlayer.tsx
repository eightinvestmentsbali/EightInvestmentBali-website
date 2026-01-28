import React, { useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";

const VideoPlayer: React.FC = () => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  /**
   * FIX: The "Two Stairs" Clip Path
   * This path creates the double-step effect and rounds every outer/inner corner.
   */
  const clipPathData =
    // ---- top edge ----
    "M 0.04,0 " +
    "H 0.96 " +
    "Q 1,0 1,0.04 " +
    // ---- right edge ----
    "V 0.96 " +
    "Q 1,1 0.96,1 " +
    // ---- first stair ----
    "H 0.44 " +
    "Q 0.42,1 0.42,0.98 " +
    "V 0.90 " +
    // ---- second stair ----
    "Q 0.42,0.88 0.40,0.88 " +
    "H 0.28 " +
    "Q 0.26,0.88 0.26,0.86 " +
    "V 0.80 " +
    "Q 0.26,0.72 0.24,0.72 " +
    // ---- left edge (FIXED) ----
    "H 0.06 " +
    "Q 0,0.72 0,0.68 " + // 🔥 aligned with stair
    "V 0.04 " +
    "Q 0,0 0.04,0 " +
    "Z";

  return (
    <Box sx={{ position: "relative", width: "100%", mt: { xs: 8, md: 10, lg: 8 }, mb: { xs: 4, md: 6, lg: 8 } }}>
      {/* SVG Definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="videoClip" clipPathUnits="objectBoundingBox">
            <path d={clipPathData} />
          </clipPath>
        </defs>
      </svg>

      <Box sx={{ position: "relative", overflow: "visible",  }}>
        {/* Video Container */}
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16/9",
            clipPath: "url(#videoClip)",
            bgcolor: "#000",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            onClick={togglePlay}
            playsInline
          />

          {!isPlaying && (
            <Box
              sx={{
                position: "absolute",
                width: { xs: 90, md: 110 },
                height: { xs: 90, md: 110 },
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                bgcolor: "#ffffff75",
                borderRadius: "50%",
              }}
            >
              <IconButton
                onClick={togglePlay}
                sx={{
                  position: "absolute",
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  width: { xs: 70, md: 90 },
                  height: { xs: 70, md: 90 },
                  "&:hover": { bgcolor: "#fff" },
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <PlayArrowIcon
                  sx={{ fontSize: { xs: 40, md: 50 }, color: "#000" }}
                />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* The 'Lili Village' Stepped Label */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: { xs: 10, md: 20, lg: 30 },
            pr: 6,
            pb: 2,
            zIndex: 10,
            // Match the staircase rounding
            borderTopRightRadius: "60px",
          }}
        >
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              fontWeight: typographyTokens.fontWeights["semi-bold"],
              lineHeight: 0.85,
              color: theme.palette.text.primary,
              fontFamily: "inherit",
              mt: 0,
              // fontSize: { xs: "2.5rem", md: "6.875rem" },
            }}
          >
            Lili <br /> Village
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
