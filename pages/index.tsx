import {
  Typography,
  Box,
  Card,
  Container,
  // Button,
  styled
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

// import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper sx={{bgcolor:"#F3E5DB"}}>
      <Head>
        <title>Entourage</title>
      </Head>
      <HeaderWrapper style={{backgroundColor:"#241814", borderRadius:"0"}}>
        <Container maxWidth="lg" >
          <Box display="flex" alignItems="center">
            {/* <Logo /> */}
            <img src="/static/images/logo/logo-light1.png" alt="logo" style={{width:"15rem"}}  className=" " />
            {/* <img src="/static/images/logo/logodark.svg" alt="logo" style={{width:"15rem"}}  className=" " /> */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
               
                <div className="d-flex gap-3">

                <Link href="/auth/signup" style={{backgroundColor:"#E98B33", fontWeight:"bold"}} className="text-light btn btn-warning fwt-bold">Register</Link>
                <Link href="/auth/signin" style={{backgroundColor:"#E98B33", fontWeight:"bold"}} className="text-light btn btn-warning fwt-bold">Login</Link>
                </div>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Crafted by{' '}
          <Link
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Entourage Team
          </Link>
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
