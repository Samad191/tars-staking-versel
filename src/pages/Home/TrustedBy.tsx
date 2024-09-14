import { Box, Typography, useMediaQuery } from '@mui/material'
import { CheersLand, KleinLabs, TrustFi, CryptoPlayers } from '../../assets'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const TrustedBy = () => {
  const isDown1000 = useMediaQuery('(max-width:1000px)')
  const trustedByImages = [CheersLand, KleinLabs, TrustFi, CryptoPlayers]

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1860 },
      items: 3.75,
    },
    largeDesktop: {
      breakpoint: { max: 1860, min: 1600 },
      items: 3.5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1380 },
      items: 3,
    },
    smallDesktop: {
      breakpoint: { max: 1380, min: 1204 },
      items: 2.5,
    },
    largeTablet: {
      breakpoint: { max: 1204, min: 1070 },
      items: 2.25,
    },
    tablet: {
      breakpoint: { max: 1070, min: 1000 },
      items: 2.1,
    },
    smallTablet: {
      breakpoint: { max: 1000, min: 700 },
      items: 3,
    },
    largeMobile: {
      breakpoint: { max: 700, min: 500 },
      items: 2.25,
    },
    mobile: {
      breakpoint: { max: 500, min: 350 },
      items: 1.5,
    },
    smallMobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1.25,
    },
  }

  const renderCard = (image: string) => {
    return (
      <Box
        sx={{
          background:
            'linear-gradient(312.93deg, #12FDA0 0%, rgba(18, 253, 160, 0.35) 20%, rgba(18, 253, 160, 0.35) 80%, #12FDA0 100%)',
          position: 'relative',
          width: isDown1000 ? '178px' : '368px',
          height: isDown1000 ? '100px' : '184px',
          clipPath: isDown1000
            ? 'polygon(0% 0%, calc(100% - 2rem) 0%, 100% 2rem, 100% 100%, 2rem 100%, 0 100%)'
            : 'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 100%)',
          '& > .childCard': {
            clipPath: isDown1000
              ? 'polygon(0% 0%, calc(100% - 2rem) 0%, 100% 2rem, 100% 100%, 2rem 100%, 0 100%)'
              : 'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 100%)',
            background: '#010f08',
            width: 'calc(100% - 2px)',
            height: 'calc(100% - 2px)',
            position: 'relative',
            left: '1px',
            top: '1px',
          },
        }}
      >
        <Box
          className='childCard'
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={image}
            alt='Trusted By'
            style={{
              maxHeight: isDown1000 ? 'calc(100% - 2rem)' : 'calc(100% - 6rem)',
              maxWidth: isDown1000 ? 'calc(100% - 2rem)' : 'calc(100% - 4rem)',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        px: isDown1000 ? '16px' : '5%',
        paddingBottom: isDown1000 ? '20px' : '150px',
        paddingTop: isDown1000 ? '30px' : '150px',
      }}
    >
      <Typography
        sx={{
          color: 'rgba(231, 241, 126, 1)',
          fontWeight: 700,
          fontSize: isDown1000 ? '24px' : '48px',
          lineHeight: isDown1000 ? '29px' : '58px',
          fontFamily: 'Inter',
          paddingBottom: isDown1000 ? '30px' : '70px',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            // color: '#000000',
            // textShadow:
            //   '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0  #fff',
          }}
        >
          Trusted by
        </span>{' '}
        <span style={{ color: 'rgba(100, 169, 242, 1)' }}>20+</span> <br />
        Web3 Companies
      </Typography>

      <Box
        sx={{
          position: 'relative',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: '-2px',
            rotate: '180deg',
            width: '20%',
            height: '100%',
            background:
              'linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
            zIndex: 1,
          },
        }}
      >
        <Carousel
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          ssr={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          arrows={false}
        >
          {trustedByImages.map((image, index) => (
            <Box key={index}>{renderCard(image)}</Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default TrustedBy
