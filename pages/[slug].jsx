import { useState } from 'react';

import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import TopBarContent from '@/content/Applications/Messenger/TopBarContent';
import BottomBarContent from '@/content/Applications/Messenger/BottomBarContent';
import SidebarContent from '@/content/Applications/Messenger/SidebarContent';
import ChatContent from '@/content/Applications/Messenger/ChatContent';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

import Scrollbar from '@/components/Scrollbar';

import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme
} from '@mui/material';

import { useRouter } from 'next/router'
 

  


const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.colors.alpha.white[100]};
`
);

const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);

function ApplicationsMessenger() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [converse, setConverse] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [chatLoad, setchatLoad] = useState(false);

  const router = useRouter()
// const handleClick = (e) => {
//   console.log(e.target.id)
//   router.push(`/applications/${e.target.id}`)
// }

  return (
    <>
      <Head>
        <title>Entourage - Applications</title>
      </Head>
      <RootWrapper className="Mui-FixedWrapper">
        <DrawerWrapperMobile
          sx={{
            display: { lg: 'none', xs: 'inline-block' }
          }}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Scrollbar>
            <SidebarContent />
          </Scrollbar>
        </DrawerWrapperMobile>
       
  {/*       <Sidebar
          sx={{
            display: { xs: 'none', lg: 'inline-block' }
          }}
        >
          <Scrollbar>
            <SidebarContent />
          </Scrollbar>
        </Sidebar>
/*/}
        <ChatWindow style={{backgroundColor:"#F8EFEA"}}>
          
          {/* <ChatTopBar
            sx={{
              display: { xs: 'flex', lg: 'inline-block' }
            }}
          >
            <IconButtonToggle
              sx={{
                display: { lg: 'none', xs: 'flex' },
                mr: 2
              }}
              color="primary"
              onClick={handleDrawerToggle}
              size="small"
            >
              <MenuTwoToneIcon />
            </IconButtonToggle>
            <TopBarContent />
          </ChatTopBar> */}
          <Box flex={1}>
            <Scrollbar>
              <ChatContent converse={converse} setConverse={setConverse} chatLoad={chatLoad} setchatLoad={setchatLoad} response={response} setResponse={setResponse} error={error} setError={setError}/>
            </Scrollbar>
          {/* <BottomBarContent /> */}
          </Box>
          {/* <Divider /> */}
          <BottomBarContent converse={converse} setConverse={setConverse} chatLoad={chatLoad} setchatLoad={setchatLoad} response={response} setResponse={setResponse} error={error} setError={setError}/>
        </ChatWindow>
      </RootWrapper>
    </>
  );
}

ApplicationsMessenger.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsMessenger;
