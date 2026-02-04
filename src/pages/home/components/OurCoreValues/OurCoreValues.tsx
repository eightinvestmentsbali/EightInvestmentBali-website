import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../../../theme/MuiTheme";
import UniqueIcon from "../../../../assets/DesignElement/UniqueIcon";
import ExclusiveIcon from "../../../../assets/DesignElement/ExclusiveIcon";
import ForwardThinkerIcon from "../../../../assets/DesignElement/ForwardThinkerIcon";
import ReliableIcon from "../../../../assets/DesignElement/ReliableIcon";

const values = [
  {
    title: "Unique",
    desc: "Identify only high-quality investment opportunities through rigorous analysis and a deep understanding of Bali market.",
    icon: <UniqueIcon />,
  },
  {
    title: "Exclusive",
    desc: "Connecting investors only to the most promising opportunities and offering unique access for a select group of investors.",
    icon: <ExclusiveIcon />,
  },
  {
    title: "Forward Thinker",
    desc: "We go beyond short-term gains and emphasize client commitment to fostering sustainable and impactful investments.",
    icon: <ForwardThinkerIcon />,
  },
  {
    title: "Reliable",
    desc: "Forge a path to success by investing in ventures that mirror clients ambitions and ensuring transparency and ethical conduct in every interaction.",
    icon: <ReliableIcon />,
  },
];

const OurCoreValues: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        pt: { xs: 2, md: 5, lg: 10 },
        pb: { xs: 8, md: 16 },
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 2, md: 4, lg: 6 }} mb={{ xs: 3, md: 6 }}>
          <Typography
            variant="heroTitle"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: typographyTokens.fontWeights.medium,
            }}
          >
            Our Core Values
          </Typography>
          <Divider sx={{ width: "100%", height: "2px", bgcolor: "#67697C" }} />
          <Typography
            variant="heroSubTitle"
            component="h1"
            sx={{
              color: "#484848",
            }}
          >
            Our core values shape every project we undertake. They drive our
            commitment to excellence and innovation in the hospitality and
            leisure industry.
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {values.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
              <Stack spacing={2}>
                {/* ICON */}
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: typographyTokens.fontWeights["semi-bold"],
                    color: theme.palette.text.primary,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: typographyTokens.fontWeights.regular,
                    maxWidth: { xs: "100%", md: "90%", lg: "80%" },
                    color: theme.palette.text.primary,
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurCoreValues;
