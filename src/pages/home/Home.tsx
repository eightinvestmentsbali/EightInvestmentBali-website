import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
// import { useTheme } from "@mui/material/styles";
import ArchitectingProsperity from "./components/ArchitectingProsperity/ArchitectingProsperity";
import UnifyYourVision from "./components/UnifyYourVision/UnifyYourVision";
import WhyDoInvestorschoose from "./components/WhyDoInvestorschoose/WhyDoInvestorschoose";
import BackgroundParticles from "../../components/background/BackgroundParticles";
import MuiGradientBackground from "../../components/background/MuiGradientBackground";
import AnimatedGradientBlob from "../../components/background/AnimatedGradientBlob";

const Home: React.FC = () => {
  // const theme = useTheme();
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: `
      linear-gradient(
        135deg,
        #f0f8ff 0%,
        #e6f7f2 35%,
        #d6eef7 65%,
        #ffffff 100%
      )
    `,
      }}
    >
      {/* <MuiGradientBackground /> */}
      {/* <BackgroundParticles /> */}
        <AnimatedGradientBlob />


      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Container maxWidth="xl">
          <Navbar />
          <Grid container justifyContent="center" alignItems="center">
            <ArchitectingProsperity />
            <UnifyYourVision />
            <WhyDoInvestorschoose />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
