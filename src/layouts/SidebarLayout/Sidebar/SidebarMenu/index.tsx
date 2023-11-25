import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  // ListSubheader,
  alpha,
  Box,
  List,
  styled,
  // Button,
  // ListItem
} from '@mui/material';
// import NextLink from 'next/link';
// import { SidebarContext } from 'src/contexts/SidebarContext';

// import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
// import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
// import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
// import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
// import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
// import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
// import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
// import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
// import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
// import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
// import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
// import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
// import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
// import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
// import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
// import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
// import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
// import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
// import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';



// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import StarBorder from '@mui/icons-material/StarBorder';
import { useFetchConverse } from '@/Services/Query/chatQuery';
// import { log } from 'console';
// import Link from 'next/link';
import { ChatContext } from '@/Services/Context/chatContext';
import Link from 'next/link';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const router = useRouter();
  const pathname = router.pathname;
  const {
    data: Converses,
    // isLoading: isLoadingConverses,
    // error: errorConverses,
    // refetch
  } = useFetchConverse();

  // const { closeSidebar } = useContext(SidebarContext);
  // const router = useRouter();
  // const currentRoute = router.pathname;

  const [more, setMore] = useState(false);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  // const [todayResults, setTodayResults] = useState([]);
  // const [yesterdayResults, setYesterdayResults] = useState([]);
  // const [earlierResults, setEarlierResults] = useState([]);

// const classif = ()=>{
//    // Assuming 'results' is the array you want to classify
//    const results =  Converses ;

//    const today = new Date();
//    today.setHours(0, 0, 0, 0);

//    const yesterday = new Date(today);
//    yesterday.setDate(yesterday.getDate() - 1);

//    const todayResults = [];
//    const yesterdayResults = [];
//    const earlierResults = [];

//   results?.forEach(result =>{
//     console.log(result);
    
//     const resultDate = new Date(result[result.lenght -1]?.created_at);
//     resultDate.setHours(0, 0, 0, 0);
    
//     if (+resultDate === +today) {
//       todayResults.push(result);
//     } else if (+resultDate === +yesterday) {
//       yesterdayResults.push(result);
//     } else if (+resultDate < +yesterday) {
//       earlierResults.push(result);
//     }
//   }
//     )
    
//    setTodayResults(todayResults);
//    setYesterdayResults(yesterdayResults);
//    setEarlierResults(earlierResults);
// }
//   useEffect(() => {
//     classif()
//   },[Converses]);


  // const { newChat, setnewChat, fromHistory, setfromHistory } = useContext(ChatContext)
  const { newChat, setnewChat, setfromHistory,changeHistory, setchangeHistory } = useContext(ChatContext)
