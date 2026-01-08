import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { typographyTokens } from "../../../../theme/MuiTheme";

const WhyDoInvestorschoose: React.FC = () => {
  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ mt: { xs: 8, md: 16 } }}>
        <Typography
          sx={{
            fontWeight: typographyTokens.fontWeights.medium,
            fontSize: { xs: "2.5rem", md: "5rem", lg: "6.5rem" },
            lineHeight: 1.1,
            color: "#000",
            mb: { xs: 6, md: 10 },
            letterSpacing: "-0.02em",
          }}
        >
          Why do investors choose Eight Investments Bali
        </Typography>

        <Divider
          sx={{
            height: "2px",
            backgroundColor: "#cfd8dc",
            my: 2,
          }}
        />
        <Box sx={{ mt: { xs: 8, md: 16 } }}>
          <Box
            sx={{
              position: "relative",
              maxWidth: 1200,
              mx: "auto",
              px: { xs: 2, md: 0 },
            }}
          >
            {/* Background stacked cards */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                width: "100%",
                height: "100%",
                bgcolor: "#f5f7f9",
                borderRadius: 6,
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 32,
                left: 32,
                width: "100%",
                height: "100%",
                bgcolor: "#eef1f4",
                borderRadius: 6,
                zIndex: 0,
              }}
            />

            {/* Main Card */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 4,
                bgcolor: "#fff",
                borderRadius: 6,
                p: { xs: 3, md: 6 },
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Left Content */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Curated Location
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "text.secondary",
                    lineHeight: 1.8,
                    maxWidth: 420,
                  }}
                >
                  Our expertise lies in securing the most prestigious and
                  coveted addresses in Bali. Imagine your investment nestled
                  amongst breathtaking landscapes, vibrant culture, and
                  unparalleled exclusivity.
                </Typography>

                {/* Pagination dots */}
                <Box sx={{ display: "flex", gap: 1.2, mt: 4 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: i === 0 ? "#4b6b2f" : "#cfd8dc",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Right Image Section */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "32px",
                  overflow: "hidden",
                }}
              >
                {/* Gradient overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(72,187,120,0.6), rgba(99,102,241,0.6))",
                    zIndex: 1,
                  }}
                />

                <Box
                  component="img"
                  src="/mnt/data/c9979122-b2b8-4b7b-9c28-9db55d3f3037.png"
                  alt="Curated Location"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Arrows */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    display: "flex",
                    gap: 1,
                    zIndex: 2,
                  }}
                >
                  {["‹", "›"].map((arrow) => (
                    <Box
                      key={arrow}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                    >
                      {arrow}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default WhyDoInvestorschoose;
