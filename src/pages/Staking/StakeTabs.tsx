import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

interface IStakeTabs {
  handleTabChange: (value: number) => void
  tab: number
}

const StakeTabs: React.FC<IStakeTabs> = ({ handleTabChange, tab }) => {
  const isDown1200 = useMediaQuery('(max-width:1200px)')
  const isDown410 = useMediaQuery('(max-width:410px)')
  const isDown350 = useMediaQuery('(max-width:350px)')

  return (
    <Box
      sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
      my={isDown1200 ? '16px' : '24px'}
      mt={0}
    >
      <Grid
        container
        height={'56px'}
        border={'1px solid rgba(134, 60, 255, 0.2)'}
        minWidth={'max-content'}
        sx={{
          flexFlow: 'nowrap',
          background: 'transparent',
          padding: '3px',
          borderRadius: '50px',
        }}
      >
        <Grid
          item
          // height={"48px"}
          xs={6}
          onClick={() => handleTabChange(0)}
          sx={{
            cursor: 'pointer',

            borderRadius: '50px',
            background:
              tab === 0
                ? 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)'
                : '#000',
            padding: '1px',
          }}
        >
          <Grid
            sx={{
              //background: "rgba(134, 60, 255, 0.15)",
              width: '100%',
              height: '100%',
            }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              fontSize={isDown350 ? '12px' : '16px'}
              fontWeight={400}
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
              Stake
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          onClick={() => handleTabChange(1)}
          sx={{
            cursor: 'pointer',

            minWidth: 'fit-content',

            borderRadius: '50px',
            background:
              tab === 1
                ? 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)'
                : 'none',
            padding: '1px',
          }}
        >
          <Grid
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              //background: "rgba(134, 60, 255, 0.15)",
              width: '100%',
              height: '100%',
            }}
          >
            <Typography
              fontSize={isDown350 ? '12px' : '16px'}
              fontWeight={400}
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
              Reward
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          onClick={() => handleTabChange(2)}
          sx={{
            cursor: 'pointer',

            minWidth: 'fit-content',
            borderRadius: '50px',
            background:
              tab === 2
                ? 'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)'
                : 'none',
            padding: '1px',
          }}
        >
          <Grid
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              //background: "rgba(134, 60, 255, 0.15)",
              width: '100%',
              height: '100%',
            }}
          >
            <Typography
              fontSize={isDown350 ? '12px' : '16px'}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Avenir'}
              color={
                tab === 2
                  ? 'rgba(255, 255, 255, 1)'
                  : tab === 0
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(255, 255, 255, 0.7)'
              }
            >
              Unstake
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StakeTabs
