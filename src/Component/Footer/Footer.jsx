import React from "react";
import "./Footer.scss";
import logo from "../img/navbarfon.jpg";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_copy">
        <h2>© 2022 SoftLine</h2>
      </div>
      <div className="footer_info">
        <div style={{ margin: "15px 0", borderRadius: "15px" }}>
          <img src={logo} alt="" width={120} />
        </div>
        <div>
          <IconButton
            href="https://www.instagram.com/"
            style={{ color: "white" }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            href="https://ru-ru.facebook.com/"
            style={{ color: "white" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://twitter.com/twi" style={{ color: "white" }}>
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://ru.linkedin.com/"
            style={{ color: "white" }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://www.google.com/" style={{ color: "white" }}>
            <GoogleIcon />
          </IconButton>
        </div>
      </div>
      <div className="footer_adr">
        <h3>
          ул.Исанова 105/3, г.Бишкек
          <br />
          <br />
          All rights reserved
        </h3>
      </div>
    </div>
  );
};

export default Footer;
