import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { typographyTokens } from "../../../../theme/MuiTheme";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Define your card data with images
const investmentReasons = [
  {
    id: 1,
    title: "High Returns",
    tags: ["ROI Focused", "Growth Strategy", "Market Analysis"],
    description:
      "Consistently delivering above-market returns through strategic property selection and development.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Learn More",
  },
  {
    id: 2,
    title: "Prime Locations",
    tags: ["Beachfront", "City Center", "Tourist Hotspots"],
    description:
      "Exclusive access to Bali's most sought-after investment locations with high growth potential.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=90&w=2400&auto=format&fit=crop",
    buttonText: "View Properties",
  },
  {
    id: 3,
    title: "Expert Management",
    tags: ["24/7 Support", "Professional Team", "Maintenance"],
    description:
      "Professional property management ensuring optimal rental yields and property maintenance.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=90&w=2400&auto=format&fit=crop",
    buttonText: "Meet Our Team",
  },
  {
    id: 4,
    title: "Legal Security",
    tags: ["Compliance", "Transparency", "Documentation"],
    description:
      "Full legal compliance and transparent ownership structures for international investors.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=90&w=2400&auto=format&fit=crop",
    buttonText: "Legal Framework",
  },
  {
    id: 5,
    title: "Proven Track Record",
    tags: ["Success Stories", "Client Reviews", "Portfolio"],
    description:
      "Years of successful projects and satisfied investors across Bali's real estate market.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=90&w=2400&auto=format&fit=crop",
    buttonText: "View Success",
  },
];

