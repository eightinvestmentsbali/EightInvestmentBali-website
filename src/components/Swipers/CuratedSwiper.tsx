import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { typographyTokens } from "../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";

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

export default function CuratedSwiper() {
  const theme = useTheme();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Inside your component
const clipPathData = `
  M 0,0.16 
  V 0.94 
  Q 0,1 0.06,1 
  H 0.94 
  Q 1,1 1,0.94 
  V 0.06 
  Q 1,0 0.94,0 
  H 0.55 
  Q 0.51,0 0.51,0.03 
  V 0.10
  Q 0.51,0.16 0.45,0.16 
  H 0.06 
  Q 0,0.16 0,0.22 
  Z
`;

  return (
    <Box sx={{ mt: { xs: 2, md: 6, lg: 12 } }}>
      <Box sx={{ position: "relative", mx: "auto" }}>
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
                <Typography
                  variant="h1"
                  sx={{
                    position: "absolute",
                    top: "4%",   
                    left: "5%",  // Adjust based on your design
                    maxWidth: "20%", // Keeps text within the tab
                    fontWeight: typographyTokens.fontWeights.medium,
                    lineHeight: 1.2,
                    zIndex: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  {item.title}
                </Typography>
              <Box
                sx={{
                  position: "relative",
                  clipPath: "url(#stairClip)",
                  borderRadius: 10,
                  zIndex: 1,
                  border: `2px solid ${theme.palette.divider}`,
                  bgcolor: "#ccc",
                  minHeight: "650px",
                  p: { xs: 3, md: 6 },
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "0px", // Use 0px to cover the whole card; inset 3px can leave gaps
                    clipPath: "url(#stairClip)",
                    zIndex: -1,
                    background: `
                      linear-gradient(
                        90deg, 
                        rgba(255,255,255,1) 0%, 
                        rgba(255,255,255,1) 40%, 
                        rgba(255,255,255,0) 100%
                      ),
                      linear-gradient(
                        180deg,
                        rgba(69,197,168,0.9) 0%,
                        rgba(69,197,168,0.55) 35%,
                        rgba(107,143,214,0.65) 65%,
                        rgba(107,143,214,0.95) 100%
                      )
                    `,
                  },
                }}
              >
                <svg width="0" height="0" style={{ position: "absolute" }}>
                  <defs>
                    <clipPath id="stairClip" clipPathUnits="objectBoundingBox">
                      <path d={clipPathData} />
                    </clipPath>
                  </defs>
                </svg>
                <Box sx={innerMainCard}>
                  <Box sx={contentWrapper}>
                    <Typography
                      variant="heroSubTitle"
                      fontWeight={typographyTokens.fontWeights.medium}
                      mb={2}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h2"
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
                        onClick={() => swiperRef.current?.slideTo(index)}
                        sx={{
                          ...dot,
                          ...(activeIndex === index && activeDot),
                        }}
                      />
                    ))}
                  </Box>

                  {/* arrows */}
                  <Box sx={arrowWrapper}>
                    <Arrow onClick={() => swiperRef.current?.slideNext()}>
                      ‹
                    </Arrow>
                    <Arrow onClick={() => swiperRef.current?.slidePrev()}>
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
            onClick={() => swiperRef.current?.slideTo(i)}
            sx={{
              ...thumb,
              borderColor: activeIndex === i ? "#4b6b2f" : "transparent",
              opacity: activeIndex === i ? 1 : 0.4,
            }}
          >
            <Box component="img" src={s.image} sx={thumbImg} />
            <Typography
              variant="h6"
              color={
                activeIndex === i
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled
              }
            >
              {s.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const innerMainCard = {
  display: "flex",
  justifyContent: "space-between",
};

const contentWrapper = {
  height: { xs: "200px", md: "365px", lg: "500px" },
  alignSelf: "flex-end",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "48%",
  pl: { xs: 3, md: 6 },
  // bgcolor:"#ccc"
};
const imageWrapper = {
  borderTopLeftRadius: 100,
  borderTopRightRadius: 200,
  borderBottomLeftRadius: 100,
  borderBottomRightRadius: 100,
  overflow: "hidden",
  height: "700px",
  width: "600px",
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

interface ArrowProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Arrow = ({ children, onClick }: ArrowProps) => (
  <Box
    onClick={onClick}
    sx={{
      width: 50,
      height: 50,
      borderRadius: "50%",
      background: "rgba(177, 191, 241, 0.35)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      border: "1px solid rgba(255, 255, 255, 1)",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "2.6rem",
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
