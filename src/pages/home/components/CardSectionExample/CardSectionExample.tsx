import { Box, Typography } from "@mui/material";

const LeftTopText = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "white",
        color: "black",
        px: 1,
        py: 3,
        fontSize: "12px",
        fontWeight: 600,
        // borderRadius: "4px",
        borderTopLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        borderTopRightRadius: "8px",
      }}
    >
      SOLD OUT IN 3 WEEKS
    </Box>
  );
};

const RightBottomText = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(255,255,255,0.9)",
        px: 1,
        py: 0.5,
        // borderRadius: "4px",
      }}
    >
      <Typography fontSize="13px" fontWeight={600}>
        Lili Village
      </Typography>
    </Box>
  );
};

const CardSectionExample = () => {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            width: 250,
            height: 250,
            position: "relative",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
          alt="card section example"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
  
        {/* overlays */}
        <LeftTopText />
        <RightBottomText />
        </Box>
      </Box>
    );
  };
  

export default CardSectionExample;
