

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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/DesignElement/LogoSVG";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Our Team", path: "/team" },
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
    const sectionMap: { [key: string]: string } = {
      "Services": "our-services",
      "Our Team": "our-team",
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
        navigate("/");
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
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
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out",
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
              <Logo style={{ height: 36 }} />
            </Box>

            {/* Right Icon */}
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
          </Box>

          {/* ===== DESKTOP VIEW ===== */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Logo */}
            <Box sx={{ flex: 1 }}>
              <Logo style={{ height: 45 }} />
            </Box>

            {/* Menu */}
            <Stack direction="row" spacing={6} alignItems="center">
              {menuItems.map((item) => {
                const isScrollable = item.label === "Services" || item.label === "Our Team";
                return (
                  <Typography
                    key={item.label}
                    component={NavLink}
                    to={item.path}
                    onClick={(e) => {
                      if (isScrollable) {
                        handleNavClick(item.path, item.label, e);
                      }
                    }}
                    sx={{
                      textDecoration: "none",
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      cursor: "pointer",
                      "&.active": {
                        color: theme.palette.primary.main,
                        fontWeight: 700,
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
                sx={{
                  fontWeight: 500,
                  borderRadius: "10px",
                  textTransform: "none",
                  px: 3,
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ===== MOBILE DRAWER ===== */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 3 }}>
          <Stack spacing={3}>
            {menuItems.map((item) => {
              const isScrollable = item.label === "Services" || item.label === "Our Team";
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

            <Button variant="contained" disableElevation fullWidth>
              Contact Us
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
