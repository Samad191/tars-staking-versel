import { Box, Button, Tooltip, Typography } from '@mui/material'
import { RingThree, RingFour } from '../../assets'

const AssistanceMobile = () => {
  const btnStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    borderRadius: '0px',
    fontSize: '16px',
    overflow: 'hidden',
    background: '#031F18',
    height: '44px',
    width: '257px',
    minWidth: 'max-content',
    fontFamily: 'Inter',
    fontWeight: 700,
    color: '#D9D9D9',
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
        background: '#D9D9D9',
        minHeight: '290px',
        height: '100%',
        width: '100%',
        overflow: 'visible',
        marginTop: '50px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          px: '5%',
          py: '40px',
          overflow: 'visible',
        }}
      >
        <img
          src={RingThree}
          alt='Ring Three'
          style={{
            position: 'absolute',
            top: '-25px',
            right: '-15px',
            width: '80px',
            height: '83px',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            minHeight: '209px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '29px',
              color: '#031F18',
              textAlign: 'center',
              paddingBottom: '10px',
            }}
          >
            Need Assistance?
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '17px',
              color: '#031F18',
              textAlign: 'center',
              paddingBottom: '24px',
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
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
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
        <img
          src={RingFour}
          alt='Ring Four'
          style={{
            position: 'absolute',
            top: 'calc(100% - 30px)',
            left: '-20px',
            width: '60px',
            height: '61px',
            zIndex: 0,
          }}
        />
      </Box>
    </Box>
  )
}

export default AssistanceMobile
