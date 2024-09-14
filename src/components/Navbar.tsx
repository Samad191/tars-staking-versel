import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
  Tooltip,
} from '@mui/material'
import Close from '@mui/icons-material/Close'
import { Menu, TarsLogoTextWhite } from '../assets'
import { useWallet } from '@solana/wallet-adapter-react'
import WalletModal from './WalletModal'
import { shortenSolanaAddress, SOLANA_RPC } from '../utils'
import { getProvider } from '../contract'
import { Connection, PublicKey } from '@solana/web3.js'

const drawerWidth = '100%'

const navItems = [
  {
    name: 'Home',
    activeFontColor: 'rgba(134, 60, 255, 1)',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'FuturaBold',
    fontFamily: 'FuturaMedium',
    id: 'home',
    // showComingSoon: true,
  },
  {
    name: 'Docs',
    activeFontColor: 'rgba(134, 60, 255, 1)',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'FuturaBold',
    fontFamily: 'FuturaMedium',
    id: 'gpu',
    onClick: () => window.open('https://docs.tars.pro', '_blank'),
  },

  {
    name: 'AI Hub',
    activeFontColor: 'rgba(134, 60, 255, 1)',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'FuturaBold',
    fontFamily: 'FuturaMedium',
    id: 'tokenomics',
    showComingSoon: true,
  },
  {
    name: 'Stake & GPU',
    activeFontColor: 'rgba(134, 60, 255, 1)',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'FuturaBold',
    fontFamily: 'FuturaMedium',
    id: 'usecases',
    showComingSoon: true,
  },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Stake & GPU')
  const isDown1000 = useMediaQuery('(max-width:1000px)')
  const isDown600 = useMediaQuery('(max-width:600px)')
  const isDown380 = useMediaQuery('(max-width:380px)')

  const { publicKey, disconnect, connected, wallets, disconnecting } = useWallet()
  console.log('running disconnecting', connected, disconnecting)

  const [walletModal, setWalletModal] = useState(false)
  const wallet: any = useWallet();

  console.log('wallet', wallet)


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [providerWindow, setProviderWindow]: any = useState()
  const [providerAnchor, setProviderAnchor]: any = useState()

  // setting both providers
  // useEffect(() => {
  //   const getProviderWindow = () => {
  //     console.log('11111')
  //     if ('phantom' in window) {
  //       const { solana }: any = window?.phantom;
  //       if (solana?.isPhantom) {
  //         setProviderWindow(solana)
  //         return solana;
  //       }
  //     }
  //   }
  //   (async () => {
  //     await getProviderWindow()
  //     const res = await getProvider(wallet.wallet)
  //     console.log('first')
  //     setProviderAnchor(res);
  //   }) ()
  // }, [])

  // Subscriber on connection not working
  // useEffect(() => {
  //   const opts = {
  //     preflightCommitment: "processed",
  //   } as any;
  //   /* create the provider and return it to the caller */
  //   /* network set to local network for now */
  //   console.log("connection");
  
  //   const connection = new Connection(SOLANA_RPC, opts.preflightCommitment);
  //   console.log('connection', connection)

  //   if(publicKey) {
  //     console.log('listener is onnn', publicKey)
      
  //     connection.onAccountChange(new PublicKey('4tEhhqEzxML6JXtYUPrhLXZoHZiQDqdasdBhUYrvuGpw'), (accountInfo) =>  {
  //       console.log('accountInfo', accountInfo)
  //     })
  //   }
  // }, [publicKey])

  // Subscriber on provider window working
  // useEffect(() => {
  //   console.log('provider Window', providerWindow)
  //     providerWindow?.on('accountChanged', (publicKey: any) => {
  //       if (publicKey) {
          
  //           console.log(`Switched to account ${publicKey.toBase58()}`);
  //       } 
  //   });
    
  // }, [providerWindow])

  // useEffect(() => {
  //   if(providerAnchor) {
  //     // console.log('Switched to providerAnchor', providerAnchor)

  //   }
  // }, [providerAnchor])



  const handleNavItemClick = (itemName: string, itemId: string) => {
    setActiveItem(itemName)

    // const element = document.getElementById(itemId);
    // if (element) {
    //   element.scrollIntoView({ behavior: "smooth" });
    // }

    if (isDown1000) {
      setMobileOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const sections = navItems.map(item => document.getElementById(item.id))
      let currentSection = 'Stake & GPU'

      for (const section of sections) {
        if (section) {
          const offsetTop = section.offsetTop
          const offsetHeight = section.offsetHeight

          if (
            scrollPosition >= (offsetTop ?? 0) - 50 &&
            scrollPosition < (offsetTop ?? 0) + (offsetHeight ?? 0) - 50
          ) {
            currentSection = section.id ?? 'Stake & GPU'
            break
          }
        }
      }

      setActiveItem(
        navItems.find(item => item.id === currentSection)?.name ?? 'Stake & GPU'
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (publicKey) {
      setWalletModal(false)
    }
  }, [publicKey])

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        marginTop: '16px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '16px',
          top: '16px',
        }}
      >
        <img
          src={TarsLogoTextWhite}
          alt='Logo'
          style={{
            height: isDown1000 ? '50px' : '85px',
            maxWidth: isDown1000 ? '135px' : '150px',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: '16px',
          top: '16px',
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <Close sx={{ color: '#ffffff' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: '#282828',
          position: 'absolute',
          top: '0px',
        }}
      />
      <List>
        {navItems.map(item => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'left',
                paddingLeft: '10%',
                paddingY: '30px',
                gap: '4px',
                justifyContent: isDown1000 ? 'center' : 'flex-start',
                borderBottom: '1px solid #282828',
                marginX: '16px',
              }}
              onClick={e => {
                e.stopPropagation()
                item.name === 'Home' && handleNavItemClick(item.name, item.id)

                if (item.onClick) {
                  item.onClick()
                  setMobileOpen(false)
                }

                //handleNavItemClick(item.name, item.id)
              }}
            >
              <Tooltip
                title={item.showComingSoon ? 'Coming Soon' : ''}
                placement='top'
                enterTouchDelay={0}
              >
                <Typography
                  fontSize={'18px'}
                  fontWeight={500}
                  lineHeight={'21px'}
                  fontFamily='Avenir'
                  color={
                    activeItem === item.name
                      ? 'rgba(134, 60, 255, 1)'
                      : '#FFFFFF'
                  }
                >
                  {item.name}
                </Typography>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',

        width: 'calc(100% - 8px)',
        paddingRight: isDown1000 ? '20px' : '2%',
        paddingLeft: isDown1000 ? '10px' : '2%',
        height: '85px',
        alignItems: 'center',
        maxWidth: isDown1000 ? '100%' : '90%',

        //marginTop: isDown1000 ? "0px" : "3px",
      }}
    >
      <AppBar
        component='nav'
        sx={{
          background: 'rgba(0, 0, 0, 0.8)',
          boxShadow: 'none',
          width: '100%',
        }}
        position='fixed'
      >
        <Toolbar sx={{ px: '0px' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: 'block' },
              WebkitWritingMode: 'vertical-lr',
            }}
          >
            <img
              src={TarsLogoTextWhite}
              alt='Logo'
              style={{
                // width: "100%",

                height: isDown1000 ? '50px' : '85px',
                maxWidth: isDown380 ? '100px' : isDown1000 ? '135px' : '150px',
                // minWidth: isDown1000 ? "60px" : "55px",
                cursor: 'pointer',
                display: mobileOpen ? 'none' : 'flex',
              }}
              onClick={() => window.location.replace('/')}
            />
          </Box>
          <Box
            sx={{
              display: isDown1000 ? 'none' : 'flex',
              gap: '40px',
              flexGrow: 1,
            }}
          >
            {navItems.map(item => (
              <Button
                key={item.name}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick()
                  }
                }}
                sx={{
                  textTransform: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  minWidth: '50px',
                }}
                disableRipple
              >
                <Tooltip
                  title={item.showComingSoon ? 'Coming Soon' : ''}
                  placement='top'
                  enterTouchDelay={0}
                >
                  <Typography
                    fontSize={'18px'}
                    fontWeight={500}
                    lineHeight={'21px'}
                    fontFamily='Avenir'
                    color={
                      activeItem === item.name
                        ? 'rgba(134, 60, 255, 1)'
                        : '#FFFFFF'
                    }
                  >
                    {item.name}
                  </Typography>
                </Tooltip>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              // flexGrow: 1,
              marginRight: isDown1000 ? '10px' : '0px',
            }}
          >
            {!publicKey ? (
              <Button
                variant='contained'
                sx={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '24px',
                  overflow: 'hidden',
                  background:
                    'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)',
                  height: isDown600 ? '42px' : '50px',
                  width: isDown380
                    ? 'fit-content'
                    : isDown600
                    ? '180px'
                    : '180px',
                  '&:hover': {
                    opacity: 0.9,
                    backgroundColor: '#72AFF2',
                  },
                  '&:disabled': {
                    backgroundColor: '#72AFF2',
                  },
                }}
                onClick={async () => {
                  setWalletModal(true)
                }}
              >
                <Typography
                  fontSize={isDown380 ? '12px' : '16px'}
                  fontWeight={500}
                  lineHeight={'24px'}
                  fontFamily={'Avenir'}
                  color='rgba(255, 255, 255, 1)'
                  textTransform={'none'}
                >
                  Connect Wallet
                </Typography>
              </Button>
            ) : (
              <Button
                variant='contained'
                sx={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '24px',

                  overflow: 'hidden',

                  background:
                    'linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)',
                  height: isDown600 ? '42px' : '50px',
                  width: isDown600 ? '180px' : '180px',

                  '&:hover': {
                    opacity: 0.9,
                    backgroundColor: '#72AFF2',
                  },
                  '&:disabled': {
                    backgroundColor: '#72AFF2',
                  },
                }}
                onClick={() => disconnect()}
              >
                <Typography
                  fontSize={'16px'}
                  fontWeight={500}
                  lineHeight={'24px'}
                  fontFamily={'Avenir'}
                  color='rgba(255, 255, 255, 1)'
                  textTransform={'none'}
                >
                  {shortenSolanaAddress(publicKey?.toBase58() ?? '')}
                </Typography>
              </Button>
            )}
          </Box>

          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            sx={{
              display: isDown1000 ? 'block' : 'none',
              visibility: mobileOpen ? 'hidden' : 'visible',
            }}
          >
            <img
              src={Menu}
              alt='Menu'
              style={{ width: '24px', height: '24px' }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor='right'
          ModalProps={{
            keepMounted: true,
          }}
          disableRestoreFocus
          sx={{
            display: { sm: 'block', md: 'block', lg: 'none' },
            zIndex: 2,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              backgroundImage: 'none',
              backdropFilter: 'blur(4px)',
              justifyContent: 'center',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <WalletModal open={walletModal} setOpen={setWalletModal} />
    </Box>
  )
}

export default Navbar

// import { SetStateAction, useEffect, useState } from "react";
// import {
//   AppBar,
//   Box,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   Toolbar,
//   Button,
//   Typography,
//   useMediaQuery,
//   Tooltip,
// } from "@mui/material";
// import Close from "@mui/icons-material/Close";
// import { Logo, Menu } from "../assets";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import WalletModal from "./WalletModal";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { shortenSolanaAddress } from "../utils";

// const drawerWidth = "100%";

// const navItems = [
//   {
//     name: "Home",
//     activeFontColor: "rgba(3, 255, 225, 1)",
//     fontWeight: 500,
//     fontSize: "18px",
//     activeFontFamily: "FuturaBold",
//     fontFamily: "FuturaMedium",
//     id: "home",
//   },
//   {
//     name: "TARS GPU",
//     activeFontColor: "rgba(3, 255, 225, 1)",
//     fontWeight: 500,
//     fontSize: "18px",
//     activeFontFamily: "FuturaBold",
//     fontFamily: "FuturaMedium",
//     id: "gpu",
//   },
//   // {
//   //   name: 'TARS GPU',
//   //   activeFontColor: 'rgba(3, 255, 225, 1)',
//   //   fontWeight: 700,
//   //   fontSize: '20px',
//   //   activeFontFamily: 'Inter',
//   //   fontFamily: 'Inter',
//   // },
//   {
//     name: "Tokenomics",
//     activeFontColor: "rgba(3, 255, 225, 1)",
//     fontWeight: 500,
//     fontSize: "18px",
//     activeFontFamily: "FuturaBold",
//     fontFamily: "FuturaMedium",
//     id: "tokenomics",
//   },
//   {
//     name: "TARS Usecases",
//     activeFontColor: "rgba(3, 255, 225, 1)",
//     fontWeight: 500,
//     fontSize: "18px",
//     activeFontFamily: "FuturaBold",
//     fontFamily: "FuturaMedium",
//     id: "usecases",
//   },
// ];

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState("Home");
//   const isDown1000 = useMediaQuery("(max-width:1000px)");

//   const { publicKey, disconnect } = useWallet();

//   const [walletModal, setWalletModal] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   useEffect(() => {
//     if (publicKey) {
//       setWalletModal(false);
//     }
//   }, [publicKey]);

//   const handleNavItemClick = (itemName: string, itemId: string) => {
//     setActiveItem(itemName);

//     const element = document.getElementById(itemId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }

//     if (isDown1000) {
//       setMobileOpen(false);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const sections = navItems.map((item) => document.getElementById(item.id));
//       let currentSection = "Home";

//       for (const section of sections) {
//         if (section) {
//           const offsetTop = section.offsetTop;
//           const offsetHeight = section.offsetHeight;

//           if (
//             scrollPosition >= (offsetTop ?? 0) - 50 &&
//             scrollPosition < (offsetTop ?? 0) + (offsetHeight ?? 0) - 50
//           ) {
//             currentSection = section.id ?? "Home";
//             break;
//           }
//         }
//       }

//       setActiveItem(
//         navItems.find((item) => item.id === currentSection)?.name ?? "Home"
//       );
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const drawer = (
//     <Box
//       onClick={handleDrawerToggle}
//       sx={{
//         textAlign: "center",
//         marginTop: "16px",
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           left: "16px",
//           top: "16px",
//         }}
//       >
//         <img
//           src={Logo}
//           alt="Logo"
//           style={{
//             width: "auto",
//             height: "36px",
//           }}
//         />
//       </Box>

//       <Box
//         sx={{
//           position: "absolute",
//           right: "16px",
//           top: "16px",
//         }}
//       >
//         <IconButton onClick={handleDrawerToggle}>
//           <Close sx={{ color: "#ffffff" }} />
//         </IconButton>
//       </Box>
//       <Box
//         sx={{
//           width: "100%",
//           height: "1px",
//           backgroundColor: "#282828",
//           position: "absolute",
//           top: "76px",
//         }}
//       />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.name} disablePadding>
//             <ListItemButton
//               sx={{
//                 textAlign: "left",
//                 paddingLeft: "10%",
//                 paddingY: "30px",
//                 gap: "4px",
//                 justifyContent: isDown1000 ? "center" : "flex-start",
//                 borderBottom: "1px solid #282828",
//                 marginX: "16px",
//               }}
//               onClick={() => handleNavItemClick(item.name, item.id)}
//             >
//               <Typography
//                 style={{
//                   color:
//                     activeItem === item.name ? item.activeFontColor : "#FFFFFF",
//                   fontFamily:
//                     activeItem === item.name
//                       ? item.activeFontFamily
//                       : item.fontFamily,
//                   lineHeight: "24px",
//                   letterSpacing: "0.02em",
//                   cursor: "pointer",
//                 }}
//               >
//                 {item.name}
//               </Typography>
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         position: isDown1000 ? "static" : "absolute",
//         zIndex: 1,
//         width: "calc(100% - 8px)",
//         paddingRight: isDown1000 ? "20px" : "2%",
//         paddingLeft: isDown1000 ? "10px" : "2%",
//         //   height: "78px",
//         alignItems: "center",
//         maxWidth: isDown1000 ? "100%" : "90%",
//         // borderLeft: isDown1000 ? "none" : "1.5px solid #1C352F",
//         // borderRight: isDown1000 ? "none" : "1.5px solid #1C352F",
//         marginTop: isDown1000 ? "0px" : "3px",
//       }}
//     >
//       <AppBar
//         component="nav"
//         sx={{
//           background: "transparent",
//           boxShadow: "none",
//           width: "100%",
//         }}
//         position="static"
//       >
//         <Toolbar sx={{ px: "0px" }}>
//           {/* <WalletMultiButton /> */}

//           {!publicKey ? (
//             <Button
//               variant="contained"
//               sx={{
//                 outline: "none",
//                 boxShadow: "none",
//                 border: "none",
//                 borderRadius: "30px",
//                 fontSize: "24px",

//                 overflow: "hidden",

//                 background: "linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)",

//                 height: "50px",
//                 width: "180px",

//                 "&:hover": {
//                   opacity: 0.9,
//                   backgroundColor: "#72AFF2",
//                 },
//                 "&:disabled": {
//                   backgroundColor: "#72AFF2",
//                 },
//               }}
//               onClick={() => setWalletModal(true)}
//             >
//               <Typography
//                 fontSize={"16px"}
//                 fontWeight={500}
//                 lineHeight={"24px"}
//                 fontFamily={"Avenir"}
//                 color="rgba(255, 255, 255, 1)"
//               >
//                 Connect Wallet
//               </Typography>
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               sx={{
//                 outline: "none",
//                 boxShadow: "none",
//                 border: "none",
//                 borderRadius: "30px",
//                 fontSize: "24px",

//                 overflow: "hidden",

//                 background: "linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)",

//                 height: "50px",
//                 width: "180px",

//                 "&:hover": {
//                   opacity: 0.9,
//                   backgroundColor: "#72AFF2",
//                 },
//                 "&:disabled": {
//                   backgroundColor: "#72AFF2",
//                 },
//               }}
//               onClick={() => disconnect()}
//             >
//               <Typography
//                 fontSize={"16px"}
//                 fontWeight={500}
//                 lineHeight={"24px"}
//                 fontFamily={"Avenir"}
//                 color="rgba(255, 255, 255, 1)"
//               >
//                 {shortenSolanaAddress(publicKey?.toBase58() ?? "")}
//               </Typography>
//             </Button>
//           )}

//           {/* <Box
//             sx={{
//               flexGrow: 1,
//               display: { md: "block" },
//               WebkitWritingMode: "vertical-lr",
//             }}
//           >
//             <img
//               src={Logo}
//               alt="Logo"
//               style={{
//                 width: "100%",

//                 height: isDown1000 ? "36px" : "51px",
//                 maxWidth: isDown1000 ? "110px" : "145px",
//                 minWidth: isDown1000 ? "60px" : "55px",
//                 cursor: "pointer",
//                 display: mobileOpen ? "none" : "flex",
//               }}
//               onClick={() => window.location.replace("/")}
//             />
//           </Box> */}
//           <Box
//             sx={{
//               display: isDown1000 ? "none" : "flex",
//               gap: "44px",
//             }}
//           >
//             {/* {navItems.map((item) => (
//               <Button
//                 key={item.name}
//                 onClick={() => handleNavItemClick(item.name, item.id)}
//                 sx={{
//                   textTransform: "none",
//                   padding: 0,
//                   fontSize: item.fontSize,
//                   fontFamily:
//                     activeItem === item.name
//                       ? item.activeFontFamily
//                       : item.fontFamily,
//                   fontWeight: item.fontWeight,
//                   color:
//                     activeItem === item.name ? item.activeFontColor : "#FFFFFF",
//                   lineHeight: "24px",
//                   letterSpacing: "0.02em",
//                   cursor: "pointer",
//                   width: "130px",
//                 }}
//                 disableRipple
//               >
//                 {item.name}
//               </Button>
//             ))} */}
//           </Box>

//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerToggle}
//             sx={{
//               display: isDown1000 ? "block" : "none",
//               visibility: mobileOpen ? "hidden" : "visible",
//             }}
//           >
//             <img
//               src={Menu}
//               alt="Menu"
//               style={{ width: "24px", height: "24px" }}
//             />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Box component="nav">
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           anchor="right"
//           ModalProps={{
//             keepMounted: true,
//           }}
//           disableRestoreFocus
//           sx={{
//             display: { sm: "block", md: "block", lg: "none" },
//             zIndex: 2,
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//               zIndex: 2,
//               backgroundColor: "rgba(0, 0, 0, 0.1)",
//               backgroundImage: "none",
//               backdropFilter: "blur(4px)",
//               justifyContent: "center",
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <WalletModal open={walletModal} setOpen={setWalletModal} />
//     </Box>
//   );
// };

// export default Navbar;

// @solana/wallet-standard-wallet-adapter-base": "1.0.1"