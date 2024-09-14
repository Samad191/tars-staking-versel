import React from "react";
import { Box, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { Logo, Twitter, Telegram, Discord, MobileLogo } from "../assets";

const Footer: React.FC = () => {
  const contacts = [
    {
      name: "Twitter",
      link: "https://twitter.com/tars_gg",
      icon: Twitter,
    },
    {
      name: "Discord",
      link: "https://discord.com/invite/tarsai",
      icon: Discord,
    },
    {
      name: "Telegram",
      link: "https://t.me/tars_pro",
      icon: Telegram,
    },
  ];

  const isDown1000 = useMediaQuery("(max-width:1000px)");

  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: isDown1000 ? "60px" : "150px",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          width: "100%",
          borderTop: isDown1000 ? "none" : "1px solid #1C352F",
          borderBottom: "1px solid #1C352F",
          paddingTop: "15px",
          paddingBottom: isDown1000 ? "16px" : "140px",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          gap={isDown1000 ? "70px" : "16px"}
          flexDirection={isDown1000 ? "column" : "row"}
          px="5%"
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              textAlign: isDown1000 ? "center" : "start",
            }}
          >
            <img
              src={isDown1000 ? MobileLogo : Logo}
              alt="Logo"
              style={{
                height: isDown1000 ? "100px" : "80px",
                width: "auto",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: isDown1000 ? "10px" : "16px",
                lineHeight: isDown1000 ? "15px" : "24px",
                color: "#ffffff",
                pt: "37px",
                textAlign: isDown1000 ? "center" : "start",
              }}
            >
              TARS aims to bridge the gap between AI and Web3 worlds by{" "}
              {!isDown1000 && <br />}
              providing a unified platform for AI-powered tools and
              {!isDown1000 && <br />} services, enabling organizations and
              individuals to
              {!isDown1000 && <br />} effortlessly transition from Web2 to Web3.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: "5%",
              justifyContent: isDown1000 ? "space-around" : "end",
            }}
          >
            <Box>
              <Typography
                sx={{
                  pb: isDown1000 ? "24px" : "40px",
                  fontFamily: "Inter",
                  fontWeight: 800,
                  fontSize: isDown1000 ? "11px" : "16px",
                  lineHeight: isDown1000 ? "13.5px" : "27px",
                }}
              >
                About
              </Typography>
              <Box display="flex" flexDirection={"column"}>
                <Tooltip
                  title={"Coming Soon"}
                  placement="top"
                  enterTouchDelay={0}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: isDown1000 ? "11px" : "16px",
                      lineHeight: isDown1000 ? "13.5px" : "20px",
                      color: "#ffffff",
                      opacity: 0.5,
                      cursor: "pointer",
                    }}
                  >
                    Docs
                  </Typography>
                </Tooltip>
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{
                  pb: isDown1000 ? "24px" : "40px",
                  fontFamily: "Inter",
                  fontWeight: 800,
                  fontSize: isDown1000 ? "11px" : "16px",
                  lineHeight: isDown1000 ? "13.5px" : "27px",
                }}
              >
                Explore
              </Typography>
              <Box display="flex" flexDirection={"column"}>
                <Tooltip
                  title={"Coming Soon"}
                  placement="top"
                  enterTouchDelay={0}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: isDown1000 ? "11px" : "16px",
                      lineHeight: isDown1000 ? "13.5px" : "20px",
                      color: "#ffffff",
                      opacity: 0.5,
                      cursor: "pointer",
                    }}
                  >
                    TARS AI
                  </Typography>
                </Tooltip>
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{
                  pb: isDown1000 ? "24px" : "40px",
                  fontFamily: "Inter",
                  fontWeight: 800,
                  fontSize: isDown1000 ? "11px" : "16px",
                  lineHeight: isDown1000 ? "13.5px" : "27px",
                }}
              >
                Contact
              </Typography>

              <Box display="flex" flexDirection={"column"}>
                {contacts.map((contact, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer",
                      pb: "40px",
                    }}
                    onClick={() => window.open(contact.link, "_blank")}
                  >
                    <img
                      src={contact.icon}
                      alt={contact.name}
                      style={{
                        height: isDown1000 ? "14.6px" : "21px",
                        width: isDown1000 ? "16px" : "23px",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: "Arial",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#ffffff",
          opacity: 0.5,
          my: "24px",
          px: "5%",
          width: "100%",
          textAlign: isDown1000 ? "center" : "start",
        }}
      >
        © 2024 TARS Protocol. All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
