import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { shadowTokens, typographyTokens } from "../../../../theme/MuiTheme";
import HassanBallout from "../../../../assets/HassanBallout.png";
import RamyHachem from "../../../../assets/RamyHachem.png";
import JubinDaniel from "../../../../assets/JubinDaniel.png";
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
];

const DiamondTeamSection = () => {
  const theme = useTheme();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      id="our-team"
      sx={{
        bgcolor: theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 8, md: 16 },
        pb: { xs: 16, md: 32, lg: 50 },
        position: "relative",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "70%",
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
                fontWeight: typographyTokens.fontWeights.medium,
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
            spacing={{ xs: 2, md: 4, lg: 6 }}
            justifyContent="center"
            alignItems="center"
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {teamMembers.map((member, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
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
                            mt: 1,
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
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
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
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: "rotate(-45deg) scale(1.15) translateY(15%)",
            }}
          />
        </Box>
      </Box>

      {/* Member Info */}
      <Stack spacing={1} alignItems="center">
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
