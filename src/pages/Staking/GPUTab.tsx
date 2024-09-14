import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { ForwardIcon, TarsLogoTextWhite } from "../../assets";
import Image from "../../components/common/Image";
import TierBox from "../../components/TierBox";
import {
  BlueNodeAnimation,
  GoldNodeAnimation,
  GreenNodeAnimation,
  IridescenceNodeAnimation,
  RedNodeAnimation,
} from "../../assets";
import { calculateReward, getUserTiers } from "../../script";
import { SOLANA_RPC } from "../../utils";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { normalizeAmount } from "../../contract";
import * as anchor from "@coral-xyz/anchor";
import { TarsStakingNftProgram } from "../../contract/types/tars_staking_nft_program";
import tarsIdlStaking from '../../contract/idl/tars_staking_nft_program.json';

const GPUTab = ({ connection, handleMainTabChange}: {connection: any, handleMainTabChange: (value: number, tierNo: number) => void }) => {
  const [claimInput, setClaimInput] = useState<string | number>(0);
  const isDown900 = useMediaQuery("(max-width:900px)");

  const tiers = [
    {
      tierNo: 1,
      ownedNFTs: 0,
      price: "15,000 ",
      pays: "5,000",
      animation: GoldNodeAnimation,
    },
    {
      tierNo: 2,
      ownedNFTs: 0,
      price: "35,000",
      pays: "10,000",
      animation: RedNodeAnimation,
    },
    {
      tierNo: 3,
      ownedNFTs: 0,
      price: "60,000",
      pays: " 20,000",
      animation: GreenNodeAnimation,
    },
    {
      tierNo: 4,
      ownedNFTs: 0,
      price: "100,000",
      pays: "50,000",
      animation: BlueNodeAnimation,
    },
    {
      tierNo: 5,
      ownedNFTs: 0,
      price: "250,000",
      pays: "100,000",
      animation: IridescenceNodeAnimation,
    },
  ];

  const { publicKey } = useWallet();
  const [claimAmount, setClaimAmount] = useState(0)
  const [nftCount, setNftCount] = useState({} as Record<number, number>) 
  
  useEffect(() => {
    (async () => {
      if(publicKey) {
        // const connection = new Connection(SOLANA_RPC);
        const tiersRewards = await calculateReward(connection, publicKey);
        let program = new anchor.Program(tarsIdlStaking as anchor.Idl, {
          connection,
        }) as unknown as anchor.Program<TarsStakingNftProgram>;
        
        console.log("gpu tab", tiersRewards);
      
        const sum = normalizeAmount(Object.values(tiersRewards).reduce((acc, value) => {
          return acc += value;  
        }, 0))
        console.log('sum', sum)

        setClaimAmount(sum)

        const userTiers = await getUserTiers(publicKey, program);
        console.log('user tiers aaa', userTiers)

        const nftCount = userTiers.reduce((acc: Record<number, number>, value) => {
          acc[value.tierId] = value.nftCount;
          return acc;
        }, {})
        console.log('nft count', nftCount)
        setNftCount(nftCount)

      }
    }) ()
  }, [])

  return (
    <Box width="100%">
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        my={2}
      >
        <Typography
          fontSize={"24px"}
          fontWeight={400}
          lineHeight={"36px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 1)"
          mb={2}
        >
          Claim your TAI
        </Typography>
        <Typography
          fontSize={"20px"}
          fontWeight={400}
          lineHeight={"30px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 0.7)"
          textAlign={"center"}
        >
          Your Reward Balance: {!isDown900 && <br />}{" "}
          <span
            style={{
              color: "rgba(169, 60, 255, 1)",
            }}
          >
            {" "}
            {claimAmount} TAI{" "}
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(43, 9, 87, 0) 0%, #9C75DC 100%)",
          padding: "1px",
          borderRadius: "34px",
        }}
      >
        <Box
          sx={{
            padding: "8px",
            paddingBottom: "12px",
            borderRadius: "34px",
            background: "linear-gradient(180deg, #000000 0%, #150925 100%)",
          }}
        >
          <Box
            sx={{
              background: "rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(134, 60, 255, 0.2)",
              position: "relative",
              width: "100%",
              marginBottom: "20px",
              cursor: "pointer",
              borderRadius: "20px",
            }}
            onClick={() => {}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "16px 24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  fontSize={"16px"}
                  fontWeight={400}
                  lineHeight={"24px"}
                  fontFamily={"Avenir"}
                  color="rgba(255, 255, 255, 0.7)"
                >
                  Claim Amount
                </Typography>
                <Image
                  src={TarsLogoTextWhite}
                  alt="logo"
                  sx={{
                    height: "30px",
                  }}
                />
              </Box>
              <Box>
                <TextField
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontSize: "24px",
                      fontWeight: 400,
                      lineHeight: "36px",
                      fontFamily: "Avenir",
                      color: "rgba(255, 255, 255, 1)",
                    },
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  value={claimInput}
                  defaultValue={0}
                  onChange={(e) => setClaimInput(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  fontSize={"14px"}
                  fontWeight={400}
                  lineHeight={"21px"}
                  fontFamily={"Avenir"}
                  color="rgba(255, 255, 255, 0.7)"
                >
                  Balance:{" "}
                  <span
                    style={{
                      color: "rgba(169, 60, 255, 1)",
                      fontFamily: "Avenir",
                    }}
                  >
                    {claimAmount} TAI
                  </span>
                </Typography>

                <PurpleButton onClick={() => {setClaimInput(claimAmount)}} text="Max" />
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                outline: "none",
                boxShadow: "none",
                border: "none",
                borderRadius: "30px",
                fontSize: "24px",
                overflow: "hidden",
                background: "linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)",
                height: "48px",
                width: "174px",
                "&:hover": {
                  opacity: 0.9,
                  backgroundColor: "#72AFF2",
                },
                "&:disabled": {
                  background: "rgb(51, 51, 51)",
                  opacity: 0.5,

                  cursor: "not-allowed !important",
                },
              }}
              disabled
              onClick={() => {}}
            >
              <Typography
                fontSize={"12px"}
                fontWeight={500}
                lineHeight={"18px"}
                fontFamily={"Avenir"}
                color="rgba(255, 255, 255, 1)"
                alignItems={"center"}
                display={"flex"}
              >
                Claim Coming Soon{" "}
                {/* <img
                  src={ForwardIcon}
                  alt="forward"
                  style={{ marginTop: "-4px" }}
                /> */}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        mt={9.3}
        mb={5.6}
      >
        <Box
          component="div"
          sx={{
            width: "135px",
            border: "1px solid",
            borderImageSource:
              "linear-gradient(90deg, #863CFF 0%, rgba(134, 60, 255, 0) 100%)",
            borderImageSlice: 1,
            transform: "matrix(-1, 0, 0, 1, 0, 0)",
          }}
        />
        <Typography
          sx={{
            mx: "9.5px",
            fontFamily: "Avenir",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "30px",
            textAlign: "center",
          }}
        >
          My GPU NFTS
        </Typography>
        <Box
          component="div"
          sx={{
            width: "135px",
            minWidth: "50px",
            border: "1px solid",
            borderImageSource:
              "linear-gradient(90deg, #863CFF 0%, rgba(134, 60, 255, 0) 100%)",
            borderImageSlice: 1,
          }}
        />
      </Box>

      <ResponsiveContainer>
        {tiers.slice(0, 3).map((tier, index) => (
          <TierBox
            key={index}
            tierNo={tier.tierNo}
            ownedNFTs={nftCount[tier.tierNo] || 0}
            animation={tier.animation}
            pays={tier.pays}
            price={tier.price}
            handleMainTabChange={handleMainTabChange}
          />
        ))}
      </ResponsiveContainer>

      <ResponsiveContainer>
        {tiers.slice(3, 5).map((tier, index) => (
          <TierBox
            key={index}
            tierNo={tier.tierNo}
            ownedNFTs={nftCount[tier.tierNo] || 0}
            animation={tier.animation}
            pays={tier.pays}
            price={tier.price}
            handleMainTabChange={handleMainTabChange}
          />
        ))}
      </ResponsiveContainer>
    </Box>
  );
};

const PurpleButton = ({
  text,
  mr,
  onClick,
}: {
  text: string;
  mr?: string | number;
  onClick?: () => void;
}) => {
  return (
    <Button
      sx={{
        backgroundColor: "rgba(134, 60, 255, 0.15)",
        border: "none",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(134, 60, 255, 0.3)",
        },
        mr: mr || "0px",
        borderRadius: "10px",
      }}
      onClick={onClick}
    >
      <Typography
        fontSize={"14px"}
        fontWeight={400}
        lineHeight={"21px"}
        fontFamily={"Avenir"}
        color="rgba(134, 60, 255, 1)"
      >
        {text}
      </Typography>
    </Button>
  );
};

interface ResponsiveContainerProps {
  children: ReactNode;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
}) => (
  <Box
    display="flex"
    width="100%"
    justifyContent="center"
    flexDirection={{ xs: "column", md: "row" }}
    gap="60px"
    paddingBottom={"40px"}
  >
    {children}
  </Box>
);

export default GPUTab;
