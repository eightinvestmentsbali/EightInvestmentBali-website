import { Box, Button, Stack, Typography } from "@mui/material";

const FeaturedProjectCard = () => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        p: 3,
        background:
          "linear-gradient(135deg, #00FFA3 0%, #0066FF 100%)",
      }}
    >
      {/* INNER CARD */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#0F0F0F",
          borderRadius: 3,
          p: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 2fr" },
          gap: 4,
        }}
      >
        {/* LEFT CONTENT */}
        <Stack spacing={3}>
          <Box
            sx={{
              alignSelf: "flex-start",
              border: "1px solid rgba(255,255,255,.3)",
              borderRadius: 20,
              px: 2,
              py: 0.5,
              fontSize: 12,
              color: "white",
            }}
          >
            SOLD OUT IN 3 WEEKS
          </Box>

          <Box>
            <Typography color="white" variant="h4" fontWeight={500}>
              Lili Village
            </Typography>
            <Typography color="rgba(255,255,255,.6)" fontSize={14}>
              📍 Abianbase–Mengwi, Bali
            </Typography>
          </Box>

          {/* PROGRESS CARD */}
          <Box
            sx={{
              bgcolor: "#EFFFF6",
              borderRadius: 2,
              p: 3,
              maxWidth: 260,
            }}
          >
            <Typography fontSize={12} color="#1A7F5A">
              Current Progress
            </Typography>

            <Typography
              fontSize={32}
              fontWeight={600}
              color="#1A7F5A"
            >
              40%
            </Typography>

            <Typography fontSize={12} color="#1A7F5A">
              75% project completion
            </Typography>
          </Box>
        </Stack>

        {/* RIGHT IMAGE */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1599423300746-b62533397364"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* SEE MORE */}
          <Button
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              color: "white",
              fontSize: 12,
            }}
          >
            See more ↗
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProjectCard;