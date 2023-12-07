import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import { NavigationLink } from "./shared/NavigationLink";

export const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex"  }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00A67E"
                to="/chat"
                text="Go To Chats"
                textColor="black"
              />
              <NavigationLink
                bg="#00A67E"
                textColor="black"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00A67E"
                to="/login"
                text="Login"
                textColor="#FFFFFF"
              />
              <NavigationLink
                bg="#00A67E"
                textColor="#FFFFFF"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