const historyer =(item)=>{
  // setnewChat(!newChat)
  setchangeHistory(!changeHistory)
  setfromHistory(item)
}
// const router = useRouter()

  return (
    <>
      <MenuWrapper>
        <h2 className="text-center uppercase bg-warning text-dark p-2">
          <strong>
          {pathname =="/chat" && "Chat"}
          {pathname =="/event" && "Event"}</strong>
          </h2>
          <div  className="d-flex w-100 mt-1 justify-content-around">                
                <Link href="/chat">
                    <div className={pathname =="/chat"? "d-flex p-2 btn btn-light": "d-flex p-2 btn btn-outline-light"}> 
                        <span> <i className="bi bi-chat-left-dots-fill"></i> Chat</span>
                    </div>
                </Link>
                <Link href="/event">
                    <div className={pathname =="/event"? "d-flex p-2 btn btn-light": "d-flex p-2 btn btn-outline-light"}> 
                        <span> <i className="bi bi-calendar-event-fill"></i> Event</span>
                    </div>
                </Link>
            </div>
        <List component="div" >
          <SubMenuWrapper>

    <div aria-disabled className="d-flex flex-column rounded bg-dar ">
      <div className="btn bt mb-2 " style={{backgroundColor: "black"}}>   Chat History <i className="bi bi-arrow-down"></i> </div>
      {/* {JSON.stringify(fromHistory)} */}


           {! more?
            Converses?.slice(0, 5).map((item,index)=>(
              <div onClick={()=> historyer(item)}  key={index} style={{listStyleType: "none", display:"flex"}}>
                <i className="bi bi-chat-square-dots-fill mt-2"></i>
                <span style={{cursor: "pointer"}} className="d-flex justify-content-between w-100 py-2 px-3 ">
                {/* <i className="bi bi-circle-square text-primary"></i> */}
              <span className=""> {item[item.length -1].query} </span>
                <span style={{fontSize:"9px", backgroundColor:"#43332F"}} className=" rounded p-1 text-light align-self-center"> {item.length} </span>
                </span>
              </div>

            )):
            Converses?.map((item,index)=>(
              <div onClick={()=> historyer(item)}  key={index} style={{listStyleType: "none", display:"flex"}}>
                <span style={{cursor: "pointer"}} className="d-flex justify-content-between w-100 py-2 px-3 ">
                {/* <i className="bi bi-circle-square text-primary"></i> */}
              <span className=""> {item[item.length -1].query} </span>
                <span style={{fontSize:"9px", backgroundColor:"#43332F"}} className=" rounded p-1 text-light align-self-center"> {item.length} </span>
                </span>
              </div>

            ))
           
            }
            { Converses?.length >5 &&((!more) ? <div onClick={()=> setMore(!more)} className="d-flex justify-content-center align-items-center mt-2 btn btn-warning"> View More</div> 
            : <div onClick={()=> setMore(!more)} className="d-flex justify-content-center align-items-center mt-2 btn btn-warning"> View Less</div>
            )}
            </div>
            <div onClick={()=> setnewChat(!newChat)}  className="w-100 p-2 btn btn-outline-warning mt-5"> 
            <span> <i className="bi bi-plus-circle"></i> New Chat</span>
            </div>


            {/* <List component="div">
              <ListItem component="div">
                <NextLink href="/" passHref>
                  <Button
                    className={currentRoute === '="/' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<DesignServicesTwoToneIcon />}
                  >
                    Overview
                  </Button>
                </NextLink>
              </ListItem>
            </List> */}
              {/* {JSON.stringify(Converses)} */}
          </SubMenuWrapper>
        </List>
       

        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Management
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/management/transactions" passHref>
                  <Button
                    className={
                      currentRoute === '/management/transactions'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Transactions List
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Accounts
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/management/profile" passHref>
                  <Button
                    className={
                      currentRoute === '/management/profile' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<AccountCircleTwoToneIcon />}
                  >
                    User Profile
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/management/profile/settings" passHref>
                  <Button
                    className={
                      currentRoute === '/management/profile/settings'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<DisplaySettingsTwoToneIcon />}
                  >
                    Account Settings
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Components
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/components/buttons" passHref>
                  <Button
                    className={
                      currentRoute === '/components/buttons' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BallotTwoToneIcon />}
                  >
                    Buttons
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/modals" passHref>
                  <Button
                    className={
                      currentRoute === '/components/modals' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BeachAccessTwoToneIcon />}
                  >
                    Modals
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/accordions" passHref>
                  <Button
                    className={
                      currentRoute === '/components/accordions' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<EmojiEventsTwoToneIcon />}
                  >
                    Accordions
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/tabs" passHref>
                  <Button
                    className={
                      currentRoute === '/components/tabs' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<FilterVintageTwoToneIcon />}
                  >
                    Tabs
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/badges" passHref>
                  <Button
                    className={
                      currentRoute === '/components/badges' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<HowToVoteTwoToneIcon />}
                  >
                    Badges
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/tooltips" passHref>
                  <Button
                    className={
                      currentRoute === '/components/tooltips' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<LocalPharmacyTwoToneIcon />}
                  >
                    Tooltips
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/avatars" passHref>
                  <Button
                    className={
                      currentRoute === '/components/avatars' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<RedeemTwoToneIcon />}
                  >
                    Avatars
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/cards" passHref>
                  <Button
                    className={
                      currentRoute === '/components/cards' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<SettingsTwoToneIcon />}
                  >
                    Cards
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/components/forms" passHref>
                  <Button
                    className={
                      currentRoute === '/components/forms' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TrafficTwoToneIcon />}
                  >
                    Forms
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Extra Pages
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/status/404" passHref>
                  <Button
                    className={currentRoute === '/status/404' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<CheckBoxTwoToneIcon />}
                  >
                    Error 404
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/status/500" passHref>
                  <Button
                    className={currentRoute === '/status/500' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<CameraFrontTwoToneIcon />}
                  >
                    Error 500
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/status/coming-soon" passHref>
                  <Button
                    className={
                      currentRoute === '/status/coming-soon' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<ChromeReaderModeTwoToneIcon />}
                  >
                    Coming Soon
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/status/maintenance" passHref>
                  <Button
                    className={
                      currentRoute === '/status/maintenance' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<WorkspacePremiumTwoToneIcon />}
                  >
                    Maintenance
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
