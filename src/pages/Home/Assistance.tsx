import { Box, Button, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { RingTwo, AssistanceBanner } from '../../assets'

const Assistance = () => {
  const isDown1200 = useMediaQuery('(max-width:1200px)')

  const btnStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    borderRadius: '0px',
    fontSize: '20px',
    overflow: 'hidden',
    background: '#031F18',
    height: '58px',
    width: isDown1200 ? '180px' : '233px',
    minWidth: 'max-content',
    fontFamily: 'Inter',
    fontWeight: 700,
    color: '#EBEBDE',
    clipPath:
      'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 100% 100%, 20% 100%, 0% 80%, 0 0)',
    '&:hover': {
      // opacity: 0.9,
      backgroundColor: '#031F18',
    },
    '&:disabled': {
      backgroundColor: '#031F18',
    },
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '8%',
        py: '32px',
        position: 'relative',
        height: '333px',
        maxHeight: '333px',
        gap: '20px',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={AssistanceBanner}
          alt='Assistance Banner'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath:
              'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 calc(100% - 4rem))',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </Box>

      <Box
        sx={{
          flex: '60%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter',
            // color: '#ffffff',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '58px',
            // fontFamily: 'Inter',
            // fontWeight: 700,
            // fontSize: 'calc(2.5vw + 0.75rem)',
            // lineHeight: '77.4px',
            color: '#031F18',
            textAlign: 'left',
            paddingBottom: '10px',
          }}
        >
          Need Assistance?
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            color: '#031F18',
            textAlign: 'left',
            paddingBottom: isDown1200 ? '20px' : '40px',
          }}
        >
          Please don’t hesitate to contact us if you have any proposals or
          difficulties.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <Tooltip enterTouchDelay={0} title='Coming Soon'>
            <Button
              variant='contained'
              sx={{
                ...btnStyle,
              }}
            >
              AI HUB
            </Button>
          </Tooltip>
          <Tooltip enterTouchDelay={0} title='Coming Soon'>
            <Button
              variant='contained'
              sx={{
                marginLeft: '10px',
                ...btnStyle,
              }}
            >
              Tars GPU
            </Button>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          flex: '40%',
          height: '413px',
          maxHeight: '413px',
          position: 'relative',
          alignSelf: 'center',
          display: 'flex',
          width: '100%',
        }}
      >
        <img
          src={RingTwo}
          alt='Hero Banner'
          loading='lazy'
          decoding='async'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            position: 'absolute',
            overflow: 'visible',
            top: '0',
          }}
        />
      </Box>
    </Box>
  )
}

export default Assistance
