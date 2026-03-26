import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  GlobalStyles,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { projectsData } from "../Data/projectsData";

// ─── Slide data ───────────────────────────────────────────────────────────────
const slides = projectsData.map((project) => {
  const isNew = project.statusBadge.toUpperCase().includes("NEW PROJECT");
  return {
    name: project.name,
    projectLogo: project.projectLogo,
    statusBadge: project.statusBadge,
    location: project.location,
    image: project.image,
    alt: `${project.name} - exterior render`,
    badgeBorder: isNew ? "#9DA8B7" : "#C9A96E",
    badgeBg: isNew ? "rgba(157,168,183,0.18)" : "rgba(201,169,110,0.15)",
    badgeText: isNew ? "#9DA8B7" : "#C9A96E",
  };
});

const INTERVAL = 3000;

// motion() wraps MUI Box so we get both MUI sx and Framer props
const MotionBox = motion(Box);

// ─── Component ───────────────────────────────────────────────────────────────
const HeroCarousel: React.FC = () => {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("md"));

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch / swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const slide = slides[current];

  // Shared arrow styles
  const arrowSx = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: { xs: 40, md: 52 },
    height: { xs: 40, md: 52 },
    border: "1px solid rgba(255,255,255,0.22)",
    bgcolor: "rgba(0,0,0,0.22)",
    backdropFilter: "blur(8px)",
    color: "rgba(255,255,255,0.8)",
    transition: "all 0.25s ease",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.12)",
      borderColor: "rgba(255,255,255,0.55)",
      color: "#fff",
      transform: "translateY(-50%) scale(1.07)",
    },
  };

  return (
    <>
      {/* Google Fonts + keyframe */}
      <GlobalStyles
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(7px); }
          }
        `}
      />

      <Box
        component="section"
        aria-label="Featured projects carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "34vh", sm: "44vh", md: "56vh", lg: "80vh", xl: "80vh" },
          overflow: "hidden",
          bgcolor: "#0a0a0a",
          userSelect: "none",
          borderRadius: { xs: 6, md: 6, lg: 8, xl: 10 },
        }}
      >
        {/* ── Slides ── */}
        <AnimatePresence initial={false} mode="sync">
          <MotionBox
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            sx={{ position: "absolute", inset: 0 }}
            role="img"
            aria-label={slide.alt}
          >
            <Box
              key={`image-${current}`}
              src={slide.image}
              alt={slide.alt}
              loading={current === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={current === 0 ? "high" : "auto"}
              initial={{
                scale: 1.08,
                x: current % 2 === 0 ? "-2%" : "2%",
              }}
              animate={{
                scale: 1,
                x: "0%",
              }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              component={motion.img}
              sizes="100vw"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* Bottom gradient */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.30) 15%, rgba(0,0,0,0.08) 20%)",
              }}
            />
            {/* Left vignette */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.28) 0%, transparent 20%)",
              }}
            />
          </MotionBox>
        </AnimatePresence>

        {/* ── Slide counter (top-right) ── */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 14, md: 32 },
            right: { xs: 14, md: 48 },
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1.5,
            zIndex: 10,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "0.8rem", md: "0.85rem" },
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.12em",
            }}
          >
            {String(current + 1).padStart(2, "0")}
          </Typography>

          {/* Animated progress line */}
          <Box
            sx={{
              width: { xs: 36, md: 52 },
              height: "1px",
              bgcolor: "rgba(255,255,255,0.22)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <MotionBox
              key={`prog-${current}`}
              initial={{ width: "0%" }}
              animate={{ width: paused ? "0%" : "100%" }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                bgcolor: "rgba(255,255,255,0.85)",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "0.8rem", md: "0.85rem" },
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.12em",
            }}
          >
            {String(slides.length).padStart(2, "0")}
          </Typography>
        </Box>

        {/* ── Pause indicator (top-left) ── */}
        <AnimatePresence>
          {paused && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              sx={{
                position: "absolute",
                top: { xs: 20, md: 32 },
                left: { xs: 20, md: 48 },
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.25)",
                  bgcolor: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                }}
              >
                {[0, 1].map((k) => (
                  <Box
                    key={k}
                    sx={{
                      width: 3,
                      height: 10,
                      bgcolor: "rgba(255,255,255,0.6)",
                      borderRadius: "1px",
                    }}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.14em",
                }}
              >
                PAUSED
              </Typography>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* ── Text overlay (bottom-left) ── */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 40, sm: 80, md: 88, lg: 110 },
            left: { xs: 16, sm: 24, md: 32, lg: 64 },
            right: { xs: 16, sm: 24, md: 32, lg: "38%" },
            zIndex: 10,
          }}
        >
          <AnimatePresence mode="wait">
            <MotionBox
              key={`text-${current}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.12,
              }}
            >
              {/* Status badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: `1px solid ${slide.badgeBorder}`,
                  bgcolor: slide.badgeBg,
                  borderRadius: "2px",
                  px: { xs: 1, md: 1.5 },
                  py: { xs: 0.35, md: 0.5 },
                  mb: { xs: 1, md: 2 },
                  backdropFilter: "blur(8px)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: { xs: "0.5rem", md: "0.6rem" },
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    color: slide.badgeText,
                    lineHeight: 1,
                  }}
                >
                  {slide.statusBadge}
                </Typography>
              </Box>

              {/* Project name */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
                  mb: { xs: 0.5, md: 1 },
                }}
              >
                {slide.projectLogo && (
                  <Box
                    component="img"
                    src={slide.projectLogo}
                    alt={slide.name}
                    sx={{
                      width: {
                        xs: "26px",
                        sm: "34px",
                        md: "44px",
                        lg: "64px",
                      },
                      height: {
                        xs: "26px",
                        sm: "34px",
                        md: "44px",
                        lg: "64px",
                      },
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                )}
                <Typography
                  component="h2"
                  sx={{
                    fontSize: {
                      xs: "1.9rem",
                      sm: "2.2rem",
                      md: "2.8rem",
                      lg: "4.5rem",
                    },
                    fontWeight: 300,
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}
                >
                  {slide.name}
                </Typography>
              </Box>

              {/* Location */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <LocationOnOutlinedIcon
                  sx={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.5)",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: { xs: "0.68rem", md: "0.82rem" },
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {slide.location}
                </Typography>
              </Box>
            </MotionBox>
          </AnimatePresence>
        </Box>

        {/* ── Arrow navigation ── */}
        {!isCompact && (
          <>
            <IconButton
              aria-label="Previous project"
              onClick={prev}
              sx={{ ...arrowSx, left: { sm: 16, md: 28 } }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label="Next project"
              onClick={next}
              sx={{ ...arrowSx, right: { sm: 16, md: 28 } }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}

        {/* ── Thumbnail pagination (bottom) ── */}
        <Box
          role="tablist"
          aria-label="Carousel navigation"
          sx={{
            position: "absolute",
            bottom: { xs: 14, md: 28 },
            left: { xs: 16, sm: 24, md: 32, lg: 64 },
            display: "flex",
            alignItems: "flex-end",
            gap: { xs: 1.5, md: 2 },
            zIndex: 10,
          }}
        >
          {slides.map((s, i) => (
            <Box
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${s.name}`}
              tabIndex={0}
              onClick={() => go(i)}
              onKeyDown={(e) => e.key === "Enter" && go(i)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.75,
                opacity: i === current ? 1 : 0.42,
                transform: i === current ? "scale(1)" : "scale(0.94)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                cursor: "pointer",
                "&:hover": { opacity: 0.85 },
                "&:focus-visible": {
                  outline: "2px solid rgba(255,255,255,0.6)",
                  outlineOffset: 3,
                  borderRadius: 1,
                },
              }}
            >
              {/* Thumbnail */}
              {!isCompact && (
                <Box
                  sx={{
                    width: { sm: 56, md: 68 },
                    height: { sm: 38, md: 46 },
                    borderRadius: "3px",
                    overflow: "hidden",
                    border:
                      i === current
                        ? "1.5px solid rgba(255,255,255,0.7)"
                        : "1.5px solid rgba(255,255,255,0.18)",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <Box
                    component="img"
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 600px) 56px, 68px"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              {/* Project name label */}
              {!isCompact && (
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    color:
                      i === current
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(255,255,255,0.45)",
                    letterSpacing: "0.08em",
                    textAlign: "center",
                    transition: "color 0.3s",
                    maxWidth: 72,
                    lineHeight: 1.2,
                  }}
                >
                  {s.name}
                </Typography>
              )}

              {/* Active dot bar */}
              <Box
                sx={{
                  width: i === current ? { xs: 22, md: 28 } : 6,
                  height: { xs: 4, md: 3 },
                  borderRadius: "2px",
                  bgcolor:
                    i === current ? "#fff" : "rgba(255,255,255,0.38)",
                  transition:
                    "width 0.35s ease, background-color 0.3s ease",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* ── Scroll hint (bottom-right, desktop only) ── */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          sx={{
            position: "absolute",
            bottom: { xs: 32, md: 44 },
            right: { xs: 24, md: 56 },
            zIndex: 10,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.58rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.22em",
              writingMode: "vertical-rl",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </Typography>
          <Box
            sx={{
              width: "3%",
              height: 36,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.38), transparent)",
              animation: "scrollBounce 1.6s ease-in-out infinite",
            }}
          />
        </MotionBox>
      </Box>
    </>
  );
};

export default HeroCarousel;
