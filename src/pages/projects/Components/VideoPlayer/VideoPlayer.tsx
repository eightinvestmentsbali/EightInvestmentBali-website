import React, { useRef, useState } from "react";
import { Box, Typography, IconButton, Tooltip, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

interface Props {
  data: any;
}
const VideoPlayer: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for autoplay
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  React.useEffect(() => {
    setIsVideoLoading(true);
    setIsPlaying(false);
  }, [data?.video]);

  // Attempt to autoplay muted on mount (browsers require muted autoplay)
  React.useEffect(() => {
    if (!shouldLoadVideo) return;
    const v = videoRef.current;
    if (!v) return;

    const tryAutoplay = async () => {
      try {
        v.muted = true; // ensure muted so browsers allow autoplay
        v.loop = true; // optional: keep it looping
        v.playsInline = true;
        await v.play();

        setIsPlaying(true);
      } catch (err) {
        // Autoplay was blocked by the browser. Keep controls to allow manual play.
        setIsPlaying(false);
      }
    };

    tryAutoplay();
  }, [shouldLoadVideo, data?.video]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Unmute on user interaction if they manually play
        videoRef.current.muted = false;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the video from pausing when clicking mute
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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
    <Box
      sx={{
        position: "relative",
        width: "100%",
        mt: { xs: 2 },
        mb: { xs: 4, md: 6, lg: 8 },
      }}
    >
      {/* SVG Definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="videoClip" clipPathUnits="objectBoundingBox">
            <path d={clipPathData} />
          </clipPath>
        </defs>
      </svg>

      <Box ref={containerRef} sx={{ position: "relative", overflow: "visible" }}>
        {/* Video Container */}
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16/8",
            clipPath: "url(#videoClip)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={shouldLoadVideo ? data.video : undefined}
            onClick={togglePlay}
            onLoadedData={() => setIsVideoLoading(false)}
            onPlaying={() => setIsVideoLoading(false)}
            onWaiting={() => setIsVideoLoading(true)}
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
          />

          {(isVideoLoading || !shouldLoadVideo) && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0, 0, 0, 0.25)",
                zIndex: 5,
              }}
            >
              <CircularProgress
                size={48}
                thickness={4}
                sx={{ color: theme.palette.primary.contrastText }}
              />
            </Box>
          )}

          <Tooltip title={isMuted ? "Unmute" : "Mute"}>
            <IconButton
              onClick={toggleMute}
              sx={{
                position: "absolute",
                bottom: { xs: "3%", md: "5%" }, // Adjusted to stay above your stepped label
                right: { xs: "2%", md: "3%" },
                bgcolor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
                "&:active": {
                  outline: "none",
                },
                // Removes the gray/black highlight on mobile devices
                WebkitTapHighlightColor: "transparent",

                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.4)",
                  outline: "none",
                },
                zIndex: 20,
              }}
            >
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Tooltip>

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
            left: { xs: 2, sm: 3, md: 5, lg: 10 },
            pb: { xs: 0 },
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: 0.5, sm: 1, md: 1.25 },
          }}
        >
          {data?.projectLogo && (
            <Box
              component="img"
              src={data.projectLogo}
              alt={data.name}
              sx={{
                width: "clamp(30px, 8vw, 88px)",
                height: "clamp(30px, 8vw, 88px)",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          )}
          <Typography
            component="h1"
            sx={{
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: typographyTokens.fontWeights["semi-bold"],
              lineHeight: 1,
              color: theme.palette.text.primary,
              fontFamily: "inherit",
              // maxWidth: "80%",
            }}
          >
            {data.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
