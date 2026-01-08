import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Curated Location",
    description:
      "Our expertise lies in securing the most prestigious and coveted addresses in Bali. Imagine your investment nestled amongst breathtaking landscapes, vibrant culture, and unparalleled exclusivity.",
    image: "/mnt/data/c9979122-b2b8-4b7b-9c28-9db55d3f3037.png",
  },
  {
    title: "Premium Design",
    description:
      "Architectural excellence blended with luxury living for timeless value.",
    image: "/mnt/data/c9979122-b2b8-4b7b-9c28-9db55d3f3037.png",
  },
];

export default function CuratedSwiper() {
  return (
    <Box sx={{ mt: { xs: 8, md: 16 } }}>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        mousewheel={{ forceToAxis: true }}
        grabCursor
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 1200,
                mx: "auto",
                bgcolor: "#fff",
                borderRadius: 6,
                p: { xs: 3, md: 6 },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 4,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Left Content */}
              <Box>
                <Typography sx={{ fontSize: "2rem", fontWeight: 600, mb: 2 }}>
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "text.secondary",
                    lineHeight: 1.8,
                    maxWidth: 420,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>

              {/* Image */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "32px",
                  overflow: "hidden",
                }}
              >
                {/* Gradient */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(72,187,120,0.5), rgba(99,102,241,0.5))",
                    zIndex: 1,
                  }}
                />

                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
