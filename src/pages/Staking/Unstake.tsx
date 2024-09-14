import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React, { useEffect, useState } from "react";
import { LogoSvg, TarsLogoTextWhite } from "../../assets";
import Image from "../../components/common/Image";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUserStaked, unstake } from "../../contract";
import { SOLANA_RPC } from "../../utils";
import { Connection } from "@solana/web3.js";

const Unstake = ({
  provider,
  connection,
  lockingPeriod,
  firstTimeStaked,
  stakedAmount,
  stakeStartTimeStamp
}: {
  provider: any,
  connection: any,
  lockingPeriod: string | null;
  firstTimeStaked: boolean;
  stakedAmount: string;
  stakeStartTimeStamp: any
}) => {
  const { publicKey } = useWallet();
  const wallet = useWallet();
  console.log('unstake comp', publicKey?.toBase58())

  const [unstakeInput, setUnstakeInput] = useState<string | number>(0);
  const [isRemainingAmountEnough, setIsRemainingAmountEnough] = useState<boolean>(true);
  const [startStakeTime, setStakeStartTime] = useState("")
  console.log('unstake component props', stakedAmount, lockingPeriod)

  useEffect(() => {
    console.log('changed public key', publicKey?.toBase58())
  }, [publicKey])

  const opts = {
    preflightCommitment: "processed",
  } as any;

  // const connection = new Connection(SOLANA_RPC, opts.preflightCommitment);


  // account change listener here 
  useEffect(() => {
    
    (async ()=>{
    if (wallet) {
      let userStakeInfo = await getUserStaked(provider, wallet);
      console.log("userStakeInfo", userStakeInfo);
      console.log('userStakeInfo time', userStakeInfo?.stakingStartTimestamp.toString())


      if(userStakeInfo?.stakingStartTimestamp){
        setStakeStartTime(userStakeInfo?.stakingStartTimestamp.toString())
      }

      if (userStakeInfo?.stakeAmount) {
        // setStakedAmount((userStakeInfo.stakeAmount / 10 ** 9).toString());
      }
    }
  })()
  }, [publicKey, wallet])
  // console.log('idhar check', firstTimeStaked)

  console.log("all props", {
    lockingPeriod,
    startStakeTime,
    firstTimeStaked,
    stakedAmount,
    stakeStartTimeStamp,
    currentTime: Date.now()/1000,
    startStakeDays: Math.floor(Number(stakeStartTimeStamp)/(24*3600)),
    difference : (Date.now()/1000) - Number(stakeStartTimeStamp),
    days:  Math.floor(((Date.now()/1000) - Number(stakeStartTimeStamp))/(24*3600))
  })
console.log("isRemaining", isRemainingAmountEnough)

console.log("all conds", ((Math.floor(((Date.now()/1000) - Number(stakeStartTimeStamp))/(24*3600)) > Number(lockingPeriod))), !isRemainingAmountEnough, Number(unstakeInput) > Number(stakedAmount))
console.log("all conds2", Math.floor(((Date.now()/1000) - Number(stakeStartTimeStamp))/(24*3600)),  Number(lockingPeriod))

  return (
    <Box
      sx={{
        background: "transparent",
        my: "10px",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(134, 60, 255, 0.2)",
          position: "relative",
          width: "100%",
          height: "150px",
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
              Unstake Amount
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
              // placeholder="Enter Stake Amount"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              value={unstakeInput}
              defaultValue={0}
              onChange={(e) => {
                console.log("kar length", e.target.value.length);

                let input = e.target.value;

                console.log("kar input", input);

                const regex = /^0+(?!$)/;
                input = input.replace(regex, "");

                console.log('input', input)

                var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
                const formatRes = format.test(input)
                console.log('format res', formatRes)

                if(formatRes) {return}

                if (input.length == 0) {
                  setUnstakeInput("0");
                }

                if (input && input[input.length - 1].match("[0-9.]")) {
                  const splittedArray = input.split(".");
                  console.log("kar splittedArray", splittedArray);
                  if (
                    splittedArray.length > 2 ||
                    (splittedArray[1] && splittedArray[1].length > 6)
                  ) {
                    console.log("kar multiple decimals");
                  } else {
                    setUnstakeInput(input);
                    
                    
                    if(Number(input) > Number(stakedAmount)){
                      setIsRemainingAmountEnough(true)
                    }else if(Number(stakedAmount) === Number(input)){
                      setIsRemainingAmountEnough(true)
                    }else if(Number(stakedAmount) - Number(input) >= 3000){
                      setIsRemainingAmountEnough(true)
                    } else{
                      setIsRemainingAmountEnough(false)
                    }
                  }
                } else {
                  console.log("kar else");
                }
              }}
              // onChange={(e) => setUnstakeInput(e.target.value)}
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
              Staked:{" "}
              <span
                style={{ color: "rgba(169, 60, 255, 1)", fontFamily: "Avenir" }}
              >
                {Number(stakedAmount).toLocaleString("en")} TAI
              </span>
            </Typography>

            <PurpleButton
              text="Max"
              onClick={() => {
                setUnstakeInput(stakedAmount.toString());
                setIsRemainingAmountEnough(true)
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: "0px 24px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <Typography
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"21px"}
            fontFamily={"Avenir"}
            color="rgba(255, 255, 255, 0.7)"
          >
            Remaining Locked Period
          </Typography>
          <Typography
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"21px"}
            fontFamily={"Avenir"}
            color="rgba(235, 235, 222, 1)"
          >
            {/* {lockingPeriod + " days"} */}
            {firstTimeStaked ? "N/A" :  Math.floor(((Date.now()/1000) - Number(stakeStartTimeStamp))/(24*3600)) >  Number(lockingPeriod) ? "0" : Number(lockingPeriod) - Math.floor(((Date.now()/1000) - Number(stakeStartTimeStamp))/(24*3600)) + " days"}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "0px 24px",
            marginBottom: "16px",
          }}
        >
          <Typography
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"21px"}
            fontFamily={"Avenir"}
            color="rgba(255, 255, 255, 0.7)"
            textAlign="center"
            mb={4}
          >
            A 5% fee on your staked amount is applied when unstaking tokens.
          </Typography>
          <Typography
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"21px"}
            fontFamily={"Avenir"}
            color="rgba(255, 255, 255, 0.7)"
            mb={2}
            textAlign="center"
          >
            Your Reward Multiplier:{" "}
            <span
              style={{
                color: "rgba(134, 60, 255, 1)",
                fontWeight: 900,
                fontFamily: "Avenir",
              }}
            >
              {lockingPeriod && Number(lockingPeriod) >= 30 && Number(lockingPeriod) < 180 ? '1x' : Number(lockingPeriod) >= 180 && Number(lockingPeriod) < 365 ? '2x' : Number(lockingPeriod) >= 365 ? '4x' : 'N/A'}
              {/* {firstTimeStaked
                ? "N/A"
                : lockingPeriod === "30"
                ? "1x"
                : lockingPeriod === "180"
                ? "2x"
                : "3x"} */}
            </span>
          </Typography>
        </Box>
        <Tooltip
            title={
              isRemainingAmountEnough ? "" : "Maintain 3000 TAI staked, or use Max Unstake."
            }
            placement="top"
            enterTouchDelay={0}
          >
            <span>
            {/* <InfoIcon
              fontSize="small"
              sx={{
                marginLeft: '10px'
              }}
            /> */}
            
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
            width: "180px",

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
          onClick={async () => {
            await unstake(provider, wallet, connection, unstakeInput)
          }}

          disabled={
            ((Math.floor(((Date.now()/1000) - Number(stakeStartTimeStamp))/(24*3600)) < Number(lockingPeriod))) ? true : 
            !isRemainingAmountEnough ? true :
            Number(unstakeInput) > Number(stakedAmount)
          }
        >
          <Typography
            fontSize={Number(unstakeInput) > Number(stakedAmount) ? "9px" : "18px"}
            fontWeight={500}
            lineHeight={"24px"}
            fontFamily={"Avenir"}
            color="rgba(255, 255, 255, 1)"
          >
            {Number(unstakeInput) > Number(stakedAmount) ? 'Insufficient staked amount' : 'Unstake'}
          </Typography>
        </Button>
        </span>
        </Tooltip>
        
      </Box>
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
export default Unstake;
