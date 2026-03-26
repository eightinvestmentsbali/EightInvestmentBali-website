import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { shadowTokens, typographyTokens } from "../../../../theme/MuiTheme";
import HassanBallout from "../../../../assets/HassanBallout.png";
import RamyHachem from "../../../../assets/RamyHachem.png";
import JubinDaniel from "../../../../assets/Edited/Jubin.png";
// import FeraSanti from "../../../../assets/FeraSanti.png";
import FeraSanti from "../../../../assets/Edited/Fera.png";
import EbieSam from "../../../../assets/Edited/Ebie.png";
import Rakesh from "../../../../assets/Edited/Rakesh.png";
import Widia from "../../../../assets/Edited/Widia.png";
import Rani from "../../../../assets/Edited/Rani.png";
import Vito from "../../../../assets/Edited/VitoG.png";
import Demar from "../../../../assets/Edited/Demar.png";
import Agus from "../../../../assets/Edited/Agus.png";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hassan Ballout",
    role: "Co-founder",
    image: HassanBallout,
    bio: "Hassan sets the vision and raises the bar for execution at Eight Investments. A hospitality and real estate operator at heart, he co-founded Limestone Lab in Dubai and led the launch of Social Distrikt, an experience-driven food and entertainment hall. He brings an operator’s mindset to development and management so every asset is designed with intent, built with discipline, and positioned to perform.",
  },
  {
    name: "Ramy Hachem",
    role: "Co-founder",
    image: RamyHachem,
    bio: "Ramy blends finance leadership with brand building. He is the Founder and Managing Director of Rayven and comes from a family of restaurateurs with roots in 1960. He launched his first venture in Dubai in 2011, exited successfully, and went on to advise and grow businesses across the region. At Eight Investments he leads brand, sales, and investor relations, keeping the story, the numbers, and the pipeline aligned.",
  },
  {
    name: "Jubin Daniel",
    role: "Chief Financial Officer",
    image: JubinDaniel,
    bio: "Jubin runs finance at Eight Investments. He builds the models, plans the capital, and keeps runway and cash flow tight from build to operations. He turns numbers into clear go or no go decisions, pressure tests returns, and keeps controls simple so the team can move fast. His background spans corporate finance and venture ops, and he brings a builder’s view to growth and risk.",
  },
  {
    name: "Fera Santi",
    role: "Head of Human Resources",
    image: FeraSanti,
    bio: "Fera Santi leads Eight Investments’ HR function, bringing experience across HR & General Affairs within Bali’s hospitality sector. She supports recruitment, onboarding, employee relations, and compliance, building a people-first culture that scales with the group.",
  },
  {
    name: "Ebie Sam",
    role: "Consulting CTO",
    image: EbieSam,
    bio: "Ebie Sam serves as Consulting CTO for Eight Investments and CTO of Plumfin, the group’s aquatech venture. He drives technology strategy, product development, systems architecture, and data-led execution, enabling scalable operations and platforms across businesses.",
  },
  {
    name: "Rakesh V K",
    role: "Consulting Sales & Marketing Manager",
    image: Rakesh,
    bio: "Rakesh V K serves as Consulting Sales & Marketing Manager for Eight Investments and leads Sales & Marketing for Plumfin. He drives go-to-market strategy, partnerships, lead generation, and client relationships, helping build demand and accelerate growth across the group.",
  },
  {
    name: "Widia Ningsih",
    role: "Accounting Head",
    image: Widia,
    bio: "Widia Ningsih is Accounting Head at Eight Investments, leading bookkeeping, taxation, and day-to-day financial management. She ensures accurate reporting, clean reconciliations, and compliant filings, supporting disciplined controls and reliable financial visibility across the group.",
  },

  {
    name: "Rani Rahmadani",
    role: "Procurement Manager",
    image: Rani,
    bio: "Rani Rahmadani is Procurement Manager at Eight Investments, with a civil engineering and EPC procurement background. She oversees sourcing, tenders, vendor negotiations, and cost control across construction and hospitality projects, securing materials, services, and timelines.",
  },
  {
    name: "Vito Santa Rahmadany",
    role: "Operations Lead",
    image: Vito,
    bio: "Vito Santa Rahmadany is a versatile operations lead at Eight Investments, trusted across functions. He supports daily operations, procurement coordination, and on-ground project management, stepping in wherever needed to keep teams aligned and standards high.",
  },
  {
    name: "Demar Jaya",
    role: "Manager, Little Brew",
    image: Demar,
    bio: "Demar Jaya is Manager of Little Brew, part of the Little Soho hospitality concept under Eight Investments. He leads day-to-day hospitality operations, team performance, service standards, and guest experience, helping deliver consistent quality and a strong brand presence.",
  },
  {
    name: "Agus Puji",
    role: "Office Administrator",
    image: Agus,
    bio: "Agus Puji is the Office Administrator at Eight Investments, keeping the office running smoothly end to end. He manages front desk and guest welcome, coordinates day-to-day logistics, and supports employee comfort, ensuring a well-organized and positive workplace.",
  },
];

