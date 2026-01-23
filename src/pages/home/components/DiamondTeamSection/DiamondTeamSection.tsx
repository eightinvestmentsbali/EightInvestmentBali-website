import { Box, Typography, Container, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../../../theme/MuiTheme";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hassan Ballout",
    role: "At Eight Investments",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Hassan Ballout",
    role: "At Eight Investments",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    name: "Hassan Ballout",
    role: "At Eight Investments",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
];

const DiamondTeamSection = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 8, md: 16 },
        pb: { xs: 16, md: 32, lg: 50},
        position: "relative",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <Box sx={{ position: "relative"}}>
          <Box
            sx={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: { xs: 0, md: 500, lg: 700},
              height: { xs: 0, md: 500, lg: 700},
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
            spacing={{ xs: 2, md: 4, lg: 6}}
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
                <TeamMemberCard member={member} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
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
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Image inside diamond */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              transform: "rotate(-45deg) scale(1.5)",
            }}
          >
            <Box
              component="img"
              src={member.image}
              alt={member.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
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
