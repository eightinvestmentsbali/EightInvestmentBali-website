import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Drawer,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/DesignElement/LogoSVG";
import { typographyTokens } from "../../theme/MuiTheme";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Our Team", path: "/team" },
  // { label: "Contact Us", path: "/contact-us" },
];

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < 10) {
            setScrolled(false);
            setIsVisible(true);
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
              scrollTimeoutRef.current = null;
            }
            ticking = false;
            return;
          }

          setScrolled(true);

          const scrollDifference = currentScrollY - lastScrollY;

          if (scrollDifference > 5) {
            setIsVisible(false);
          } else if (scrollDifference < -5) {
            setIsVisible(true);
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
              scrollTimeoutRef.current = null;
            }
          }

          setLastScrollY(currentScrollY);
          ticking = false;

          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          scrollTimeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            scrollTimeoutRef.current = null;
          }, 200);
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  const handleNavClick = (path: string, label: string, e: React.MouseEvent) => {
    e.preventDefault();
    const isHomePage = location.pathname === "/";

    if (label === "Home") {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        window.scrollTo(0, 0);
      }
      setOpen(false);
      return;
    }

    const sectionMap: { [key: string]: string } = {
      Services: "our-services",
      "Our Team": "our-team",
      Projects: "our-projects",
      "About Us": "about-us",
      "Contact Us": "contact-us",
    };

    const sectionId = sectionMap[label];

    if (sectionId) {
      if (isHomePage) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          setOpen(false);
          return;
        }
      } else {
        navigate("/", {
          state: { scrollTo: sectionId },
        });
        setOpen(false);
        return;
      }
    }

    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? `linear-gradient(to bottom, ${theme.palette.background.paper}dd, ${theme.palette.background.paper}cc)`
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          py: 1,
          px: 2,
          zIndex: 1000,
          top: 0,
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          transition:
            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out",
          willChange: "transform",
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          {/* ===== MOBILE VIEW ===== */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Hamburger */}
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>

            {/* Center Logo */}
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Logo style={{ height: 45 }} />
            </Box>

            {/* Right Icon */}
            {/* <IconButton>
              <NotificationsNoneIcon />
            </IconButton> */}
            <Box sx={{ width: 40 }} />
          </Box>

          {/* ===== DESKTOP VIEW ===== */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              width: "100%",
            }}
          >
            <Container maxWidth="xl" sx={{ display: "flex" }}>
              {/* Logo */}
              <Box sx={{ flex: 1 }}>
                <Logo style={{ height: 45 }} />
              </Box>

              {/* Menu */}
              <Stack direction="row" spacing={6} alignItems="center">
                {menuItems.map((item) => {
                  const isScrollable =
                    item.label === "Services" ||
                    item.label === "Our Team" ||
                    item.label === "Projects" ||
                    item.label === "About Us" ||
                    item.label === "Home" ||
                    item.label === "Contact Us";
                  return (
                    <Typography
                      key={item.label}
                      onClick={(e) => {
                        if (isScrollable) {
                          handleNavClick(item.path, item.label, e);
                          setIsVisible(false);
                        }
                      }}
                      sx={{
                        textDecoration: "none",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        cursor: "pointer",
                        "&:visited": {
                          color: theme.palette.text.primary,
                        },

                        "&.active": {
                          color: theme.palette.primary.main,
                          fontWeight: typographyTokens.fontWeights.bold,
                        },

                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  );
                })}

                <Button
                  disableElevation
                  variant="contained"
                  onClick={(e) => {
                    handleNavClick("/contact-us", "Contact Us", e);
                  }}
                  sx={{
                    fontWeight: 500,
                    borderRadius: "10px",
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Container>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to offset fixed AppBar so page content doesn't sit under the navbar */}
      <Toolbar sx={{ minHeight: 72 }} />

      {/* ===== MOBILE DRAWER ===== */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 3 }}>
          <Stack spacing={3}>
            {menuItems.map((item) => {
              const isScrollable =
                item.label === "Services" ||
                item.label === "Our Team" ||
                item.label === "Projects" ||
                item.label === "About Us" ||
                item.label === "Home";
              return (
                <Typography
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  onClick={(e) => {
                    if (isScrollable) {
                      handleNavClick(item.path, item.label, e);
                    } else {
                      setOpen(false);
                    }
                  }}
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  {item.label}
                </Typography>
              );
            })}

            <Button
              disableElevation
              variant="contained"
              onClick={(e) => {
                handleNavClick("/", "Contact Us", e);
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
