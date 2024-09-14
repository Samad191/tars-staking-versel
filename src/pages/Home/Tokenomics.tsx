import { Box, Typography, useMediaQuery } from '@mui/material'
import { DottedWavesGreen, RingOne } from '../../assets'

const Tokenomics = () => {
  const isDown1200 = useMediaQuery('(max-width:1200px)')
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
        marginBottom: '150px',
        background: '#1C352F',
        position: 'relative',
        width: '100%',
        height: '730px',
        clipPath:
          'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 calc(100% - 4rem))',
        // marginTop: '150px',
        '& >.childBox': {
          clipPath:
            'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 calc(100% - 4rem))',
          background: '#000C01',
          width: 'calc(100% - 1.5px)',
          height: 'calc(100% - 1.5px)',
          position: 'absolute',
          left: '1px',
          top: '1px',
          backgroundImage: `url(${DottedWavesGreen})`,
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'inherit',
          backgroundSize: 'contain',
        },
      }}
      id='tokenomics'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4px',
          padding: '12px 5%',
          width: '100%',
        }}
        className='childBox'
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '5%',
          }}
        >
          <Box
            sx={{
              background:
                'linear-gradient(312.93deg, #12FDA0 0%, rgba(18, 253, 160, 0.35) 20%, rgba(18, 253, 160, 0.35) 80%, #12FDA0 100%)',
              position: 'relative',
              maxWidth: '420px',
              width: 'min-content',
              height: '290px',
              maxHeight: 'auto',
              clipPath:
                'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 100%)',
              flex: 1,
              '& > .childCard': {
                clipPath:
                  'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 100%)',
                background: '#011809',
                width: 'calc(100% - 2px)',
                height: 'calc(100% - 2px)',
                position: 'relative',
                left: '1px',
                top: '1px',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: isDown1200 ? '30px 30px' : '44px 50px',
              }}
              className='childCard'
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: isDown1200 ? '24px' : '48px',
                  lineHeight: isDown1200 ? '29px' : '58px',
                  paddingBottom: '24px',
                }}
              >
                Tokenomics
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: isDown1200 ? '18px' : '20px',
                  lineHeight: isDown1200 ? '18px' : '27px',
                }}
              >
                The TARS ecosystem is backed and powered by the $TAI token. Gain
                TARS GPU, access to premium AI tools, and more!
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
            }}
          >
            <img
              src={RingOne}
              alt='RingOne'
              style={{ width: '257px', height: '300px' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            {tokenomics.map((item, index) => (
              <Typography
                key={index}
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '24px',
                  color: '#ffffff',
                  paddingTop: '24px',
                  borderBottom:
                    index === tokenomics.length - 1
                      ? 'none'
                      : '1px solid #EBEBDE',
                  paddingBottom: '34px',
                  textAlign: 'right',
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Tokenomics
