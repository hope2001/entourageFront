import { useContext, useEffect, useState } from 'react';

import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

// import TopBarContent from '@/content/Applications/Messenger/TopBarContent';
import BottomBarContent from '@/content/Applications/Messenger/BottomBarContent';
import SidebarContent from '@/content/Applications/Messenger/SidebarContent';
import ChatContent from '@/content/Applications/Messenger/ChatContent';
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

import Scrollbar from '@/components/Scrollbar';

import {
  Box,
  styled,
  // Divider,
  Drawer,
  // IconButton,
  useTheme
} from '@mui/material';
import { ChatContext } from '@/Services/Context/chatContext';
import { useFetchUserData } from '@/Services/Query/userQuery';
import { useRouter } from 'next/router';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);

// const Sidebar = styled(Box)(
//   ({ theme }) => `
//         width: 300px;
//         background: ${theme.colors.alpha.white[100]};
//         border-right: ${theme.colors.alpha.black[10]} solid 1px;
// `
// );

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

// const ChatTopBar = styled(Box)(
//   ({ theme }) => `
//         background: ${theme.colors.alpha.white[100]};
//         border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
//         padding: ${theme.spacing(2)};
//         align-items: center;
// `
// );

// const IconButtonToggle = styled(IconButton)(
//   ({ theme }) => `
//   width: ${theme.spacing(4)};
//   height: ${theme.spacing(4)};
//   background: ${theme.colors.alpha.white[100]};
// `
// );

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
  const router = useRouter()
  // const pathname = usePathname()
  // const [isok, setisok] = useState(false)
  const {
    data: currenntuser,
    isLoading: isLoadingCurrentUser,
    // error: errorCurrentUser, 
    refetch
} = useFetchUserData();

const { newChat } = useContext(ChatContext)
const theme = useTheme();
const [mobileOpen, setMobileOpen] = useState(false);
// if(isLoadingCurrentUser && currenntuser)return <div className="">Loading</div>

const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
  };
  const [converse, setConverse] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [chatLoad, setchatLoad] = useState(false);
  const [inter, setinter] = useState([]);
  useEffect(() => {
    refetch()
  }, [currenntuser])
  useEffect(() => {
    setConverse([])
    setResponse(null)
    setError(null)
    setError(false)
    setinter([])
  }, [newChat])
  
  if(isLoadingCurrentUser && currenntuser)
      return <div className="">Loading</div>
  if(!isLoadingCurrentUser &&!currenntuser){
      router.push('/auth/signin')
  }
  return (
  


    <div>
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

        <ChatWindow style={{backgroundColor:"#F8EFEA"}}>
          

          <Box flex={1}>
            <Scrollbar>
              <ChatContent converse={converse}  chatLoad={chatLoad} />
            </Scrollbar>
          {/* <BottomBarContent /> */}
          </Box>
          {/* <Divider /> */}
          <BottomBarContent converse={converse} setConverse={setConverse} chatLoad={chatLoad} setchatLoad={setchatLoad} response={response} setResponse={setResponse} error={error} setError={setError} inter={inter} setinter={setinter}/>
        </ChatWindow>
      </RootWrapper>
    </div>

  );
}

ApplicationsMessenger.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsMessenger;