const WhyDoInvestorschoose: React.FC = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate opacity for the title - fades out as you scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Auto-scroll to next section when cards complete
  const hasScrolledRef = useRef(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.95 && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      setTimeout(() => {
        const targetElement = document.getElementById(
          "best-investment-opportunity",
        );
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  });

  return (
    <Grid size={{ xs: 12 }}>
      <Box
        ref={containerRef}
        sx={{
          // mb: { xs: 3.75, sm: 7.5, md: 13, lg: 15 },
          position: "relative",
          // height: {
          //   xs: `${investmentReasons.length * 90 - 60}vh`,
          //   md: `${100 + investmentReasons.length * 100}vh`,
          // },
          // px: { xs: 2, md: 4, lg: 6 },
          pb: { xs: 2, sm: 4, md: 8, lg: 16 },
        }}
      >
        {/* Title Section - Fades out on scroll */}
        <motion.div
          style={{
            opacity: titleOpacity,
            y: titleY,
            position: "sticky",
            top: "80px", // offset so sticky title sits below the fixed navbar
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px 0px 0px 0px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Box sx={{ mb: { xs: 4, md: 10 } }}>
            <Typography
              variant="heroTitle"
              component="h1"
              sx={{
                color: theme.palette.text.primary,
                mb: { xs: 4, md: 6 },
              }}
            >
              Why do investors choose <br /> Eight Investments Bali
            </Typography>

            <Divider
              sx={{
                height: "2px",
                backgroundColor: theme.palette.divider,
                my: 2,
              }}
            />
          </Box>
        </motion.div>

        {/* Cards Section - Stacked and revealed on scroll */}
        {investmentReasons.map((reason, index) => {
          const isLast = index === investmentReasons.length - 1;

          // Calculate scroll progress for each card
          const cardStart = 0.15 + (index * 0.75) / investmentReasons.length;
          const cardEnd =
            0.15 + ((index + 1) * 0.75) / investmentReasons.length;

          // Scale down the card behind as new card comes up
          const scale = useTransform(
            scrollYProgress,
            [cardStart, cardEnd],
            [1, isLast ? 1 : 0.9],
          );

          // Fade out the card behind
          const opacity = useTransform(
            scrollYProgress,
            [cardStart, cardEnd - 0.02],
            [1, 1],
          );

          // Move the current card UP from below as you scroll
          const y = useTransform(
            scrollYProgress,
            [cardStart - 0.5, cardStart, cardEnd],
            [100, 0, 0], // Starts from 100px below, moves to 0, stays at 0
          );

          return (
            <motion.div
              key={reason.id}
              style={{
                position: "sticky",
                top: "80px",
                scale,
                opacity,
                y,
                zIndex: index + 2, // Higher index = on top
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: { xs: 5, md: 10, lg: 10 },
                  overflow: "hidden",
                  mx: "auto",
                  width: "100%",
                  mb: isLast ? 0 : 20,
                  // Use a clean off-white/paper base
                  bgcolor: theme.palette.background.paper,
                  boxShadow: "0 32px 64px rgba(0, 0, 0, 0.2)",
                  border: `1px solid ${theme.palette.divider}`,
                  // Ensure the card is above the background but its children are above its own pseudo-elements
                  zIndex: 1,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    zIndex: -1, // Changed to -1 so it stays behind the text content
                    pointerEvents: "none",
                    // Modern Mesh Gradient Implementation
                    background: `
                    /* Top Right Emerald Glow */
                    linear-gradient(225deg, rgb(69, 197, 167) 0%, rgba(69, 197, 168, 0) 50%),
                    /* Bottom Right Ocean Blue Glow */
                    linear-gradient(315deg, rgb(36, 97, 241) 0%, rgba(36, 97, 241, 0) 40%),
                    /* Soft Warm Overlay */
                    linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(244, 247, 252, 0) 100%)
                  `,
                  },
                }}
              >
                {/* Content Layout */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: { xs: 4, md: 6, lg: 8 },
                    height: { xs: "400px", md: "60vh", lg: "80vh" },
                    p: { xs: 4, md: 6, lg: 8 },
                    zIndex: 1,
                  }}
                >
                  {/* Left Content */}
                  <Box
                    sx={{
                      // flex: { xs: 1, md: "0 0 45%" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: { xs: 1, md: 2, lg: 3 },
                      zIndex: 1,
                    }}
                  >
                    {/* Title */}
                    <Typography
                      variant="heroSubTitle"
                      component="h2"
                      sx={{
                        fontWeight: typographyTokens.fontWeights.medium,
                        color: theme.palette.text.primary,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {reason.title}
                    </Typography>

                    {/* Tags */}
                    {/* <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 0.5, md: 1, lg: 1.5 },
                      }}
                    >
                      {reason.tags.map((tag, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            px: { xs: 1, md: 2, lg: 2.5 },
                            py: { xs: 0.5, md: 0.8, lg: 1 },
                            borderRadius: 2,
                            bgcolor:
                              theme.palette.mode === "light"
                                ? "rgba(0, 0, 0, 0.04)"
                                : "rgba(255, 255, 255, 0.08)",
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#484848",
                              fontWeight: typographyTokens.fontWeights.regular,
                            }}
                          >
                            {tag}
                          </Typography>
                        </Box>
                      ))}
                    </Box> */}

                    {/* Description */}
                    <Typography
                      variant="h3"
                      sx={{
                        // fontSize: { xs: "0.5rem", md: "1rem", lg: "2rem" },
                        fontWeight: typographyTokens.fontWeights.regular,
                        lineHeight: { xs: 1.2, md: 1.2, lg: 1.5 },
                        color: theme.palette.text.primary,
                        maxWidth: "90%",
                      }}
                    >
                      {reason.description}
                    </Typography>

                    {/* Button */}
                    {/* <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 10,
                          borderColor: theme.palette.text.primary,
                          color: theme.palette.text.primary,
                          fontSize: "1rem",
                          fontWeight: typographyTokens.fontWeights.medium,
                          textTransform: "none",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {reason.buttonText}
                      </Button>
                    </Box> */}
                  </Box>

                  {/* Right Image */}
                  <Box
                    sx={{
                      flex: { xs: 1, md: "0 0 50%" },
                      width: "100%",
                      height: "100%",
                      borderRadius: {
                        xs: "30px 30px 30px 30px",
                        md: "30px 100px 30px 30px",
                        lg: "50px 200px 50px 50px",
                      },
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                      alignSelf: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "#ccc",
                    }}
                  >
                    <Box
                      component="img"
                      src={reason.image}
                      alt={reason.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 50%",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  </Box>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Grid>
  );
};

export default WhyDoInvestorschoose;
