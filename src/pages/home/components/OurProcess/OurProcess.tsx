import React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { useTheme } from "@mui/material/styles";

const steps = [
  {
    id: "01",
    title: "Analysis",
    active: true,
    description:
      "We prioritize identifying only high-quality investment opportunities. Our team conducts thorough and meticulous research, leveraging our deep understanding of the Bali market. This involves comprehensive market analysis, financial due diligence, and risk assessment to ensure that each investment meets our stringent criteria.",
  },
  { id: "02", title: "Strategy" },
  { id: "03", title: "Execution" },
  { id: "04", title: "Monitoring & Management" },
];

const OurProcess: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: "#F6F8FA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        {/* HEADER */}
        <Stack spacing={3}>
          <Typography
            sx={{
              fontWeight: typographyTokens.fontWeights.medium,
              fontSize: { xs: "1.5rem", md: "3rem", lg: "4.5rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Our Process
          </Typography>

          <Divider sx={{ width: "100%", bgcolor: "#BFC5CC" }} />

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "3rem" },
              color: theme.palette.text.secondary,
              mb: { xs: 3, md: 6 },
              lineHeight: 1.6,
            }}
          >
            Our thought process is deeply rooted in our core values. These
            values shape every decision we make and guide our approach to
            investment management. Here's how we integrate these principles into
            our strategic and operational processes.
          </Typography>
        </Stack>

        {/* CONTENT */}
        <Grid container spacing={8} mt={6} alignItems="center">
          {/* LEFT CARD */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 520,
              }}
            >
              {/* STACKED BACK CARDS */}
              <Box
                sx={{
                  position: "absolute",
                  top: 48, // push down
                  left: -45,
                  width: "100%",
                  height: "86%", // shorter height
                  bgcolor: "#f3a971",
                  borderRadius: "0px 120px 0px 0px",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 24, // push down
                  left: -30,
                  width: "100%",
                  height: "92%", // shorter height
                  bgcolor: "#9DBAD0",
                  borderRadius: "0px 120px 0px 0px",
                  zIndex: 0,
                }}
              />

              {/* BACK CARD 1 */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: -15,
                  width: "100%",
                  height: "96%",
                  bgcolor: "#5C8FB5",
                  borderRadius: "0px 120px 0px 0px",
                  zIndex: 1,
                }}
              />

              {/* MAIN CARD */}
              <Box
                sx={{
                  position: "relative",
                  bgcolor: "#278C73",
                  color: "#fff",
                  borderRadius: "0px 120px 0px 0px",
                  px: 6,
                  py: 7,
                  zIndex: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.9rem",
                    fontWeight: typographyTokens.fontWeights.medium,
                    mb: 2,
                  }}
                >
                  Analysis
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    lineHeight: 1.7,
                    opacity: 0.95,
                  }}
                >
                  {steps[0].description}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT STEPS */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              {steps.map((step) => (
                <Stack
                  key={step.id}
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  sx={{
                    opacity: step.active ? 1 : 0.35,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: step.active ? "10rem" : "5rem",
                      fontWeight: 500,
                      color: "#DADDE1",
                      minWidth: 64,
                    }}
                  >
                    {step.id}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: step.active ? "7rem" : "4rem",
                      fontWeight: step.active ? 600 : 500,
                      color: step.active
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                    }}
                  >
                    {step.title}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurProcess;
