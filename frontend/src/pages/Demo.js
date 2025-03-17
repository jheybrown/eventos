import React, { useState } from "react";
import { 
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, 
  ListItemIcon, ListItemText, Avatar, CssBaseline, Box 
} from "@mui/material";
import { Menu, Dashboard, BarChart, People, Settings } from "@mui/icons-material";

export default function DashboardPage() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer variant="permanent" open={open} sx={{ width: open ? 240 : 70, flexShrink: 0 }}>
        <List>
          <ListItem button onClick={() => setOpen(!open)}>
            <ListItemIcon><Menu /></ListItemIcon>
            {open && <ListItemText primary="Toggle" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon><Dashboard /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon><BarChart /></ListItemIcon>
            {open && <ListItemText primary="Analytics" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon><People /></ListItemIcon>
            {open && <ListItemText primary="Users" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            {open && <ListItemText primary="Settings" />}
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User Profile" src="https://mui.com/static/images/avatar/1.jpg" />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h4">Welcome to Your Dashboard</Typography>
          <Typography variant="body1">Here is where your content goes.</Typography>
        </Box>
      </Box>
    </Box>
  );
}
