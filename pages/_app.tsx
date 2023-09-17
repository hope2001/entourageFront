import type { ReactElement, ReactNode } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";



import { ChatWrapper } from '@/Services/Context/chatContext';

// import { ToastContainer, toast } from 'material-react-toastify';
// import 'material-react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function TokyoApp(props: TokyoAppProps) {
//  const [isLoged, setisLoged] = useState(false)
  // const {
  //   data: user,
  //   isLoading: isLoadinguser,
  //   error: erroruser,
  //   refetch
  // } = useFetchUserData();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // const userlog = async ()=>{
  //       try {
  //     const res = await AuthSys.userLogedData();
  //     if(res){
  //       setisLoged(true)
  //     }
  //     else{
  //       setisLoged(false)
  //     }
  //   // console.log(res);
  //   } catch (error) {
  //     setisLoged(false)
  //   }
  // }

  // useEffect(() => {
  //   userlog()
    
  // });
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);
  const queryClient = new QueryClient();
  return (

  <QueryClientProvider client={queryClient}>
   {/*  <div className="container bg-danger p-5"> */}

   <ChatWrapper>
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Entourage</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          
        />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,700;1,900&display=swap" rel="stylesheet"/>
    
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </SidebarProvider>
    </CacheProvider>
    <ToastContainer />
  </ChatWrapper>

</QueryClientProvider>

  );
}

export default TokyoApp;
