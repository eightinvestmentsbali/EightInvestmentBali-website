

import React, { useState } from "react";
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
import { NavLink } from "react-router-dom";
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

  return (
    <>
      <AppBar
        position="relative"
        elevation={0}
        sx={{
          background: "transparent",
          boxShadow: "none",
          py: 1,
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
              {menuItems.map((item) => (
                <Typography
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    textDecoration: "none",
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    "&.active": {
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}

              <Button
              disableElevation
                variant="contained"
                sx={{
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
            {menuItems.map((item) => (
              <Typography
                key={item.label}
                component={NavLink}
                to={item.path}
                onClick={() => setOpen(false)}
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                {item.label}
              </Typography>
            ))}

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
