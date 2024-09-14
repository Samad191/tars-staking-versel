import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LogoSvg, TarsLogoTextWhite } from "../../assets";
import Image from "../../components/common/Image";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  getTotalStaked,
  getUserStaked,
  stake,
  unstake,
  dummy,
  restake,
  getNftTierAccounts,
  getUserNftTrackerAccount,
  claimNFT,
} from "../../contract"; //commented out as it was throwing error unable to find getTotalStaked in contract.ts
import { SOLANA_RPC } from "../../utils";
import { getUserTotalPointsAtCurrentTime } from "../../contract/calc_rewards";
import OutOfCreditsPopUp from "../../components/common/modal";
import InfoIcon from "@mui/icons-material/Info";

function roundDownIfDecimal(num: number) {
  // if(num < 1) {
  //   return 1;
  // }
  if (num % 1 !== 0) {
    return Math.floor(num); 
  }

  return num;
}
 
const Stake = ({
  // connection,
  provider,
  tarsTokenBalance,
  contractLockingPeriod,
  firstTimeStaked,
  stakeStartTimeStamp,
  updateBalance,
  connection
}: {
  // connection: any,
  provider: any,
  tarsTokenBalance: number;
  contractLockingPeriod: string | null;
  firstTimeStaked: boolean;
  stakeStartTimeStamp: string;
  updateBalance: () => void;
  connection: any
}) => {
  const [stakeInput, setStakeInput] = useState<string>("0");
  const [stakeRes, setStakeRes] = useState<string>("");
  const [unlockedDurations, setUnlockedDurations] = useState<number[]>([
    30, 180, 365,
  ]);
 
  const [lockingPeriod, setLockingPeriod] = useState<string>(
    contractLockingPeriod || "30"
  );
  const [contractLockPeriod, setContractLockPeriod] = useState('0');

  const { publicKey, connected } = useWallet();
  console.log('2 xord event', publicKey?.toBase58())

  const wallet = useWallet();

  console.log('connected', connected)

  console.log('aaaaa', stakeInput, tarsTokenBalance, Number(stakeInput) > Number(tarsTokenBalance))


  function getDifferenceInDays(timestamp1: any, timestamp2: any) {
    // Convert Unix timestamps to Date objects
    const date1 = new Date(timestamp1 * 1000);
    const date2 = new Date(timestamp2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(Number(date2) - Number(date1));

    // Convert milliseconds to days
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const differenceInDays = differenceInMilliseconds / millisecondsInADay;
    console.log('differenceInDays', differenceInDays)

    return differenceInDays;
}

  const getStakeLockedDurations = async () => {
    console.log('locking values update kro')
    let userStakeInfo = await getUserStaked(provider, wallet);
    console.log('new use eff', userStakeInfo, userStakeInfo?.lockinPeriod.toString())
    if (userStakeInfo?.lockinPeriod) {
      if (Number(userStakeInfo?.lockinPeriod) <= 30) {
        console.log("idhar 30, 150 and 180");
        setUnlockedDurations([30, 180, 365]);
        setLockingPeriod('30')
      } else if (
        Number(userStakeInfo?.lockinPeriod) <= 180
        // && Number(contractLockingPeriod) > 150
      ) {
        console.log("idhar 180 and 365");
        setUnlockedDurations([180, 365]);
        setLockingPeriod('180')
      } else if (
        Number(userStakeInfo?.lockinPeriod) <= 365
        // && Number(contractLockingPeriod) > 180
      ) {
        console.log("idhar 365");
        setUnlockedDurations([365]);
        setLockingPeriod('365')
      }
      // lockinPeriod is 35 then make it 30
      // if (userStakeInfo.lockinPeriod === 35) {
      //   setContractLockPeriod("30");
      // } else setContractLockPeriod(userStakeInfo.lockinPeriod.toString());
    }
    else if(!userStakeInfo) {
      setUnlockedDurations([30, 180, 365]);
      setLockingPeriod('30')
    }
  }

  console.log('1stake component running')


  useEffect(() => {
    console.log("idhar use effect", publicKey?.toBase58(), contractLockingPeriod);

    (async () => {
      if(connected) {
        await getStakeLockedDurations()
      }
      if(!connected) {
        setUnlockedDurations([30, 180, 365]);
      setLockingPeriod('30')
      }
     }) ()
  }, [publicKey, connected]);

  const opts = {
    preflightCommitment: "processed",
  } as any;

  // const connection = {}

  // const connection = new Connection(
  //   "https://mainnet.helius-rpc.com/?api-key=571874a6-e07b-4be4-8296-e7329c31cc66",
  //   opts.preflightCommitment
  // );
  // const connection = new Connection(SOLANA_RPC, opts.preflightCommitment);

  // console.log("connection", connection);

  const handlePopUp = () => {
    setStakeRes("");
  };

  console.log(
    "tarsTokenBalance",
    Number(tarsTokenBalance) < Number(stakeInput)
  );

  const onStake = async () => {
    // console.clear()
    try {
      if (
        !wallet ||
        !wallet.publicKey ||
        !connection ||
        !stakeInput ||
        !lockingPeriod
      )
        return;

      console.log('drox hi')

   
      // console.log('drox stake input', stakeInput)
      // if(Number(stakeInprestakeut) < 3000) {
      //   console.log('drox return')
      //   return false;
      // }

      //getUserNftTrackerAccount(wallet);
      // getNftTierAccounts(wallet);

      // claimNFT(wallet, 1);

      // stake(wallet, connection, stakeInput, lockingPeriod);
      // console.log('first time stake', firstTimeStaked)
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
      // console.log('drox current time stamp in seconds', currentTimestampInSeconds);

      // contractLockingPeriod console
      // userStakeInfo console
      let restakeLockingTime: number = 0;
      const contractLockingPeriodInSeconds =
        Number(contractLockingPeriod) * 86400;
      // console.log('drox contract locking period in days', contractLockingPeriodInSeconds / 86400)

      // console.log('drox stakeStartTimeStamp', stakeStartTimeStamp)

      let timePassedInSeconds =
        currentTimestampInSeconds - Number(stakeStartTimeStamp);
      // console.log('drox time passed in seconds', timePassedInSeconds)

      // if (timePassedInSeconds > contractLockingPeriodInSeconds) {
      //   // console.log('drox first if')
      //   timePassedInSeconds = contractLockingPeriodInSeconds;
      // }

      console.log('hi')

      const remainingTimeInSeconds =
        Number(contractLockingPeriodInSeconds) - timePassedInSeconds;
      console.log("drox remaining time in seconds", remainingTimeInSeconds);
      console.log(
        "drox remaining time in days",
        remainingTimeInSeconds / 86400
      );

      const remainingTimeInDays = remainingTimeInSeconds / 86400;
      const newLockingPeriod = Number(lockingPeriod) - remainingTimeInDays;



      // newLockingPeriod = lockingPeriod - remainingTimeInDays 

      console.log('locking period', lockingPeriod)
      
      console.log('drox newLockingPeriod', newLockingPeriod)

      if (remainingTimeInSeconds < 30 * 86400) {
        // console.log('drox locking period previous', Number(lockingPeriod), remainingTimeInSeconds / 86400)
        restakeLockingTime =
          Number(lockingPeriod) - remainingTimeInSeconds / 86400;
        // console.log('drox second if')
        // console.log('drox restakeLockingTime', restakeLockingTime)
      } else {
        // console.log('drox in else')
        restakeLockingTime = Number(lockingPeriod);

        // const res = await stake(wallet, connection, stakeInput, lockingPeriod);
        // console.log('hiiii res', res)
      }
      // console.clear();

      if (firstTimeStaked) {
        console.log('drox stake')
        const res = await stake(provider, wallet, connection, stakeInput, lockingPeriod);
        console.log("drox res", res);

        setStakeRes(res);
      } else {

        // logic with mavia and kumail
        let newLogicLockingPeriod = 0;
        let userStakeInfo = await getUserStaked(provider, wallet);
        let passedTime = 0;
     
        if(userStakeInfo && userStakeInfo.lockinPeriod) {

        // let's ay ne 180 days k lye stake kya
        // 160 din guzar ge wo dubara stake kr rha
        // 180 din k lye
        // 20 - 180 X
        // 180 - 20 = 160
        // 160 + 20 = 180  contract

        // 12 months k case mai
        // if 1 month passed so we send 11 // 12
        // if 11 months passed we send 1
        // totalTime 12 - passedTIme - 1 = 11 months if only 1 month passed

        // one edge 0.83 to usko 1
          
        console.log('test locking period', Number(userStakeInfo?.lockinPeriod) / 86400)
        console.log('test stake start', userStakeInfo.stakingStartTimestamp.toString())
          passedTime = getDifferenceInDays(userStakeInfo?.stakingStartTimestamp.toString(), Date.now())
          console.log('test 180 days', passedTime)
          // const newLogicLockingPeriod = userStakeInfo?.lockinPeriod - passedTime;
          // console.log('test difference res', newLogicLockingPeriod)
        }

        if(Number(userStakeInfo?.lockinPeriod) < (Number(lockingPeriod))) {
        console.log('test values', { lockingPeriod, lock: userStakeInfo?.lockinPeriod })
          console.log('test 1yr diff', Number(lockingPeriod) - Number(userStakeInfo?.lockinPeriod)   )
          passedTime = Number(lockingPeriod) - Number(userStakeInfo?.lockinPeriod) ;
         }

         const thisValue = roundDownIfDecimal(passedTime)
         console.log('test this values passed to contract', thisValue)

        // userStakeInfo?.stakingStartTimestamp is the start timestamp we getting from contract
        // Date.now is the current timestamp
        // getDifferenceInDays is the function to get difference in days between two timestamps
        // newLogicLockingPeriod is the value we sending to contract
    

        
        console.log("drox restake", roundDownIfDecimal(newLogicLockingPeriod));
        const res = await restake(
          provider,
          wallet,
          connection,
          stakeInput,
          // restakeLockingTime
          // roundDownIfDecimal(newLockingPeriod)
          roundDownIfDecimal(passedTime)
        );
        console.log("drox res", res);
        setStakeRes(res);
      }
      // console.log('update balance')


      setTimeout(async () => {
        console.log('time out running')
        // await updateBalance();
        await getStakeLockedDurations()
        setStakeInput('0')
      }, 3000)

      // getTotalStaked(wallet);
      // getUserStaked(wallet);
      // unstake(wallet, connection, 1000);
      // dummy(wallet);
      // let totalPoints = await getUserTotalPointsAtCurrentTime(wallet)
      // console.log('total points', totalPoints)
    } catch (err) {
      console.log("stake err", err);
    }
  };
  
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
          className="childBox"
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
              Stake Amount:{" "}
              <span onClick={() => console.log('click')} style={{ color: "rgba(169, 60, 255, 1)" }}>
                Min 3,000 TAI
              </span>
            </Typography>
            <Image
              src={TarsLogoTextWhite}
              alt="logo"
              sx={{
                height: "30px",
              }}
            />
          </Box>

          {stakeRes && (
            <OutOfCreditsPopUp handlePopUp={handlePopUp} stakeRes={stakeRes} name={'Stake'} />
          )}

          {/* <Snackbar
  // anchorOrigin={{ vertical, horizontal }}
  open={true}
  // onClose={handleClose}
  message="I love snacks"
  key={'top' + 'right'}
  // vertical: 'top', horizontal: 'right
/> */}
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
              value={stakeInput}
              defaultValue={""}
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
                  setStakeInput("0");
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
                    setStakeInput(input);
                  }
                } else {
                  console.log("kar else");
                }
              }}
              type="text"
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
                style={{ color: "rgba(169, 60, 255, 1)", fontFamily: "Avenir" }}
              >
                {tarsTokenBalance.toLocaleString("en")} TAI
              </span>
            </Typography>
            <PurpleButton
              text="Max"
              onClick={() => {
                setStakeInput(tarsTokenBalance.toString());
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"21px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 1)"
          mb={2}
          textAlign={"center"}
        >
          Staking TAI for longer gives higher reward multipliers
        </Typography>

        <Box 
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

          }}
        mb={2}>
          <PurpleButton
            text="30 D"
            mr={2}
            selected={lockingPeriod === "30"}
            onClick={() => {
              setLockingPeriod("30");
            }}
            disabled={unlockedDurations.indexOf(30) === -1}
            // disabled={Number(contractLockingPeriod) >= 30 ? true : false}
          />
          <PurpleButton
            text="180 D"
            mr={2}
            selected={lockingPeriod === "180"}
            onClick={() => {
              setLockingPeriod("180");
            }}
            disabled={unlockedDurations.indexOf(180) === -1}
            // disabled={Number(contractLockingPeriod) >= 180 ? true : false}
            // disabled={true}
          />
          <PurpleButton
            text="1 Y"
            selected={lockingPeriod === "365"}
            onClick={() => {
              setLockingPeriod("365");
            }}
            disabled={unlockedDurations.indexOf(365) === -1}
            // disabled={Number(contractLockingPeriod) > 365 ? true : false}
          />
          <Tooltip
            title={
              "Selecting a lock period will affect all your staking positions"
            }
            placement="top"
            enterTouchDelay={0}
          >
            <InfoIcon
              fontSize="small"
              sx={{
                marginLeft: '10px'
              }}
            />
          </Tooltip>
        </Box>
        <Typography
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"21px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 0.7)"
          mb={2}
        >
          Your Reward Multiplier:{" "}
          <span
            style={{
              color: "rgba(134, 60, 255, 1)",
              fontWeight: 900,
              fontFamily: "Avenir",
            }}
          >
            {lockingPeriod === "30"
              ? "1x"
              : lockingPeriod === "180"
              ? "2x"
              : "4x"}
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
          onClick={onStake}
          disabled={
            !publicKey ||
            Number(stakeInput) > Number(tarsTokenBalance) ? true :
            firstTimeStaked
              ? Number(stakeInput) < 3000
              : Number(stakeInput) < 1
          }
        >
          <Typography
            fontSize={Number(stakeInput) > Number(tarsTokenBalance) ? "12px" : "18px"}
            fontWeight={500}
            lineHeight={"24px"}
            fontFamily={"Avenir"}
            color="rgba(255, 255, 255, 1)"
          >
          {Number(stakeInput) > Number(tarsTokenBalance) ? 'Insufficient balance' : 'Stake'}  
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
const PurpleButton = ({
  text,
  mr,
  onClick,
  selected,
  disabled,
}: {
  text: string;
  mr?: string | number;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Button
      sx={{
        backgroundColor: disabled
          ? "rgb(51, 51, 51)"
          : "rgba(134, 60, 255, 0.15)",

        opacity: disabled ? 0.5 : 1,
        border: selected ? "1px solid rgba(134, 60, 255, 1)" : "none",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(134, 60, 255, 0.3)",
        },
        mr: mr || "0px",
        borderRadius: "10px",
      }}
      onClick={disabled ? () => {} : onClick}
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
export default Stake;
