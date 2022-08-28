import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <AppBar position="relative" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

interface HeaderProps {
  name: string;
}

export default Header;
