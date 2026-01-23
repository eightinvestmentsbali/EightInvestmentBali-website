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
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        py: { xs: 2, md: 5, lg: 10 },
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: typographyTokens.fontWeights.medium,
            }}
          >
            Our Process
          </Typography>

          <Divider sx={{ width: "100%", height: "2px",bgcolor: "#67697C" }} />

          <Typography
            variant="heroSubTitle"
            component="h1"
            sx={{
              color: "#484848",
            }}
          >
            Our thought process is deeply rooted in our core values. These
            values shape every decision we make and guide our approach to
            investment management. Here's how we integrate these principles into
            our strategic and operational processes.
          </Typography>
        </Stack>

        {/* CONTENT */}
        <Grid container spacing={8} mt={{ xs: 2, md: 6, lg: 10 }} alignItems="center">
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
            <Stack spacing={5}>
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
                    variant={step.active ? "heroTitle" : "heroSubTitle"}
                    component="h1"
                    sx={{
                      fontWeight: 500,
                      color: "#2929291C",
                      minWidth: 64,
                    }}
                  >
                    {step.id}
                  </Typography>

                  <Typography
                    variant={step.active ? "heroTitle" : "heroSubTitle"}
                    component="h1"
                    sx={{
                      fontWeight: step.active ? 600 : 500,
                      color: step.active
                        ? theme.palette.text.primary
                        : "#727272",
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
