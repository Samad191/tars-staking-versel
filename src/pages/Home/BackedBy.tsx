import { Box, Typography, useMediaQuery } from '@mui/material'
import { Abstract, AbstractMobile, ColoredSolana } from '../../assets'

const BackedBy = () => {
  const isDown700 = useMediaQuery('(max-width:700px)')
  const isDown1000 = useMediaQuery('(max-width:1000px)')

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        width: isDown700 ? '100%' : 'calc(100% + 10px)',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={isDown700 ? AbstractMobile : Abstract}
        alt='Abstract'
        style={{
          width: '100%',
          height: '100%',
          clipPath: isDown700 ? 'none' : 'inset(0 4px 0 4px)',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDown700 ? 'column' : 'row',
          alignItems: isDown700 ? 'left' : 'center',
          position: 'absolute',
          justifyContent: 'space-between',
          width: '100%',
          px: '5%',
          py: '20px',
          gap: '33px',
        }}
      >
        <Typography
          sx={{
            color: '#031F18',
            fontSize: isDown700 ? '24px' : isDown1000 ? '32px' : '48px',
            fontWeight: 700,
            fontFamily: 'Inter',
            lineHeight: isDown700 ? '24px' : isDown1000 ? '32px' : '46px',
            flex: 1,
            flexShrink: 1,
          }}
        >
          {/* First AI Project <br /> */}
          {/* <span
            style={{
              background:
                'linear-gradient(89.58deg, #9845FE 0.16%, #47CEFF 43.3%, #03FFE1 67.91%, #03FFB3 99.98%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', 
              // fontWeight: 600,
              // fontSize: isDown700 ? '14px' : isDown1000 ? '24px' : '34px',
              // lineHeight: isDown700 ? '20px' : isDown1000 ? '32px' : '46px',
          //   }}
          // >*/}
          Backed by
          {/* </span> */}
        </Typography>
        <img
          src={ColoredSolana}
          alt='Solana'
          style={{
            height: isDown700 ? '39px' : '115px',
            maxWidth: isDown700 ? '242px' : '50%',
            objectFit: 'contain',
            width: isDown700 ? '242px' : '706px',
            flex: 1,
            flexShrink: 1,
          }}
        />
      </Box>
    </Box>
  )
}

export default BackedBy
