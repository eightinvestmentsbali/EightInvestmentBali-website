import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../theme/MuiTheme";

interface ProjectProgressProps {
  phases: any[];
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ phases }) => {
  const theme = useTheme();
  const [activePhase, setActivePhase] = useState(0);

  // Safety check: return null if phases is empty or undefined
  if (!phases || phases.length === 0) {
    return null;
  }

  // Ensure activePhase is within bounds
  const safeActivePhase = Math.min(activePhase, phases.length - 1);
  const currentPhase = phases[safeActivePhase];

  return (
    <Box
      sx={{
        bgcolor: "#EEF1EA",
        borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 3, xl: 4 },
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: { xs: 0.5, sm: 1, md: 1.5, lg: 2.5, xl: 3.5 } }}>
        {/* HEADER */}
        <Typography
          variant="h4"
          fontWeight={typographyTokens.fontWeights.regular}
          color={theme.palette.primary.main}
          mb={{ xs: 0.1, sm: 0.5, md: 0.8, lg: 1, xl: 1 }}
          lineHeight={{ xs: 1.2, md: 1.4 }}
          sx={{
            fontSize: {
              xs: typographyTokens.fontSizes["xs"],
              sm: typographyTokens.fontSizes["sm"],
              md: typographyTokens.fontSizes["md"],
              lg: typographyTokens.fontSizes["lg"],
              xl: typographyTokens.fontSizes["xl"],
            },
          }}
        >
          Current Progress
        </Typography>

        {/* PERCENTAGE */}
        <Typography
          variant="heroSubTitle"
          component="h1"
          fontWeight={typographyTokens.fontWeights.bold}
          color={theme.palette.primary.main}
          lineHeight={{ xs: 1.2, md: 1.4 }}
          mb={{ xs: 0.2, sm: 0.5, md: 0.8, lg: 1, xl: 1 }}
          sx={{
            fontSize: {
              xs: typographyTokens.fontSizes["xl"],
              sm: typographyTokens.fontSizes["2xl"],
              md: typographyTokens.fontSizes["3xl"],
              lg: typographyTokens.fontSizes["4xl"],
              xl: typographyTokens.fontSizes["5xl"],
            },
          }}
        >
          {currentPhase.progress}%
        </Typography>

        {/* TIMELINE */}
        <Box
          sx={{
            position: "relative",
            mb: { xs: 0.5, sm: 0.8, md: 1, lg: 1.5, xl: 2 },
          }}
        >
          {/* DOTTED LINE */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: "8%", sm: "9%", md: "10%", lg: "10%", xl: "10%" },
              left: 0,
              right: 0,
              borderTop: `1px dashed ${theme.palette.primary.main}`,
            }}
          />

          {/* PHASES */}
          <Box display="flex" justifyContent="space-between">
            {phases.map((phase, index) => {
              const isActive = index === safeActivePhase;

              return (
                <Box
                  key={phase.label}
                  textAlign="center"
                  sx={{ width: `${100 / phases.length}%`, cursor: "pointer" }}
                  onClick={() => setActivePhase(index)}
                >
                  {/* DIAMOND */}
                  <Box
                    sx={{
                      width: {
                        xs: "3px",
                        sm: "4px",
                        md: "5px",
                        lg: "7px",
                        xl: "10px",
                      },
                      height: {
                        xs: "3px",
                        sm: "4px",
                        md: "5px",
                        lg: "7px",
                        xl: "10px",
                      },
                      mx: "auto",
                      mb: { xs: 0.3, sm: 0.5, md: 0.7, lg: 0.8, xl: 1 },
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
                    lineHeight={{ xs: 2 }}
                    sx={{
                      fontSize: {
                        xs: "0.3rem",
                        sm: "0.4rem",
                        md: "0.5rem",
                        lg: "0.6rem",
                        xl: "0.8rem",
                      },
                    }}
                  >
                    {phase.label}
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight={typographyTokens.fontWeights.regular}
                    color={theme.palette.primary.main}
                    lineHeight={{ xs: 1.2 }}
                    sx={{
                      fontSize: {
                        xs: "0.3rem",
                        sm: "0.4rem",
                        md: "0.5rem",
                        lg: "0.6rem",
                        xl: "0.8rem",
                      },
                      // bgcolor: "#ccc",
                      transition: "all .25s ease",
                      // FIX: Set a consistent min-height so all boxes match
                      minHeight: {
                        xs: "1rem",
                        sm: "1.4rem",
                        md: "1.8rem",
                        lg: "2rem",
                      },
                      // Ensure the text is centered vertically within that fixed height
                      display: "flex",
                      // alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {phase.date}
                  </Typography>

                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <Box
                      sx={{
                        mt: { xs: 0.5, sm: 0.7, md: 0.9, lg: 1, xl: 1.2 },
                        width: 0,
                        height: 0,
                        mx: "auto",
                        borderLeft: {
                          xs: "3px solid transparent",
                          sm: "4px solid transparent",
                          md: "5px solid transparent",
                          lg: "6px solid transparent",
                          xl: "7px solid transparent",
                        },
                        borderRight: {
                          xs: "3px solid transparent",
                          sm: "4px solid transparent",
                          md: "5px solid transparent",
                          lg: "6px solid transparent",
                          xl: "7px solid transparent",
                        },
                        borderTop: {
                          xs: `4px solid ${theme.palette.primary.main}`,
                          sm: `5px solid ${theme.palette.primary.main}`,
                          md: `6px solid ${theme.palette.primary.main}`,
                          lg: `7px solid ${theme.palette.primary.main}`,
                          xl: `8px solid ${theme.palette.primary.main}`,
                        },
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
          py: { xs: 0.50, sm: 0.75, md: 1.5, lg: 2, xl: 2.5 },
          textAlign: "center",
          transition: "all .3s ease",
        }}
      >
        <Typography
          fontWeight={typographyTokens.fontWeights.regular}
          color={theme.palette.primary.contrastText}
          sx={{
            fontSize: {
              xs: "0.3rem",
              sm: "0.425rem",
              md: "0.575rem",
              lg: "0.75rem",
              xl: "1rem",
            },
            transition: "all .3s ease",
            whiteSpace: "pre-line",
            lineHeight: 1.2,
          }}
        >
          {currentPhase.status}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectProgress;
