import { Box, Typography, useMediaQuery } from '@mui/material'
import { GreenSpinner, GreenBar, BlueBar } from '../../assets'
import {
  rowOne,
  rowTwo,
  rowThree,
  rowFour,
  rowFive,
  rowSix,
  rowSeven,
  keypoints,
  row,
} from './GPU'

const GPUMobile = () => {
  const isDown440px = useMediaQuery('(max-width:440px)')
  const isDown360px = useMediaQuery('(max-width:360px)')
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '40px',
        marginBottom: '30px',
        position: 'relative',
        backgroundColor: '#000C01',
      }}
      id='gpu'
    >
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '29px',
          color: '#ffffff',
          textAlign: 'left',
          paddingX: '16px',
        }}
      >
        TARS GPU Faster Cheaper
        {/* <span
          style={{
            color: '#000000',
            textShadow:
              '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0  #fff',
          }}
        >
          FASTER CHEAPER
        </span> */}
      </Typography>
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontFamily: 'Inter',
          fontWeight: 400,
          lineHeight: '20px',
          paddingBottom: '30px',
          paddingX: '16px',
          paddingTop: '10px',
        }}
      >
        Industry Breaking Prices
      </Typography>
      {keypoints.map((keypoint, index) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: '14px',
            pb: '21.5px',
            borderBottom:
              index === keypoints.length - 1
                ? 'none'
                : '1px solid rgba(40, 40, 43, 1)',
            paddingX: '16px',
            gap: '12px',
          }}
        >
          <img
            src={GreenSpinner}
            alt='GreenSpinner'
            style={{
              height: '17.7px',
              width: '16px',
            }}
          />
          <Box key={index} display='flex' flexDirection='column' gap={'4px'}>
            <Typography
              sx={{
                color: '#ffffff',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '14.5px',
              }}
            >
              {keypoint.title}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Inter',
                fontWeight: 400,
                lineHeight: '15px',
                fontSize: '10px',
              }}
            >
              {keypoint.description}
            </Typography>
          </Box>
        </Box>
      ))}
      <Box display='flex'>
        {row.map((header, index) => (
          <Box
            key={index}
            borderTop={0.5}
            borderBottom={0.5}
            borderLeft={0.5}
            borderColor='rgba(40, 40, 43, 1)'
            flex={1}
            textAlign='center'
            sx={{
              height: '40px',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'FuturaBold',
              lineHeight: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {header}
          </Box>
        ))}
      </Box>
      {[rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rowSeven].map(
        (tRow, rowIndex) => (
          <Box key={rowIndex} display='flex'>
            {tRow.map((cell, cellIndex) => (
              <Box
                key={cellIndex}
                borderBottom={0.5}
                borderLeft={0.5}
                borderColor='rgba(40, 40, 43, 1)'
                flex={1}
                sx={{
                  minHeight: '45px',
                  maxHeight: '55px',
                  fontSize: '12px',
                  fontWeight: cellIndex === 0 ? 700 : 400,
                  fontFamily: cellIndex === 0 ? 'FuturaBold' : 'Inter',
                  lineHeight: cellIndex === 0 ? '20px' : '14px',
                  color: cellIndex === 0 ? '#ffffff' : 'rgba(18, 253, 160, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  p: '4px',
                }}
              >
                {cell}
              </Box>
            ))}
          </Box>
        )
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: '210px',
          px: '20px',
          borderBottom: '0.5px solid #282828',
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            height: '0.5px',
            backgroundColor: '#282828',
            zIndex: 0,
          },
          '&::before': {
            top: '50%',
          },
          '&::after': {
            top: '75%',
          },
        }}
      >
        <img
          src={GreenBar}
          alt='GreenBar'
          style={{
            maxHeight: isDown360px ? '150px' : '180px',
            height: 'auto',
            position: !isDown440px ? 'static' : 'relative',
            left: !isDown440px ? 0 : '10%',
            zIndex: 1,
          }}
        />
        <img
          src={BlueBar}
          alt='BlueBar'
          style={{
            maxHeight: isDown360px ? '90px' : '102px',
            height: 'auto',
            position: !isDown440px ? 'static' : 'relative',
            right: !isDown440px ? 0 : '10%',
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  )
}

export default GPUMobile
