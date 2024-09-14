import { Box, Typography, useMediaQuery } from "@mui/material";

interface TierBoxProps {
  tierNo: number;
  ownedNFTs: number;
  animation: string;
  pays: string;
  price: string;
  handleMainTabChange: (value: number, tierNo: number) => void;
}

const TierBox = ({
  tierNo,
  ownedNFTs,
  animation,
  pays,
  price,
  handleMainTabChange
}: TierBoxProps) => {
  const isDown600 = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "16px",
          color: "rgba(255, 255, 255, 1)",
          marginBottom: "12px",
        }}
      >
        {`TIER ${tierNo}`}
      </Typography>
      <Box
        sx={{
          border: "1px solid rgba(134, 60, 255, 0.2)",
          position: "relative",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "20px",
          background: "linear-gradient(180deg, #000000 0%, #150925 100%)",
          height: "150px",
          minWidth: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: "100px",

              width: "100%",
              position: "absolute",
              top: 0,
              left: isDown600 ? -65 : -70,
            }}
          >
            <video
              loop
              muted
              playsInline
              autoPlay
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <source src={animation} type="video/quicktime" />
              <source src={animation} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </Box>
          <Box
            sx={{
              //  position: "absolute",
              // height: "100%",
              // width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              right: isDown600 ? 30 : 20,
              position: "absolute",
              // center vertically
              top: "40%",
              transform: "translateY(-50%)",
            }}
          >
            <Typography
              fontSize={isDown600 ? "12px" : "12px"}
              fontWeight={500}
              lineHeight={"16px"}
              fontFamily={"Avenir"}
              color="rgba(255, 255, 255, 1)"
            >
              Price:{" "}
              <span
                style={{
                  color: "rgba(134, 60, 255, 1)",
                  fontFamily: "Avenir",
                  fontWeight: 900,
                }}
              >
                {price}{" "}
              </span>
              POINTS
            </Typography>
            <Typography
              fontSize={isDown600 ? "12px" : "12px"}
              fontWeight={500}
              lineHeight={"16px"}
              fontFamily={"Avenir"}
              color="rgba(255, 255, 255, 1)"
            >
              Mines:{" "}
              <span
                style={{
                  color: "rgba(134, 60, 255, 1)",
                  fontFamily: "Avenir",
                  fontWeight: 900,
                }}
              >
                {pays + '    '}
              </span>
              $TAI/year
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "8px",
          }}
        >
          <Box
            sx={{
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "21px",
              background: "rgba(134, 60, 255, 0.15)",
              padding: "4px 10px",
              borderRadius: "10px",
              color: "rgba(134, 60, 255, 1)",
              fontFamily: "Avenir",
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              // handleMainTabChange(0, tierNo);   
            }}
          >
            {ownedNFTs} Owned
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TierBox;
