import { Box, Typography, useMediaQuery } from "@mui/material";
import { ForwardIcon, HeroBanner, Robot, SolanaIcon } from "../../assets";
import MobileHero from "./MobileHero";
import BackedBy from "./BackedBy";
import Assistance from "./Assistance";
import AssistanceMobile from "./AssistanceMobile";
import Tokenomics from "./Tokenomics";
import TokenomicsMobile from "./TokenomicsMobile";
import Footer from "../../components/Footer";
import Usecases from "./Usecases";
import TrustedBy from "./TrustedBy";
import GPU from "./GPU";
import GPUMobile from "./GPUMobile";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Home = () => {
  const isDown1000 = useMediaQuery("(max-width:1000px)");
  const isDown1450 = useMediaQuery("(max-width:1450px)");
  const isDown1200 = useMediaQuery("(max-width:1200px)");

  if (isDown1000) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
        id="home"
      >
        <MobileHero />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            maxWidth: "90%",
            borderLeft: "1.5px solid #1C352F",
            borderRight: "1.5px solid #1C352F",
            // paddingTop: '40px',
          }}
        >
          <GPUMobile />
          <TokenomicsMobile />
          <Usecases />
          <BackedBy />
          <TrustedBy />
          <AssistanceMobile />
          <Footer />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        maxWidth: "90%",
        borderLeft: "1.5px solid #1C352F",
        borderRight: "1.5px solid #1C352F",
        paddingTop: "100px",
      }}
      id="home"
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          gap: "20px",
          flexDirection: "row",
          alignItems: "flex-end",
          width: "100%",
          marginBottom: "150px",
        }}
      >
        <img
          src={HeroBanner}
          loading="lazy"
          alt="Hero Banner"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            alignItems: "flex-start",
            width: "max-content",
            flexDirection: "column",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            paddingLeft: "5%",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: "3vw",
              lineHeight: "normal",
              color: "#FFFFFF",
              textTransform: "capitalize",
            }}
          >
            The AI Economy
            <br /> built on Solana
            {/* First{' '}
            <span
              style={{
                background:
                  'linear-gradient(89.58deg, rgb(71, 206, 255) 99.3%, rgb(3, 255, 179) 99.98%) text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Web3
            </span>{' '}
            AI <br />
            infrastructure */}
            <br /> powered by <span style={{ color: "#03FFE1" }}>GPT-4o</span>
          </Typography>

          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: isDown1450 ? "16px" : "20px",
              lineHeight: "normal",
              pt: "32px",
              pb: "16px",
            }}
          >
            TARS is an AI-driven, scalable Web3 modular infrastructure <br />
            platform enabling organizations and individuals to effortlessly
            <br />
            transition from Web2 to Web3.
          </Typography>

          {/* <Typography
            sx={{
              background:
                'linear-gradient(89.98deg, #9845FE 6.93%, #47CEFF 47.14%, #03FFE1 70.08%, #03FFB3 99.98%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24.2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
            onClick={() => window.open('https://calendly.com/tars-ai/demo')}
          >
            Book a Demo <img src={ForwardIcon} />
          </Typography> */}

          <Box
            sx={{
              backgroundColor: "#161616",
              maxWidth: isDown1200 ? "400px" : "490px",
              width: "100%",
              height: "80px",
              clipPath:
                "polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 0.5rem), 0 0)",
              marginTop: isDown1450 ? "20px" : "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              gap: "20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: isDown1200 ? "18px" : "20px",
                lineHeight: "24.2px",
              }}
            >
              {/* First AI Project <br /> */}
              Backed By
            </Typography>

            <img
              src={SolanaIcon}
              alt="Solana Icon"
              width={isDown1200 ? "190px" : "233px"}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "-webkit-fill-available",
          }}
        >
          <img
            src={Robot}
            alt="Robot"
            loading="lazy"
            style={{ width: isDown1450 ? "60%" : "70%", height: "auto" }}
          />
        </Box>
      </Box>
      <GPU />
      <Tokenomics />
      <Usecases />
      <BackedBy />
      <TrustedBy />
      <Assistance />
      <Footer />
    </Box>
  );
};

export default Home;
