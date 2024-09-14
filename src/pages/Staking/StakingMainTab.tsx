import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StakeTabs from "./StakeTabs";
import Stake from "./Stake";
import Reward from "./Reward";
import Unstake from "./Unstake";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getUserStaked,
  getUserTokenAccount,
  getUserTotalPoints,
} from "../../contract";
import { Connection } from "@solana/web3.js";
import { SOLANA_RPC } from "../../utils";
const StakingMainTab = ({ connection, 
  provider,stakingTabs, setStakingTabs }: any) => {
  // const [stakingTabs, setStakingTabs] = useState(0);
  const [lockingPeriod, setLockingPeriod] = useState<string | null>(null);
  const [tarsTokenBalance, setTarsTokenBalance] = useState<number>(0);
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const [totalPoints, setTotalPoints] = useState<string>("0");
  const [firstTimeStaked, setFirstTimeStaked] = useState<boolean>(true);
  const [stakeStartTimeStamp, setStakeStartTimeStamp] = useState<string>("0");
  const { publicKey, connected, disconnecting } = useWallet();

  console.log('1 xord event', publicKey?.toBase58(), connected)
  console.log('5stake main component running')
  const wallet = useWallet();

  const opts = {
    preflightCommitment: "processed",
  } as any;

  // const connection = new Connection(
  //   "https://mainnet.helius-rpc.com/?api-key=571874a6-e07b-4be4-8296-e7329c31cc66",
  //   opts.preflightCommitment
  // );

  // const connection = new Connection(SOLANA_RPC, opts.preflightCommitment);

  // console.log("connection", connection);

  // ijlal
  const handleStakeTabChange = (value: number) => {
    // console.log('click change tab')
    setStakingTabs(value);
  };

  // useEffect(() => {
  //   if(!connected) {
   
  //   }
  // }, [connected])

  console.log('hello test')



  // console.log("stakedAmount", stakedAmount);

  const updateBalance = async () => {
    let associatedTokenAddress = await getUserTokenAccount(
      wallet.publicKey
    );

    let tokenBalance = await connection.getTokenAccountBalance(
      associatedTokenAddress
    );
    // connection.getTokenAccountBalance(associatedTokenAddress)
    //   .then(res => {
    //     console.log('neu balance', res);
    //   })
    //   .catch(err => {
    //     console.log('neu error ',err)
    //   })
    // console.log("tokenBalance", tokenBalance.value.uiAmount);
    // alert('idhar 1')
    console.log('xord 111111')
    setTarsTokenBalance(tokenBalance.value.uiAmount || 0);

      let userStakeInfo = await getUserStaked(provider, wallet);
      console.log("userStakeInfo", userStakeInfo);
      // console.log('userStakeInfo time', userStakeInfo?.stakingStartTimestamp.toString())

      if (userStakeInfo) {
        // console.log('first time stake', false)
        setFirstTimeStaked(false);
      } else {
        // console.log('first time stake', true)
        setFirstTimeStaked(true);
      }

      if(userStakeInfo?.stakingStartTimestamp){
        setStakeStartTimeStamp(userStakeInfo.stakingStartTimestamp.toString())
      }

      if (userStakeInfo?.lockinPeriod) {
        // lockinPeriod is 35 then make it 30
        if (userStakeInfo.lockinPeriod === 35) {
          setLockingPeriod("30");
        } else setLockingPeriod(userStakeInfo.lockinPeriod.toString());
      }

      if (userStakeInfo?.totalPoints) {
        // setTotalPoints(userStakeInfo.totalPoints.toString());
      }

      if (userStakeInfo?.stakeAmount) {
        setStakedAmount((userStakeInfo.stakeAmount / 10 ** 9).toString());
      }
    
  }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log('xord listener', publicKey?.toBase58())
  //       if (publicKey && wallet && connection && connected) {
  //         // console.log("publicKey", publicKey.toBase58());
  //         // let solBalance = await connection.getBalance(publicKey);

  //         // console.log("solBalance", solBalance);

  //         let associatedTokenAddress = await getUserTokenAccount(
  //           wallet.publicKey
  //         );

  //         let tokenBalance = await connection.getTokenAccountBalance(
  //           associatedTokenAddress
  //         );
  //         console.log('neu get balance')
  //         // connection.getTokenAccountBalance(associatedTokenAddress)
  //         // .then(res => {
  //         //   console.log('neu balance', res);
  //         // })
  //         // .catch(err => {
  //         //   console.log('neu error ',err)
  //         // })
  //         // console.log("tokenBalance", tokenBalance.value.uiAmount);
  //         setTarsTokenBalance(tokenBalance.value.uiAmount || 0);
  //         console.log('xord 333333', connected)
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //       setTarsTokenBalance(0);
  //       // alert('4')
  //       console.log('xord 444444')
  //     }
  //   })();
  // }, [publicKey?.toBase58(), connected]);


  // useEffect(() => {
  //   (async () => {
  //     console.log('public key changed', publicKey?.toBase58())
  //     console.log('new console', connected, disconnecting)
  //     if(!connected) {
  //       console.log('xord 22222222')
  //       setLockingPeriod('30')
  //       setStakedAmount('0')
  //       setTarsTokenBalance(0)
  //       return;
  //     }
  //     else if (connected) {
  //       console.log('public key and wallet listener running', publicKey?.toBase58(), connected)
  //       let userStakeInfo = await getUserStaked(wallet);
  //       console.log("userStakeInfo", userStakeInfo);
  //       console.log('test start time stamp', userStakeInfo?.stakingStartTimestamp.toString())
  //       console.log('test current time stamp', Date.now())
  //       console.log('test locking period', userStakeInfo?.lockinPeriod)

  //       console.log('test minus', Date.now() - userStakeInfo?.stakingStartTimestamp.toString())


  //       // if(userStakeInfo) {
  //       //   const diff = getDifferenceInDays(userStakeInfo?.stakingStartTimestamp.toString(), Date.now())
  //       //   const res = userStakeInfo?.lockinPeriod - diff;
  //       //   console.log('test difference res', res)
  //       // }

  //       if (userStakeInfo) {
  //         // console.log('first time stake', false)
  //         setFirstTimeStaked(false);
  //       } else {
  //         // console.log('first time stake', true)
  //         setFirstTimeStaked(true);
  //       }

  //       if(userStakeInfo?.stakingStartTimestamp){
  //         setStakeStartTimeStamp(userStakeInfo.stakingStartTimestamp.toString())
  //       }

  //       if (userStakeInfo?.lockinPeriod) {
  //         // lockinPeriod is 35 then make it 30
  //         if (userStakeInfo.lockinPeriod === 35) {
  //           setLockingPeriod("30");
  //         } else setLockingPeriod(userStakeInfo.lockinPeriod.toString());
  //       }

  //       if (userStakeInfo?.totalPoints) {
  //         // setTotalPoints(userStakeInfo.totalPoints.toString());
  //       }

  //       if (userStakeInfo?.stakeAmount) {
  //         setStakedAmount((userStakeInfo.stakeAmount / 10 ** 9).toString());
  //       }
  //       else if(!userStakeInfo) {
  //         setStakedAmount('0')
  //       }
  //     }
  //   })();
  // }, [connected, publicKey]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (publicKey && wallet && connection) {
  //         const totalPoints = await getUserTotalPoints(wallet);

  //         console.log("totalPoints", totalPoints);

  //         setTotalPoints(totalPoints.toString());
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   })();
  // }, [publicKey, wallet, connection]);

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
          { stakingTabs == 1 ? 'GPU Points' : stakingTabs == 2 ? 'Unstake TAI' : 'Stake TAI' }
        </Typography>
        <Typography
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"21px"}
          fontFamily={"Avenir"}
          color="rgba(255, 255, 255, 0.7)"
        >
        {stakingTabs == 1 ? 'Redeem your rewards' : stakingTabs == 2 ? 'Select how much TAI you want to unstake' : 'Select how much TAI you want to stake' }  
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
            padding: "7px",
            borderRadius: "34px",
            background: "linear-gradient(180deg, #000000 0%, #150925 100%)",
          }}
        >
          <StakeTabs handleTabChange={handleStakeTabChange} tab={stakingTabs} />
          {stakingTabs === 0 && (
            <Stake
              provider={provider}
              tarsTokenBalance={tarsTokenBalance}
              contractLockingPeriod={lockingPeriod}
              firstTimeStaked={firstTimeStaked}
              stakeStartTimeStamp={stakeStartTimeStamp}
              updateBalance={() => {}}
              connection={connection}
            />
          )}
          {stakingTabs === 1 && <Reward provider={provider} connection={connection} totalPoints={totalPoints} />}
          {stakingTabs === 2 && (
            <Unstake
            provider={provider}
            connection={connection}
              lockingPeriod={lockingPeriod}
              firstTimeStaked={firstTimeStaked}
              stakedAmount={stakedAmount}
              stakeStartTimeStamp={stakeStartTimeStamp}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default StakingMainTab;