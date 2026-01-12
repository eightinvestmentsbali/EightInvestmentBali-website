import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { useRef, useState } from "react";
import { typographyTokens } from "../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";

/* ---------------- SLIDES DATA ---------------- */

const slides = [
  {
    label: "Curated Location",
    title: "Curated Location",
    description:
      "Our expertise lies in securing the most prestigious and coveted addresses in Bali. Imagine your investment nestled amongst breathtaking landscapes, vibrant culture, and unparalleled exclusivity.",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2340&auto=format&fit=crop",
  },
  {
    label: "Top-notch Quality",
    title: "Top-notch Quality",
    description:
      "We focus on premium construction quality and refined architectural execution.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    label: "Timeless Investment",
    title: "Timeless Investment",
    description:
      "Designed for long-term appreciation and strong rental returns.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop",
  },
  {
    label: "Timeless Investment",
    title: "Timeless Investment",
    description:
      "Designed for long-term appreciation and strong rental returns.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function CuratedSwiper() {
  const theme = useTheme();
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box sx={{ mt: 12 }}>
      <Box sx={{ position: "relative", mx: "auto" }}>
        <Box sx={bgCard(50, theme.palette.background.paper)} />
        <Box sx={bgCard(25, theme.palette.background.paper)} />
        {/* stacked background cards */}

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          loop={true}
          style={{ overflow: "hidden" }}
          grabCursor
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
          spaceBetween={40}
        >
          {slides.map((item, i) => (
            <SwiperSlide key={i}>
              <Box sx={mainCard}>
                {/* LEFT CONTENT */}
                <Box sx={rightGradient} />
                <Box sx={innerMainCard}>
                  <Box sx={contentWrapper}>
                    <Typography
                      variant="h3"
                      fontWeight={typographyTokens.fontWeights.medium}
                      mb={2}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{ maxWidth: "80%" }}
                      fontWeight={typographyTokens.fontWeights.regular}
                      lineHeight={1.8}
                    >
                      {item.description}
                    </Typography>

                    {/* dots + arrows */}
                  </Box>
                  {/* RIGHT IMAGE */}
                  <Box sx={imageWrapper}>
                    <Box component="img" src={item.image} sx={image} />
                  </Box>
                </Box>
                <Box sx={dotsAndArrowWrapper}>
                  {/* dots */}
                  <Box sx={dotsWrapper}>
                    {slides.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => swiperRef.current.slideTo(index)}
                        sx={{
                          ...dot,
                          ...(activeIndex === index && activeDot),
                        }}
                      />
                    ))}
                  </Box>

                  {/* arrows */}
                  <Box sx={arrowWrapper}>
                    <Arrow onClick={() => swiperRef.current.slideNext()}>
                      ‹
                    </Arrow>
                    <Arrow onClick={() => swiperRef.current.slidePrev()}>
                      ›
                    </Arrow>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* THUMBNAILS */}
      <Box sx={thumbWrapper}>
        {slides.map((s, i) => (
          <Box
            key={i}
            onClick={() => swiperRef.current.slideTo(i)}
            sx={{
              ...thumb,
              borderColor: activeIndex === i ? "#4b6b2f" : "transparent",
              // opacity: activeIndex === i ? 1 : 0.4,
            }}
          >
            <Box component="img" src={s.image} sx={thumbImg} />
            <Typography variant="h6" color={activeIndex === i ? theme.palette.text.primary : theme.palette.text.disabled}>{s.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ---------------- STYLES ---------------- */

const bgCard = (offset: number, color: string) => ({
  position: "absolute",

  top: 0,
  bottom: 0,
  left: -offset, // 👈 stack to the LEFT
  right: 0,

  bgcolor: color,
  borderRadius: 10,
  zIndex: 0,
  border: "2px solid #d8d8d8ff",
});

const mainCard = {
  position: "relative",
  zIndex: 2,
  gap: 4,
  bgcolor: "#fff",
  borderRadius: 10,
  p: { xs: 3, md: 6 },
  boxShadow: "0px 20px 40px rgba(0,0,0,.08)",
  overflow: "hidden",
  border: `2px solid ${"#d8d8d8ff"}`,
};

const rightGradient = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "50%",
  height: "100%",
  zIndex: -1,

  background: `
    linear-gradient(
      90deg,
      rgba(255,255,255,0.95) 0%,
      rgba(255,255,255,0.75) 15%,
      rgba(255,255,255,0.35) 30%,
      rgba(255,255,255,0) 45%
    ),
    linear-gradient(
      180deg,
      rgba(69,197,168,0.9) 0%,
      rgba(69,197,168,0.55) 35%,
      rgba(107,143,214,0.65) 65%,
      rgba(107,143,214,0.95) 100%
    )
  `,

  borderTopRightRadius: 24,
  borderBottomRightRadius: 24,
};

const innerMainCard = {
  display: "flex",
  justifyContent: "space-between",
  // bgcolor: "#ccc"
};

const contentWrapper = {
  // maxWidth: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
const imageWrapper = {
  borderTopLeftRadius: 100,
  borderTopRightRadius: 200,
  borderBottomLeftRadius: 100,
  borderBottomRightRadius: 100,
  overflow: "hidden",
  height: "700px",
  width: "550px",
  flexShrink: 0,
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const dotsAndArrowWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: 4,
};

const dotsWrapper = {
  display: "flex",
  gap: 1.2,
};

const dot = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  border: "1.5px solid #1e300eff",
  backgroundColor: "transparent",
  cursor: "pointer",
  transition: "all .25s ease",
};

const activeDot = {
  backgroundColor: "#4b6b2f",
};

const arrowWrapper = {
  display: "flex",
  gap: 1,
};

const Arrow = ({ children, onClick }: any) => (
  <Box
    onClick={onClick}
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "rgba(177, 191, 241, 0.35)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      border: "1px solid rgba(255, 255, 255, 1)",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.6rem",
      color: "#fefefeff",
      userSelect: "none",
      "&:hover": {
        background: "rgba(202, 226, 251, 0.55)",
      },
    }}
  >
    {children}
  </Box>
);

const thumbWrapper = {
  display: "flex",
  gap: 2,
  mt: 5,
  justifyContent: "center",
  flexWrap: "wrap",
};

const thumb = {
  cursor: "pointer",
  border: "1px solid",
  borderRadius: 2,
  p: 1,
  textAlign: "center",
  width: 300,
  transition: "all .2s ease",
};

const thumbImg = {
  width: "100%",
  height: 150,
  objectFit: "cover",
  borderRadius: 1,
  mb: 1,
};
