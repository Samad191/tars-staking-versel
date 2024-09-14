import { Box, Typography, useMediaQuery } from '@mui/material'
import { ForwardIcon, HeroBannerMobile, SolanaIcon } from '../../assets'

const MobileHero = () => {
  const isDown370 = useMediaQuery('(max-width:370px)')
  const isDown900 = useMediaQuery('(max-width:900px)')
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignSelf: 'center',
          maxHeight: '100vh',
          width: '100%',
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            top: '75px',
            left: 0,
            right: 0,
            height: '3px',
            background: '#12FDA0',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            background: '#011809',
          }}
        >
          <img
            src={HeroBannerMobile}
            loading='lazy'
            alt='Hero Banner'
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '70vh',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              px: '20px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '32px',
                lineHeight: 'normal',
                color: '#FFFFFF',
                textTransform: 'capitalize',
                textAlign: 'center',
              }}
            >
              The AI Economy <br /> built on Solana
              {/* <span
                style={{
                  background:
                    'linear-gradient(89.58deg, rgb(71, 206, 255) 99.3%, rgb(3, 255, 179) 99.98%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Web3
              </span>{' '}
              AI <br />
              infrastructure */}
              <br /> powered by <span style={{ color: '#03FFE1' }}>GPT-4o</span>
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                pt: '18px',
                pb: '16px',
                textAlign: 'center',
                maxWidth: isDown900 ? '80%' : '60%',
              }}
            >
              TARS is an AI-driven, scalable Web3 modular infrastructure
              platform enabling organizations and individuals to effortlessly
              transition from Web2 to Web3.
            </Typography>

            {/* <Typography
              sx={{
                background:
                  'linear-gradient(89.98deg, #9845FE 6.93%, #47CEFF 47.14%, #03FFE1 70.08%, #03FFB3 99.98%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24.2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
              onClick={() => window.open('https://calendly.com/tars-ai/demo')}
            >
              Book a Demo <img src={ForwardIcon} />
            </Typography> */}

            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(15px)',
                width: '100%',
                maxWidth: '342px',
                height: '80px',
                clipPath:
                  'polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 0.5rem), 0 0)',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                gap: '20px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
              >
                {/* First AI Project <br /> */}
                Backed By
              </Typography>

              <img
                src={SolanaIcon}
                alt='Solana Icon'
                width={isDown370 ? '120px' : '159px'}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MobileHero
