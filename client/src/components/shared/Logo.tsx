import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
      }}
    >
      <Link to="/">
        <img
          src="chatgpt.webp"
          alt="chatgpt"
          height={"47px"}
          className="image-inverted"
        />
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      ></Typography>
    </div>
  );
};

export default Logo;
