import { Box, Typography, Container, Grid, Stack } from "@mui/material";

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
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        pt: { xs: 8, md: 16 },
        pb: { xs: 16, md: 32 },
        position: "relative",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <Box sx={{ position: "relative", minHeight: { xs: 500, md: 660 } }}>
          {/* Background Diamond */}
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: { xs: 0, md: 700 },
              height: { xs: 0, md: 700 },
              border: "1px solid #D1D1D1",
              bgcolor: "#F4F4F4",
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
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: { xs: "3rem", md: "102px" },
                lineHeight: { xs: "3.5rem", md: "117px" },
                letterSpacing: "-0.01em",
                color: "#000000",
                mb: 2,
                pb: 1,
                borderBottom: "1px solid #67697C",
              }}
            >
              Meet Our Team
            </Typography>
          </Box>

          {/* Team Members Grid */}
          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            justifyContent="center"
            alignItems="center"
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: "1200px",
              mx: "auto",
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
  return (
    <Stack spacing={2} alignItems="center">
      {/* Diamond Container */}
      <Box
        sx={{
          position: "relative",
          width: { xs: 200, md: 256 },
          height: { xs: 200, md: 256 },
          flexShrink: 0,
        }}
      >
        {/* Background Diamond */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "#e5e7eb",
            opacity: 0.2,
            transform: "rotate(45deg)",
          }}
        />

        {/* Diamond Frame */}
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
      <Stack spacing={0.5} alignItems="center">
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "47px",
            letterSpacing: "0%",
            color: "#000000",
            textAlign: "center",
          }}
        >
          {member.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "26px",
            letterSpacing: "0%",
            color: "#3D3D3D",
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