const DiamondTeamSection = () => {
  const theme = useTheme();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <Box
      id="our-team"
      sx={{
        bgcolor: theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pb: { xs: 16, md: 32, lg: 50 },
        position: "relative",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: { xs: 0, md: 500, lg: 700 },
              height: { xs: 0, md: 500, lg: 700 },
              border: "1px solid #D1D1D1",
              bgcolor: theme.palette.background.default,
              opacity: 1,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "80%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: { xs: 0, md: 500, lg: 700 },
              height: { xs: 0, md: 500, lg: 700 },
              border: "1px solid #D1D1D1",
              bgcolor: theme.palette.background.default,
              opacity: 1,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              position: "relative",
              zIndex: 2,
              pt: { xs: 4, md: 8 },
              pb: { xs: 8, md: 8 },
            }}
          >
            <Typography
              variant="heroTitle"
              component="h1"
              sx={{
                color: theme.palette.text.primary,
                // fontWeight: typographyTokens.fontWeights.medium,
                mb: 4,
                pb: 4,
                borderBottom: "2px solid #D1D1D1",
              }}
            >
              Meet Our Team
            </Typography>
          </Box>

          {/* Team Members Grid */}
          <Grid
            container
            spacing={{ xs: 4, md: 6, lg: 6 }}
            justifyContent="center"
            alignItems="center"
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {teamMembers.map((member, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 6, lg: 3 }}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  onClick={() => setSelectedMember(member)}
                  sx={{
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { opacity: 1, transform: "scale(1.05)" },
                  }}
                >
                  <TeamMemberCard member={member} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Dialog
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        maxWidth="lg" // Increased to LG for a wider design
        fullWidth
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: 0,
            bgcolor: "#e5e9e4", // Matches the sage/grey background in your screenshots
            p: { xs: 2, md: 8 },
            position: "relative",
            overflow: "hidden", // Hides modal scrollbar
            boxShadow: "none",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.52)",
            backdropFilter: "blur(8px)",
          },
          "& .MuiDialog-container": {
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          },
        }}
      >
        <IconButton
          onClick={() => setSelectedMember(null)}
          sx={{
            position: "absolute",
            right: 24,
            top: 24,
            zIndex: 10,
            color: "#333",
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <DialogContent sx={{ p: 0, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {selectedMember && (
              <motion.div
                key={selectedMember.name}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 2, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Grid container spacing={10} alignItems="center">
                  <Grid
                    size={{ xs: 12, md: 5 }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: { xs: 350, md: 420 },
                        height: { xs: 350, md: 420 },
                      }}
                    >
                      <Box
                        component="img"
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* Right Side: Bio Text */}
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight:
                              typographyTokens.fontWeights["semi-bold"],
                            color: "#1a1a1a",
                            fontSize: { md: "3rem" },
                          }}
                        >
                          {selectedMember.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#666",
                            fontWeight: 400,
                            letterSpacing: 1,
                            mt: 2,
                          }}
                        >
                          {selectedMember.role}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.9,
                          color: "#333",
                          fontSize: "1.15rem",
                          maxWidth: "600px",
                        }}
                      >
                        {selectedMember.bio}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const theme = useTheme();
  return (
    <Stack spacing={5} alignItems="center">
      <Box
        sx={{
          position: "relative",
          width: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280},
          height: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280},
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: { xs: 16, md: 32 },
            transform: "rotate(45deg)",
            overflow: "hidden",
            bgcolor: "#ffffff",
            boxShadow: shadowTokens.large,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              bgcolor: "#fff",
              transform: "rotate(-45deg) scale(1.15) translateY(15%)",
            }}
          />
        </Box>
      </Box>

      {/* Member Info */}
      <Stack spacing={{ xs: 0, md: 3 }} alignItems="center">
        <Typography
          variant="h3"
          sx={{
            fontWeight: typographyTokens.fontWeights["semi-bold"],
            color: theme.palette.text.primary,
            textAlign: "center",
          }}
        >
          {member.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: typographyTokens.fontWeights.regular,
            color: theme.palette.text.primary,
            textAlign: "center",
          }}
        >
          {member.role}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DiamondTeamSection;
