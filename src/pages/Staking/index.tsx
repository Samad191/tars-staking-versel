import { Box, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect } from 'react'
import StakeTabs from './StakeTabs'
import MainTabs from './MainTabs'
import { HeroBackground, HeroBanner, HeroBannerBlack } from '../../assets'
import StakingMainTab from './StakingMainTab'
import Image from '../../components/common/Image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import GPUTab from './GPUTab'
import { Connection } from '@solana/web3.js'
import * as anchor from "@coral-xyz/anchor";
import { SOLANA_RPC } from '../../utils'
import { useWallet } from '@solana/wallet-adapter-react'

const Staking = () => {
  const [mainTab, setMainTab] = useState(0)
  
  // ijlal main
  const handleMainTabChange = (value: number) => {
    setMainTab(value)
  }

  const [stakingTabs, setStakingTabs] = useState(0)
  console.log('3stake page')

  const handleGoToNft = (value: number, tierNo: number) => {
    console.log('tierNo', tierNo)
    setMainTab(value)
    setStakingTabs(1)
  }

  const wallet: any = useWallet()
  const { publicKey } = wallet;

  const [rootConnection, setRootConnection] = useState<Connection>();
  const [rootProvider, setRootProvider] = useState<anchor.AnchorProvider | undefined>()


  useEffect(() => {
    if(publicKey) {
      const opts = {
        preflightCommitment: "processed",
      } as any;

      const connection = new Connection(SOLANA_RPC);
      setRootConnection(connection);


      const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        opts.preflightCommitment
      );
      console.log('root', provider)
      setRootProvider(provider)
     
    }
  }, [publicKey])


  const handleStakeTabChange = (value: number) => {
    setStakingTabs(value)
  }
  const isDown767 = useMediaQuery('(max-width:767px)')

  const isDown600 = useMediaQuery('(max-width:600px)')

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        src={HeroBackground}
        alt='hero background'
        loading='lazy'
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: isDown767 ? '100vh' : 'calc(100vh - 150px)',
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          width: isDown600 ? '90%' : '500px',
          zIndex: 1,
        }}
      >
        <MainTabs handleTabChange={handleMainTabChange} tab={mainTab} />
        {mainTab === 0 && <StakingMainTab
           connection={rootConnection}
           provider={rootProvider}
        stakingTabs={stakingTabs} setStakingTabs={setStakingTabs} />}
        {mainTab === 1 && <GPUTab connection={rootConnection} handleMainTabChange={handleGoToNft} />}
      </Box>
    </Box>
  )
}

export default Staking
