import { Box, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import StakeTabs from './StakeTabs'
import MainTabs from './MainTabs'
import { HeroBackground, HeroBanner, HeroBannerBlack } from '../../assets'
import StakingMainTab from './StakingMainTab'
import Image from '../../components/common/Image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import GPUTab from './GPUTab'

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
        {mainTab === 0 && <StakingMainTab stakingTabs={stakingTabs} setStakingTabs={setStakingTabs} />}
        {mainTab === 1 && <GPUTab handleMainTabChange={handleGoToNft} />}
      </Box>
    </Box>
  )
}

export default Staking
