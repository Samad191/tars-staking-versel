import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  BlueNodeAnimation,
  GoldNodeAnimation,
  GreenNodeAnimation,
  IridescenceNodeAnimation,
  RedNodeAnimation,
} from "../../assets";
import { calculateReward, getTiersDetails } from "../../script";
import { SOLANA_RPC } from "../../utils";
import { Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { claimNFT, convertAmountToLamports, dummy, getProvider, normalizeAmount } from "../../contract";
// import tarsIdlStaking from "./contract/idl/tars_staking_nft_program.json";
import tarsIdlStaking from "../../contract/idl/tars_staking_nft_program.json";
import * as anchor from "@coral-xyz/anchor";
import { TarsStakingNftProgram } from "../../contract/types/tars_staking_nft_program";
import {
  getMultiplierAcc,
  getStakingConfigAcc,
  getUserStakeAccount,
} from "../../contract/common";
import { getUserTotalPointsAtCurrentTime } from "../../contract/calc_rewards";
import OutOfCreditsPopUp from "../../components/common/modal";

let animationsArrayWithText = [
  {
    price: 15000,
    pays: "5,000",
    animation: GoldNodeAnimation,
  },
  {
    price: 35000,
    pays: "10,000",
    animation: RedNodeAnimation,
  },
  {
    price: 60000,
    pays: " 20,000",
    animation: GreenNodeAnimation,
  },
  {
    price: 100000,
    pays: "50,000",
    animation: BlueNodeAnimation,
  },
  {
    price: 250000,
    pays: "100,000",
    animation: IridescenceNodeAnimation,
  },
];

const Reward = ({ totalPoints }: { totalPoints: string }) => {
  let carouselItems = [];
  const [currentItem, setCurrentItem] = useState(0);

  //array of 3 items
  carouselItems = Array.from({ length: 3 }).fill("");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1860 },
      items: 1,
    },
    largeDesktop: {
      breakpoint: { max: 1860, min: 1600 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1380 },
      items: 1,
    },
    smallDesktop: {
      breakpoint: { max: 1380, min: 1204 },
      items: 1,
    },
    largeTablet: {
      breakpoint: { max: 1204, min: 1070 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1070, min: 1000 },
      items: 1,
    },
    smallTablet: {
      breakpoint: { max: 1000, min: 700 },
      items: 1,
    },
    largeMobile: {
      breakpoint: { max: 700, min: 500 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 500, min: 350 },
      items: 1,
    },
    smallMobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  };

  const { publicKey } = useWallet();
  const wallet = useWallet()
  interface RewardType {
    [key: number]: number;
  }

  const [reward, setReward] = useState<any>();
  const [tierDetails, setTierDetails] = useState<any>([])
  // const [userTiers, setUserTiers] = useState<Number[]>([]);

  useEffect(() => {
    if (publicKey && wallet) {
      (async () => {
        if(totalPoints){
          setReward(totalPoints)
        }else{
        const connection = new Connection(SOLANA_RPC);
        const tiersRewards = await calculateReward(connection, publicKey);
        // console.log("here reward", tiersRewards);
        // const tiers = Object.keys(tiersRewards).map((key) => Number(key))
        // setUserTiers(tiers)
        let program = new anchor.Program(tarsIdlStaking as anchor.Idl, {
          connection,
        }) as unknown as anchor.Program<TarsStakingNftProgram>;
        
        const tierDetail: any = await getTiersDetails(8, program)
        setTierDetails(tierDetail)

        console.log('tierDetails', tierDetail)
       
        tierDetail.length > 0 && tierDetail.map((tier: any) => {
          console.log('tier aaa', tier)
        })

        const tiers = Object.keys(tierDetail).map((key) => Number(key))
        console.log('tiers aaa', tiers)

        const tiersB = Object.values(tierDetail).map((key: any) => key.pointsCost.toString())
        console.log('tiers bbb', tiersB)

        tiersB.map((tier: any) => {
          const normal = normalizeAmount(tier)
          console.log('normal amount', normal)
        })

        console.log('xyz', normalizeAmount(tiersB[0]))

        const stakingReward = await dummy(wallet)
        console.log('staking reward', stakingReward)

        // let totalPoints = await getUserTotalPointsAtCurrentTime(wallet.publicKey);
        // console.log('total points', totalPoints)
        setReward(stakingReward);
      }
      })();
    }
  }, [publicKey]);

  const [claimRes, setClaimRes] = useState('')

  const handlePopUp = () => {
    setClaimRes('');
  };


  const handleClaimNft = async () => {

    const res = await claimNFT(wallet, currentItem + 1)
      setClaimRes(res)
  }

  const [carouselFix, setCarouselFix] = useState(false)

  return (
    <Box
      sx={{
        background: "transparent",
        my: "10px",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Carousel
          responsive={responsive}
          autoPlay={false}
          infinite={true}
          ssr={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          arrows={true}
        
          afterChange={(previousSlide, state) => {
            setCarouselFix(false)    
            if(state.currentSlide == 7) {
              setCurrentItem(0)
            } else if (state.currentSlide == 1) {
              setCurrentItem(4)
            } else if (state.currentSlide == 0) {
              setCurrentItem(0)
              setCarouselFix(true)
            }
            else setCurrentItem(state.currentSlide - 2)
          }}
        >
          {console.log('idhar ', animationsArrayWithText.length)}
          {animationsArrayWithText.map((animation, index) => (
            <Box key={index}>
              <RenderCard 
              animation={animation} index={carouselFix ? 0 : index} />
            </Box>
          ))}
        </Carousel>
      </Box>

          {claimRes && (
            <OutOfCreditsPopUp handlePopUp={handlePopUp} stakeRes={claimRes} name={'Redeem'} />
          )}

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          fontSize={"16px"}
          fontWeight={500}
          lineHeight={"21px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 1)"
          mb={1}
        >
          Price:{" "}
          <span
            style={{
              color: "rgba(134, 60, 255, 1)",
              fontFamily: "Avenir",
              fontWeight: 900,
            }}
          >
            {animationsArrayWithText[currentItem]?.price.toLocaleString()}
            {"  "}
          </span>{" "}
          POINTS
        </Typography>
        <Typography
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"21px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 0.7))"
          mb={2}
        >
          Your Reward Balance:{" "}
          <span
            style={{
              color: "rgba(134, 60, 255, 1)",
              fontFamily: "Avenir",
              fontWeight: 900,
            }}
          >
            {/* {totalPoints ? Number(totalPoints).toFixed(2) : "0"} */}
            {/* new logic */}
            {/* {reward && reward.toLocaleString('en', { minimumFractionDigits: 3 }) || '0'} */}
            {reward ? Number(reward).toFixed(3) : '0'}
          </span>
        </Typography>

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
            height: "50px",
            width: "fit-content",

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
          onClick={() => handleClaimNft()}
   
          // uncomment this disabled logic
          disabled={reward ? reward < animationsArrayWithText[currentItem].price : true}

          // parseInt(totalPoints) <
          // parseInt(animationsArrayWithText[currentItem].price)
        >
          <Typography
            fontSize={"18px"}
            fontWeight={500}
            lineHeight={"24px"}
            fontFamily={"Avenir"}
            color="rgba(255, 255, 255, 1)"
          >
            Redeem for {new Intl.NumberFormat().format(animationsArrayWithText[currentItem].price) }
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

const RenderCard = ({ tierDetails, animation, index }: any) => {
  const isDown1000 = useMediaQuery("(max-width:1000px)");
  const isDown600 = useMediaQuery("(max-width:600px)");
  // console.log('aaaaa', tierDetails)
  // const { name } = tierDetails;
  return (
    <Box
      sx={{
        background: "transparent",
        position: "relative",
        width: isDown1000 ? "90%" : "90%",
        height: isDown1000 ? "180px" : "184px",

        margin: "0 auto",
        border: "1px solid rgba(134, 60, 255, 0.2)",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          height: "100%",

          width: "100%",
          position: "absolute",
          top: 0,
          left: isDown600 ? -65 : -100,
        }}
      >
        <video
          loop
          muted
          playsInline
          autoPlay
          style={{
            height: "100%",
            width: isDown600 ? "75%" : "100%",
          }}
        >
          <source src={animation.animation} type="video/quicktime" />
          <source src={animation.animation} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Box
        sx={{
          //  position: "absolute",
          height: "100%",
          // width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          right: isDown600 ? 40 : 60,
          position: "absolute",
        }}
      >
        <Typography
          fontSize={isDown600 ? "16px" : "20px"}
          fontWeight={500}
          lineHeight={"21px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 1)"
          textAlign={"center"}
          mb={1}
        >
          TIER {index + 1}
          {/* {name} */}
        </Typography>
        <Typography
          fontSize={isDown600 ? "12px" : "16px"}
          fontWeight={500}
          lineHeight={"21px"}
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
            {animation.pays}{" "}
          </span>
          $TAI/year
        </Typography>
      </Box>
    </Box>
  );
};

export default Reward;
