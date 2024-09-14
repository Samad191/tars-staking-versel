import { Box, Grid, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

interface IMainTabs {
  handleTabChange: (value: number) => void
  tab: number
}

const MainTabs: React.FC<IMainTabs> = ({ handleTabChange, tab }) => {
  const activeTabBorder = '0.5px solid rgba(255, 255, 255, 0.16)'
  const isDown1200 = useMediaQuery('(max-width:1200px)')
  const isDown410 = useMediaQuery('(max-width:410px)')
  const isDown350 = useMediaQuery('(max-width:350px)')

  return (
    <Box
      sx={{
        // minWidth: '300px',
        // width: isDown1200 ? `calc(${window.innerWidth}px)` : '100%',
        width: isDown1200 ? '100%' : '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        borderRadius: '50px',
      }}
      my={isDown1200 ? '16px' : '24px'}
    >
      <Grid
        container
        height={'48px'}
        //  borderRadius={"25px"}
        border={'1px solid rgba(134, 60, 255, 0.2)'}
        // bgcolor={"#0F1113"}

        minWidth={'max-content'}
        sx={{
          flexFlow: 'nowrap',
          background: 'transparent',
          padding: '2px',
          borderRadius: '50px',
        }}
      >
        <Grid
          item
          //height={"48px"}
          xs={6}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          // border={tab === 0 ? activeTabBorder : "none"}
          onClick={() => handleTabChange(0)}
          sx={{
            cursor: 'pointer',
            //  borderRadius: "25px",
            padding: isDown410 ? '12px 10px 12px 10px' : '12px 24px 13px 24px',

            minWidth: 'fit-content',

            background:
              tab === 0
                ? 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)'
                : 'none',
            borderRadius: '50px',
          }}
        >
          <Typography
            fontSize={isDown350 ? '12px' : '16px'}
            fontWeight={500}
            lineHeight={'24px'}
            fontFamily={'Avenir'}
            color={
              tab === 0
                ? 'rgba(255, 255, 255, 1)'
                : tab === 1
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(255, 255, 255, 0.7)'
            }
          >
            Staking
          </Typography>
        </Grid>
        <Grid
          item
          // height={"48px"}
          xs={6}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          // border={tab === 1 ? activeTabBorder : "none"}
          onClick={() => handleTabChange(1)}
          sx={{
            cursor: 'pointer',
            // borderRadius: "25px",
            padding: isDown410 ? '12px 10px 12px 10px' : '12px 24px 13px 24px',

            minWidth: 'fit-content',
            background:
              tab === 1
                ? 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)'
                : 'none',
            borderRadius: '50px',
          }}
        >
          <Typography
            fontSize={isDown350 ? '12px' : '16px'}
            fontWeight={500}
            lineHeight={'24px'}
            fontFamily={'Avenir'}
            color={
              tab === 1
                ? 'rgba(255, 255, 255, 1)'
                : tab === 0
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(255, 255, 255, 0.7)'
            }
          >
            TARS GPU
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainTabs
