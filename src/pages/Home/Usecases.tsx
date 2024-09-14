import { Box, Button, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { GreenSpinner, YellowSpinner, BlueSpinner } from '../../assets'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useRef, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const Usecases = () => {
  const isDown1000 = useMediaQuery('(max-width:1000px)')
  const [showAll, setShowAll] = useState(false)
  const containerRef = useRef(null) as any
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null)
  const [openTooltipType, setOpenTooltipType] = useState<string | null>(null)

  const handleToggle = () => {
    const currentScrollPosition = window.pageYOffset
    setShowAll(!showAll)
    if (showAll && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Maintain the scroll position when expanding
      window.scrollTo({ top: currentScrollPosition, behavior: 'smooth' })
    }
  }

  const tarUses = [
    {
      title: 'Token-Driven AI Utility',
      description:
        'By partnering with Web3 projects, TARS empowers their tokens with AI utility, enabling their communities to access premium AI tools and services by holding specific tokens.',
      spinner: GreenSpinner,
    },
    {
      title: 'Web3 Transition Assistance',
      description:
        'Help organizations and individuals effortlessly bridge the gap between Web2 and Web3 by providing the necessary tools, resources, and knowledge to adapt to the new decentralized world.',
      spinner: YellowSpinner,
    },
    {
      title: 'Streamlined Token Distribution',
      description:
        'Claimer offers an efficient solution for teams, investors, and community members to manage token allocations and custom unlock schedules in a decentralized environment.',
      spinner: BlueSpinner,
    },
    {
      title: 'Customizable Web3 Portals',
      description:
        'TARS Space enables organizations to create a tailored and secure environment to showcase their projects, interact with their community, and manage their Web3 presence.',
      spinner: GreenSpinner,
    },
    {
      title: 'Simplified Fundraising and Token Sales',
      description:
        'Smart SAFT provides a secure platform to conduct token sales, ensuring regulatory compliance and offering investors a user-friendly interface to participate in projects.',
      spinner: YellowSpinner,
    },
    {
      title: 'Decentralized Identity Verification',
      description:
        'Web3 Staff Authenticator allows organizations to easily manage and verify the identities of their team members, fostering trust and credibility within the Web3 ecosystem.',
      spinner: BlueSpinner,
    },
    {
      title: 'Decentralized Collaboration',
      description:
        'Supporting multiple blockchain ecosystems, TARS AI Hub ensures seamless integration with various Web3 wallets, providing a smooth and user-friendly experience for accessing AI tools across different networks.',
      spinner: GreenSpinner,
    },
    {
      title: 'Cross-Chain AI Access',
      description:
        'Foster collaborations between AI developers and Web3 projects, establishing a platform for sharing, integrating, and adopting cutting-edge AI tools and services within the Web3 ecosystem.',
      spinner: YellowSpinner,
    },
  ]

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1860 },
      items: 3.75,
    },
    largeDesktop: {
      breakpoint: { max: 1860, min: 1600 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1380 },
      items: 2.75,
    },
    smallDesktop: {
      breakpoint: { max: 1380, min: 1204 },
      items: 2.25,
    },
    tablet: {
      breakpoint: { max: 1204, min: 900 },
      items: 2,
    },
    smallTablet: {
      breakpoint: { max: 900, min: 700 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  }

  const renderCard = (
    index: number,
    title: string,
    description: string,
    spinner: string
  ) => {
    const isTitleTooltipOpen =
      openTooltipIndex === index && openTooltipType === 'title'
    const isDescriptionTooltipOpen =
      openTooltipIndex === index && openTooltipType === 'description'

    const handleDescriptionClick = () => {
      setOpenTooltipIndex(index)
      setOpenTooltipType('title')
    }

    return (
      <Box
        sx={{
          background:
            'linear-gradient(312.93deg, #12FDA0 0%, rgba(18, 253, 160, 0.35) 20%, rgba(18, 253, 160, 0.35) 80%, #12FDA0 100%)',
          position: 'relative',
          width: isDown1000 ? '100%' : '394px',
          height: isDown1000 ? '208px' : '301px',
          maxHeight: 'auto',
          clipPath:
            'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 100%)',
          '& > .childCard': {
            clipPath:
              'polygon(0% 0%, calc(100% - 4rem) 0%, 100% 4rem, 100% 100%, 4rem 100%, 0 100%)',
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: isDown1000 ? '16px' : '20px 36px',
          }}
          className='childCard'
        >
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              flexDirection: 'row',
              borderBottom: '1px dashed rgba(18, 253, 160, 0.5)',
              paddingBottom: isDown1000 ? '16px' : '40px',
            }}
          >
            <img
              src={spinner}
              alt={`${title} spinner`}
              style={{
                width: isDown1000 ? '32px' : '50.6px',
                height: isDown1000 ? '36px' : '56px',
              }}
            />
            <Tooltip
              title={title}
              placement='top'
              enterNextDelay={1000}
              enterTouchDelay={500}
              leaveTouchDelay={1000}
              open={isTitleTooltipOpen}
              onClose={() => setOpenTooltipIndex(null)}
              onOpen={() => {
                setOpenTooltipIndex(index)
                setOpenTooltipType('title')
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: isDown1000 ? '14px' : '24px',
                  lineHeight: isDown1000 ? '17px' : '29px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: isDown1000 ? 1 : 2,
                  WebkitBoxOrient: 'vertical',
                  marginRight: '20px',
                }}
              >
                {title}
              </Typography>
            </Tooltip>
          </Box>
          <Tooltip
            title={description}
            placement='top'
            enterNextDelay={1000}
            enterTouchDelay={500}
            leaveTouchDelay={1000}
            open={isDescriptionTooltipOpen}
            onClose={() => setOpenTooltipIndex(null)}
            onOpen={() => {
              setOpenTooltipIndex(index)
              setOpenTooltipType('description')
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: isDown1000 ? '14px' : '16px',
                lineHeight: isDown1000 ? '21px' : '24px',
                color: '#ffffff',
                opacity: 0.8,
                pt: isDown1000 ? '17px' : '33px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
              onClick={handleDescriptionClick}
            >
              {description}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        px: isDown1000 ? '16px' : '5%',
        pb: isDown1000 ? '18px' : '0px',
        mb: isDown1000 ? '0px' : '150px',
        // borderBottom: isDown1000 ? '0.5px solid rgba(40, 40, 43, 1)' : 'none',
      }}
      id='usecases'
    >
      <Typography
        sx={{
          fontFamily: 'Inter',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: isDown1000 ? '24px' : '48px',
          lineHeight: isDown1000 ? '29px' : '58px',
          textAlign: 'left',
          paddingBottom: isDown1000 ? '40px' : '70px',
        }}
      >
        TARS Use{' '}
        {/* <span
          style={{
            color: '#000000',
            textShadow:
              '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0  #fff',
          }}
        > */}
        Cases
        {/* </span> */}
      </Typography>

      {!isDown1000 ? (
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
            {tarUses.map((use, index) => (
              <Box key={index}>
                {renderCard(index, use.title, use.description, use.spinner)}
              </Box>
            ))}
          </Carousel>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {tarUses
              .slice(0, showAll ? tarUses.length : 2)
              .map((useCase, index) =>
                renderCard(
                  index,
                  useCase.title,
                  useCase.description,
                  useCase.spinner
                )
              )}
          </Box>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant='contained'
              onClick={handleToggle}
              sx={{
                outline: 'none',
                boxShadow: 'none',
                border: 'none',
                borderRadius: '0px',
                overflow: 'hidden',
                background: '#161616',
                height: '44px',
                width: '100%',
                fontFamily: 'FuturaMedium',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '12px',
                lineHeight: '16px',
                clipPath:
                  'polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 0.5rem), 0 0)',
                '&:hover': {
                  opacity: 0.9,
                  backgroundColor: '#161616',
                },
                '&:disabled': {
                  backgroundColor: '#161616',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {showAll ? 'Less' : 'More'}
              {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Usecases
