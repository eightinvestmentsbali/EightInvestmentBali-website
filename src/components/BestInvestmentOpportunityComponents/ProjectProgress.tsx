import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../theme/MuiTheme";

const phases = [
  {
    label: "Phase 1",
    date: "Nov ’24 – Jun ’25",
    progress: 25,
    status: "25% project completion",
  },
  {
    label: "Phase 2",
    date: "Jun – Nov ’25",
    progress: 50,
    status: "50% project completion",
  },
  {
    label: "Phase 3",
    date: "Nov ’25 – Jun ’26",
    progress: 75,
    status: "75% project completion",
  },
  {
    label: "Phase 4",
    date: "May – Oct ’26",
    progress: 100,
    status: "Lili Village project handover",
  },
];

const ProjectProgress = () => {
  const theme = useTheme();
  const [activePhase, setActivePhase] = useState(0);

  const currentPhase = phases[activePhase];

  return (
    <Box
      sx={{
        bgcolor: "#EEF1EA",
        borderRadius: { xs: 2, md: 3, lg: 4 },
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: { xs: 1, md: 2, lg: 3, xl: 4} }}>
        {/* HEADER */}
        <Typography
          variant="h4"
          fontWeight={typographyTokens.fontWeights.regular}
          color={theme.palette.primary.main}
          mb={1}
        >
          Current Progress
        </Typography>

        {/* PERCENTAGE */}
        <Typography
          variant="heroSubTitle"
          component="h1"
          fontWeight={typographyTokens.fontWeights.bold}
          color={theme.palette.primary.main}
          lineHeight={1}
          mb={{ xs: 1, md: 2, lg: 3, xl: 4 }}
        >
          {currentPhase.progress}%
        </Typography>

        {/* TIMELINE */}
        <Box sx={{ position: "relative" }}>
          {/* DOTTED LINE */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: 0,
              right: 0,
              borderTop: `1px dashed ${theme.palette.primary.main}`,
            }}
          />

          {/* PHASES */}
          <Box display="flex" justifyContent="space-between">
            {phases.map((phase, index) => {
              const isActive = index === activePhase;

              return (
                <Box
                  key={phase.label}
                  textAlign="center"
                  sx={{ width: "25%", cursor: "pointer" }}
                  onClick={() => setActivePhase(index)}
                >
                  {/* DIAMOND */}
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      mx: "auto",
                      mb: 1,
                      transform: "rotate(45deg)",
                      bgcolor: isActive
                        ? "#BFC6B8"
                        : theme.palette.primary.main,
                      transition: "all .25s ease",
                    }}
                  />

                  {/* PHASE TEXT */}
                  <Typography
                    variant="body2"
                    fontWeight={typographyTokens.fontWeights["semi-bold"]}
                    color={theme.palette.primary.main}
                  >
                    {phase.label}
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight={typographyTokens.fontWeights.regular}
                    color={theme.palette.primary.main}
                  >
                    {phase.date}
                  </Typography>

                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <Box
                      sx={{
                        mt: 1.2,
                        width: 0,
                        height: 0,
                        mx: "auto",
                        borderLeft: "7px solid transparent",
                        borderRight: "7px solid transparent",
                        borderTop: `8px solid ${theme.palette.primary.main}`,
                        transition: "all .25s ease",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* STATUS CARD */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          py: 3,
          textAlign: "center",
          transition: "all .3s ease",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={typographyTokens.fontWeights.regular}
          color={theme.palette.primary.contrastText}
        >
          {currentPhase.status}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectProgress;
