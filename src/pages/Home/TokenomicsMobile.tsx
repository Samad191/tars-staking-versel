import { Box, Typography } from '@mui/material'
import { DottedWavesGreenMobile, RingOne } from '../../assets'
import useWindowInnerWidth from '../../hooks/useWindowInnerWidth'

const TokenomicsMobile = () => {
  const windowWidth = useWindowInnerWidth()
  const tokenomics = [
    'FEATURES OF THE TOKEN',
    'TARS AI ACCESS',
    'TARS GPU',
    'AI TRAINING',
    'STAKING & FARMING',
    'ACCESS TO IDOs/Airdrops',
    'LIQUIDITY PROVIDING & VOTING',
  ]

  return (
    <Box
      sx={{
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'visible',
        mb: '34px',
      }}
      id='tokenomics'
    >
      <Box
        sx={{
          height: '0.5px',
          width: '100%',
          backgroundColor: 'rgba(40, 40, 43, 1)',
        }}
      />
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '29px',
          paddingBottom: '20px',
          paddingTop: '30px',
          px: '16px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        Tokenomics
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          px: '16px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        The TARS ecosystem is backed and powered by the $TAI token. Gain TARS
        GPU, access to premium AI tools, and more!
      </Typography>

      <Box
        component='img'
        src={RingOne}
        alt='RingOne'
        sx={{
          width: '257px',
          height: '300px',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      />

      {tokenomics.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: 'calc(100% - 32px)',
            mx: '16px',
            paddingTop: '24px',
            paddingBottom: '16px',
            borderBottom: '0.5px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '17px',
              color: '#ffffff',
              textAlign: 'right',
            }}
          >
            {item}
          </Typography>
        </Box>
      ))}

      <Box
        component='img'
        src={DottedWavesGreenMobile}
        alt='Dotted Waves Green'
        sx={{
          position: 'absolute',
          width: windowWidth,
          height: 'max-content',
          bottom: '0px',
          opacity: 0.7,
          zIndex: -1,
          objectFit: 'cover',
        }}
      />
    </Box>
  )
}

export default TokenomicsMobile
