import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

import { logoutUser } from "../api/apiClient";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


import Chip from '@mui/material/Chip';

import LogoutHandler from "./LogoutHandler";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open
      ? { ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme) }
      : { ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme) }),
  })
);

export default function MiniDrawer({ children }) {


  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const OpenBadge = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const profile = useSelector((state) => state.users.profile);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Users", path: "/users", icon: <PeopleIcon /> },
    { text: "About", path: "/about", icon: <InfoIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ background: "linear-gradient(90deg, #1a5882 0%, #000000 100%)" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            My App
          </Typography>

          {/* <IconButton color="inherit">
            <Badge color="secondary" badgeContent={UserCount} showZero>
              <MailIcon />
            </Badge>
          </IconButton> */}

          {/* <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton> */}

          <Stack direction="row" spacing={1}>
            <Chip 
              label={`Welcome ${profile?.name ?? "Guest"} !..`} 
              sx={{ color: "#fff", borderColor: "#fff" }} 
              // onClick={handleClick} 
            />
          </Stack>

          <div>
            <Button
              id="demo-positioned-button"
              aria-controls={OpenBadge ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={OpenBadge ? 'true' : undefined}
              onClick={handleClick}
            >
              <Stack direction="row" spacing={4}>
                <Avatar alt="Remy Sharp" src="../../images/avatar.png" />
              </Stack>
              {/* Dashboard */}
            </Button>
           
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={OpenBadge}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}

              
              <MenuItem onClick={handleClose}> <LogoutIcon sx={{ mr: 1 }} />My account</MenuItem>
              <MenuItem onClick={handleLogout}> <LogoutIcon sx={{ mr: 1 }} />Logout</MenuItem>

              
              <MenuItem
                onClick={() => {
                  handleClose();
                  setLogoutOpen(true);
                }}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
            </MenuItem>
              
             
            </Menu>
    </div>

        </Toolbar>
      </AppBar>

        {/* Logout System */}
        <LogoutHandler open={logoutOpen} setOpen={setLogoutOpen} />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{ minHeight: 48, px: 2.5, justifyContent: open ? "initial" : "center" }}
              >
                <ListItemIcon sx={{ justifyContent: "center", mr: open ? 3 : 0 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
