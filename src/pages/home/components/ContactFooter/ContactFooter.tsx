import React, { useEffect, useState } from "react";
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
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { typographyTokens } from "../../../../theme/MuiTheme";
import { contactUs } from "../../../../api/contactServices";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  mobileNumber: string;
  interestedProject: string[];
  message: string;
}

const PROJECT_OPTIONS = [
  "Lili Village",
  "The Hive",
  "Little Soho",
  "Dynasty 8",
  "Other",
];

const ContactFooter = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobileNumber: "",
    interestedProject: [],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    try {
      await contactUs.create({
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        interestedProject: formData.interestedProject,
        message: formData.message,
      });

      setSubmitMessage("Thanks. Your message has been submitted successfully.");
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        interestedProject: [],
        message: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Contact form submit failed (Axios)", {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          requestUrl: error.config?.url,
          method: error.config?.method,
        });
      } else {
        console.error("Contact form submit failed", error);
      }
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigationLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/#about-us" },
    { label: "Projects", path: "/#our-projects" },
    { label: "Services", path: "/#our-services" },
    { label: "Our Team", path: "/#our-team" },
  ];

  const handleVisitLinkClick = (
    e: React.MouseEvent,
    path: string,
    label: string,
  ) => {
    e.preventDefault();
    const isHomePage = location.pathname === "/";

    if (label === "Home") {
      if (isHomePage) {
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (path.startsWith("/#")) {
      const sectionId = path.replace("/#", "");

      if (isHomePage) {
        const section = document.getElementById(sectionId);
        if (section) {
          window.history.pushState(null, "", path);
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
    }

    navigate(path);
  };

  useEffect(() => {
    const getDummyMessage = (action: string, projectName: string) => {
      if (action === "register") {
        return `Hi, I would like to register my interest in ${projectName}. Please share the next steps.`;
      }
      if (action === "request") {
        return `Hi, I would like to request availability details for ${projectName}. Please share available options.`;
      }
      if (action === "schedule") {
        return `Hi, I would like to schedule a site visit for ${projectName}. Please let me know available time slots.`;
      }
      return "";
    };

    const syncIntentToForm = () => {
      const rawIntent = sessionStorage.getItem("contactIntent");
      if (!rawIntent) return;

      try {
        const parsed = JSON.parse(rawIntent) as {
          action?: string;
          projectName?: string;
        };

        const action = parsed.action ?? "";
        const projectName = parsed.projectName ?? "";
        if (!action || !projectName) return;

        setFormData((prev) => ({
          ...prev,
          interestedProject: [projectName],
          message: getDummyMessage(action, projectName),
        }));
      } catch (error) {
        console.error("Invalid contact intent payload", error);
      }
    };

    syncIntentToForm();
    window.addEventListener("contact-intent-updated", syncIntentToForm);
    return () => {
      window.removeEventListener("contact-intent-updated", syncIntentToForm);
    };
  }, []);

  return (
    <Box
      id="contact-us"
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
              label="Name"
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
                  "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
                    {
                      WebkitTextFillColor: "#FFFFFF",
                      WebkitBoxShadow: "0 0 0 1000px #1A1A1A inset",
                      boxShadow: "0 0 0 1000px #1A1A1A inset",
                      caretColor: "#FFFFFF",
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
                  label="Email"
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
                      "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
                        {
                          WebkitTextFillColor: "#FFFFFF",
                          WebkitBoxShadow: "0 0 0 1000px #1A1A1A inset",
                          boxShadow: "0 0 0 1000px #1A1A1A inset",
                          caretColor: "#FFFFFF",
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
                  fullWidth
                  name="mobileNumber"
                  label="Mobile Number"
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
                      "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
                        {
                          WebkitTextFillColor: "#FFFFFF",
                          WebkitBoxShadow: "0 0 0 1000px #1A1A1A inset",
                          boxShadow: "0 0 0 1000px #1A1A1A inset",
                          caretColor: "#FFFFFF",
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
              select
              name="interestedProject"
              label="Interested Project"
              value={formData.interestedProject}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  interestedProject:
                    typeof value === "string" ? value.split(",") : value,
                }));
              }}
              SelectProps={{
                multiple: true,
                renderValue: (selected) =>
                  (selected as string[]).join(", "),
              }}
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
                  "& .MuiSvgIcon-root": {
                    color: theme.palette.primary.main,
                  },
                  "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
                    {
                      WebkitTextFillColor: theme.palette.primary.main,
                      WebkitBoxShadow: "0 0 0 1000px #1A1A1A inset",
                      boxShadow: "0 0 0 1000px #1A1A1A inset",
                      caretColor: "#FFFFFF",
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
            >
              {PROJECT_OPTIONS.map((project) => (
                <MenuItem key={project} value={project}>
                  <Checkbox
                    checked={formData.interestedProject.includes(project)}
                    size="small"
                    sx={{
                      color: "#7D8780",
                      "&.Mui-checked": { color: "#4E9E70" },
                      "&:hover": { bgcolor: "rgba(78, 158, 112, 0.12)" },
                    }}
                  />
                  <ListItemText primary={project} />
                </MenuItem>
              ))}
            </TextField>
            {/* Message Field */}
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              name="message"
              label="Message"
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
                  "& textarea:-webkit-autofill, & textarea:-webkit-autofill:hover, & textarea:-webkit-autofill:focus":
                    {
                      WebkitTextFillColor: "#FFFFFF",
                      WebkitBoxShadow: "0 0 0 1000px #1A1A1A inset",
                      boxShadow: "0 0 0 1000px #1A1A1A inset",
                      caretColor: "#FFFFFF",
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
              disabled={isSubmitting}
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
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {submitMessage && (
              <Typography sx={{ color: "#9CE3B8", textAlign: "center" }}>
                {submitMessage}
              </Typography>
            )}
            {submitError && (
              <Typography sx={{ color: "#FF8F8F", textAlign: "center" }}>
                {submitError}
              </Typography>
            )}
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
                    Jalan Sang Hyang Nomor 88, Desa/Kelurahan Abianbase, Kec. Mengwi,
                    Kab. Badung, Provinsi Bali, Kode Pos: 80351
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
                    key={link.label}
                    component={NavLink}
                    to={link.path}
                    onClick={(e) => handleVisitLinkClick(e, link.path, link.label)}
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
                  component="a"
                  href="https://www.instagram.com/eightinvestmentsbali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Eight Investments Bali on Instagram"
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
                  component="a"
                  href="https://www.linkedin.com/company/eight-investments-bali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Eight Investments Bali on LinkedIn"
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
