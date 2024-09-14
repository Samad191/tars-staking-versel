import { Box, Typography, useMediaQuery } from '@mui/material'
import { DottedWaves, GreenSpinner, GreenBar, BlueBar } from '../../assets'

export const keypoints = [
  {
    title: 'On-demand GPU access',
    description:
      'Instant, permissionless access to a global network of GPUs and CPUs',
  },
  {
    title: 'Save up to 85% on compute costs',
    description:
      'Spend significantly less on your GPU compute compared to the major public clouds or buying your own GPUs for AI training.',
  },
  {
    title: 'Train AI within seconds',
    description:
      'Engage with the Tars AI, customize your GPUs and deploy AI Training within a matter of seconds.',
  },
  {
    title: 'Incentive Network',
    description:
      'Get bonus $TAI when you contribute to the TARS GPU ecosystem—earn incentives while training AI!',
  },
]

export const row = ['Feature', 'TARS GPU', 'AWS GPU']
export const rowOne = [
  'Ease of Access',
  'Instant, on-demand access',
  'Requires account setup, configuration',
]
export const rowTwo = ['Pricing', '$0.80 per hour', '$2.23 per hour']
export const rowThree = ['Performance', '16-32 GB Memory', '16-32 GB Memory']

export const rowFour = [
  'Flexibility',
  'Customizable GPU configurations',
  'Fixed instance types',
]
export const rowFive = ['AI Training Time', 'Minutes', 'Minutes to hours']
export const rowSix = [
  'Use Cases',
  'AI training, data processing',
  'General cloud computing, AI',
]
export const rowSeven = ['Incentives', 'Earn $TAI', 'None']

const GPU = () => {
  const isDown1440 = useMediaQuery('(max-width:1440px)')
  const isDown1100 = useMediaQuery('(max-width:1100px)')

  return (
    <Box
      sx={{
        background: '#1C352F',
        position: 'relative',
        width: '100%',
        height: '920px',
        clipPath:
          'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 calc(100% - 4rem))',
        marginBottom: '120px',
        '& >.childBox': {
          clipPath:
            'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 calc(100% - 4rem))',
          background: '#000C01',
          width: 'calc(100% - 1.5px)',
          height: 'calc(100% - 1.5px)',
          position: 'absolute',
          left: '1px',
          top: '1px',
          backgroundImage: `url(${DottedWaves})`,
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'inherit',
          backgroundSize: 'contain',
        },
      }}
      id='gpu'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          paddingTop: isDown1100 ? '40px' : '78px',
          width: '100%',
        }}
        className='childBox'
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '58px',
            fontFamily: 'Inter',
            color: '#ffffff',
            textAlign: 'left',
            paddingX: '5%',
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
            paddingBottom: '40px',
            paddingX: '5%',
          }}
        >
          Industry Breaking Prices
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: '24px',
            flex: 'auto',
          }}
        >
          <Box display='flex' flexDirection='column' flex={1}>
            {keypoints.map((keypoint, index) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '28px',
                  pt: isDown1440 ? '20px' : '40px',
                  pb: index === 0 ? '36px' : '40px',
                  borderBottom:
                    index === keypoints.length - 1
                      ? 'none'
                      : '1px solid #1C352F',
                  paddingX: '8%',
                }}
              >
                <img
                  src={GreenSpinner}
                  alt='GreenSpinner'
                  style={{
                    height: '32px',
                    width: '29px',
                  }}
                />
                <Box
                  key={index}
                  display='flex'
                  flexDirection='column'
                  gap={'8px'}
                >
                  <Typography
                    sx={{
                      color: '#ffffff',
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      fontSize: '24px',
                      lineHeight: '29.5px',
                    }}
                  >
                    {keypoint.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      lineHeight: '24px',
                      fontSize: '16px',
                    }}
                  >
                    {keypoint.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            display='flex'
            flexDirection='column'
            flex={1}
            alignSelf={'flex-end'}
          >
            <Box display='flex'>
              {row.map((header, index) => (
                <Box
                  key={index}
                  borderTop={0.5}
                  borderBottom={0.5}
                  borderLeft={0.5}
                  borderColor='#1C352F'
                  flex={1}
                  textAlign='center'
                  sx={{
                    height: '55px',
                    fontSize: '16px',
                    fontWeight: 700,
                    fontFamily: 'FuturaBold',
                    lineHeight: '21.2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '33.33%',
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
                      borderColor='#1C352F'
                      flex={1}
                      sx={{
                        minHeight: '55px',
                        maxHeight: '65px',
                        fontSize: cellIndex === 0 ? '16px' : '14px',
                        fontWeight: cellIndex === 0 ? 700 : 400,
                        fontFamily: cellIndex === 0 ? 'FuturaBold' : 'Inter',
                        lineHeight: cellIndex === 0 ? '21.2px' : '24px',
                        color:
                          cellIndex === 0 ? '#ffffff' : 'rgba(18, 253, 160, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign:
                          // cellIndex === 0 ? 'left' :
                          'center',
                        justifyContent:
                          // cellIndex === 0 ? 'flex-start' :
                          'center',
                        px:
                          // cellIndex === 0 ? '28px' :
                          '2px',
                        maxWidth: '33.33%',
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
                backgroundColor: '#000C01',
                height: '280px',
                borderBottom: '1px solid #1C352F',
                borderLeft: '1px solid #1C352F',
                borderRight: '1px solid #1C352F',
                px: '20px',
              }}
            >
              <img
                src={GreenBar}
                alt='GreenBar'
                style={{
                  marginRight: isDown1440 ? '5%' : '10%',
                  height: isDown1440 ? '200px' : '255px',
                }}
              />
              <img
                src={BlueBar}
                alt='BlueBar'
                style={{
                  height: isDown1440 ? '105px' : '117px',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default GPU
