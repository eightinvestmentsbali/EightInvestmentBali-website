import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../../../theme/MuiTheme";

interface FormData {
  name: string;
  email: string;
  mobileNumber: string;
  interestedProject: string;
  message: string;
}

const ContactFooter = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobileNumber: "",
    interestedProject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const navigationLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Services", path: "/services" },
    { label: "Our Team", path: "/team" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#000000",
        color: "#FFFFFF",
        pt: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Stack
          spacing={{ xs: 2, md: 4, lg: 6 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="heroSubTitle"
            component="h1"
            sx={{
              color: theme.palette.primary.contrastText,
              fontWeight: typographyTokens.fontWeights.medium,
            }}
          >
            Discover how Eight Investments Bali can transform your vision into
            reality
          </Typography>
          <Divider sx={{ width: "100%", height: "2px", bgcolor: "#67697C" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: typographyTokens.fontWeights.regular,
              color: theme.palette.primary.contrastText,
              maxWidth: "900px",
              mx: "auto",
              alignSelf: "center",
            }}
          >
            Our core values shape every project we undertake. They drive our
            commitment to excellence and Innovation in the hospitality and
            leisure industry.
          </Typography>
        </Stack>

        {/* Contact Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mb: { xs: 8, md: 12 },
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          <Stack spacing={3}>
            {/* Name Field */}
            <TextField
              required
              fullWidth
              name="name"
              label="Name*"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1A1A1A",
                  color: "#FFFFFF",
                  "& fieldset": {
                    borderColor: "#333333",
                  },
                  "&:hover fieldset": {
                    borderColor: "#555555",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4E9E70",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#FFFFFF",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFFFFF",
                },
                "& input::placeholder": {
                  color: "#888888",
                  opacity: 1,
                },
              }}
            />

            {/* Email and Mobile Number Row */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  type="email"
                  label="Email*"
                  placeholder="Enter your Email address"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#1A1A1A",
                      color: "#FFFFFF",
                      "& fieldset": {
                        borderColor: "#333333",
                      },
                      "&:hover fieldset": {
                        borderColor: "#555555",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4E9E70",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#FFFFFF",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FFFFFF",
                    },
                    "& input::placeholder": {
                      color: "#888888",
                      opacity: 1,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="mobileNumber"
                  label="Mobile Number*"
                  placeholder="Enter your Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#1A1A1A",
                      color: "#FFFFFF",
                      "& fieldset": {
                        borderColor: "#333333",
                      },
                      "&:hover fieldset": {
                        borderColor: "#555555",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4E9E70",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#FFFFFF",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FFFFFF",
                    },
                    "& input::placeholder": {
                      color: "#888888",
                      opacity: 1,
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Interested Project Field */}
            <TextField
              required
              fullWidth
              name="interestedProject"
              label="Interested Project*"
              placeholder="Enter your interested Project"
              value={formData.interestedProject}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1A1A1A",
                  color: "#FFFFFF",
                  "& fieldset": {
                    borderColor: "#333333",
                  },
                  "&:hover fieldset": {
                    borderColor: "#555555",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4E9E70",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#FFFFFF",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFFFFF",
                },
                "& input::placeholder": {
                  color: "#888888",
                  opacity: 1,
                },
              }}
            />

            {/* Message Field */}
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              name="message"
              label="Message*"
              placeholder="Enter your Message"
              value={formData.message}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1A1A1A",
                  color: "#FFFFFF",
                  "& fieldset": {
                    borderColor: "#333333",
                  },
                  "&:hover fieldset": {
                    borderColor: "#555555",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4E9E70",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#FFFFFF",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFFFFF",
                },
                "& textarea::placeholder": {
                  color: "#888888",
                  opacity: 1,
                },
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#4E9E70",
                color: "#FFFFFF",
                py: 1.5,
                alignSelf: "center",
                width: { xs: "100%", sm: "50%" },
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#3d7d57",
                },
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>

        {/* Footer Section */}
        <Box
          sx={{
            borderTop: "1px solid #333333",
            pt: { xs: 6, md: 8 },
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Head Office Column */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  mb: 3,
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
              >
                Head office
              </Typography>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <LocationOnIcon
                    sx={{
                      color: "#FFFFFF",
                      mt: 0.5,
                      fontSize: "1.25rem",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: "1.5rem",
                      color: "#FFFFFF",
                    }}
                  >
                    Pertokoan Sunset Road Permai JL. Boulevard Sunset Road,
                    Simpang Dewa Ruci, Kuta, Kec. Kuta, Kabupaten Badung, Bali
                    80361
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <EmailIcon
                    sx={{
                      color: "#FFFFFF",
                      fontSize: "1.25rem",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      color: "#FFFFFF",
                    }}
                  >
                    info@eightinvestmentsbali.com
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* Visit Column */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  mb: 3,
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
              >
                Visit
              </Typography>
              <Stack spacing={1.5}>
                {navigationLinks.map((link) => (
                  <Typography
                    key={link.path}
                    component={NavLink}
                    to={link.path}
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      display: "block",
                      "&:hover": {
                        color: "#4E9E70",
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Follow Us Column */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  mb: 3,
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
              >
                Follow us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  sx={{
                    color: "#FFFFFF",
                    border: "1px solid #FFFFFF",
                    borderRadius: "4px",
                    width: 40,
                    height: 40,
                    p: 0,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "#FFFFFF",
                    },
                  }}
                >
                  <InstagramIcon sx={{ fontSize: "1.25rem" }} />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#FFFFFF",
                    border: "1px solid #FFFFFF",
                    borderRadius: "4px",
                    width: 40,
                    height: 40,
                    p: 0,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "#FFFFFF",
                    },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: "1.25rem" }} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* Copyright */}
      <Box
        sx={{
          textAlign: "center",
          mt: { xs: 6, md: 8 },
          p: { xs: 1, md: 2 },
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #333333",
          bgcolor: "#1D1D1D",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.primary.contrastText,
            fontWeight: typographyTokens.fontWeights.regular,
          }}
        >
          2026 © PT Eight Investements Bali All Right Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactFooter;
