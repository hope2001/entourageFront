import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
// import Footer from '@/components/Footer';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
// import Wallets from '@/content/Dashboards/Crypto/Wallets';
// import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
// import WatchList from '@/content/Dashboards/Crypto/WatchList';
import { useFetchUserData } from '@/Services/Query/userQuery';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashRequest } from '@/Services/Requests/dashboard';
// import Datatable from '@/content/Dashboards/Crypto/dataable';
import Table_User from "@/content/Dashboards/Crypto/TableUser"
import Table_Converse from "@/content/Dashboards/Crypto/TableConverse"
import { Tokenn } from '@/Services/Helpers/TokenLogic';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Axios from '@/Services/Requests/interceptor';

function DashboardCrypto() {

  
const [skey, setskey] = useState(null)
  const router = useRouter();
  const {
    data: currenntuser,
    isLoading: isLoadingCurrentUser,
    // error: errorCurrentUser, 
    refetch
} = useFetchUserData();

useEffect(() => {
  setskey(Tokenn.getAdminToken)
}, [Tokenn.getAdminToken])
  useEffect(() => {
    
    refetch()
  }, [currenntuser])

  const [tab, setTab] = useState("user")

  const [dashData, setdashData] = useState({})
  
  const userstat = async ()=>{
    try {
    let a = await DashRequest.userstats()
    let b = await DashRequest.conversesstats()
    let data = {userstat: a.data, conversesstats: b.data}
    // alert(JSON.stringify(data))
    setdashData(data)
    return data
    } catch (error) {
      console.log(error);
      
    }
  
  }
  useEffect(() => {
    userstat()
  }, [])

  if(isLoadingCurrentUser && currenntuser)
  return <div className="">Loading</div>
if(!isLoadingCurrentUser &&!currenntuser && skey !== "Ent@urage2@23"){
  router.push('/staterVw/admin/')

}
// if(skey !== "Ent@urage2@23"){
//   router.push('/staterVw/admin/adminlogin')

// }


  return (
    <>
      <Head>
        <title>Entourage Admin Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance dashData={dashData} />
          </Grid>
          <Grid item lg={10} xs={12} mb={4}>
            {/* <Datatable dashData={dashData}/> */}
            <div className="d-flex gap-2 m-2">
              {/* {skey} */}
              <span onClick={()=> setTab("user")} className="btn btn-sm btn-dark">Users list</span>
              <span onClick={()=> setTab("converse")} className="btn btn-sm btn-dark">Conversations</span>
              <Dropbtn/>
            </div>
           {tab == "user"? <Table_User dashData={dashData}/>:
            <Table_Converse dashData={dashData}/>}
          </Grid>
          <Grid item lg={10} xs={12} mb={4}>
            {/* <Datatable dashData={dashData}/> */}
          </Grid>
          {/* <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid> */}
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
// const downusercsv = async () => {
//   try {
//     const response = await Axios.get('/dashboard/usertocsv');
//     console.log(response);
//     return response.data
//   } catch (error) {
//     console.error(error);
//   }
// };
// const downconversecsv = async () => {
//   try {
//     const response = await Axios.get('/dashboard/conversestocsv');
//     // console.log(response.data);
//     return response.data
//   } catch (error) {
//     console.error(error);
//   }
// };




const downloaduserCSV = () => {
  Axios.get('/dashboard/usertocsv', { responseType: 'blob' }) // Make sure to use the correct URL
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'user.csv');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error downloading CSV:', error);
    });
}
const downloadconverseCSV = () => {
  Axios.get('/dashboard/conversestocsv', { responseType: 'blob' }) // Make sure to use the correct URL
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converse.csv');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error downloading CSV:', error);
    });
}

function Dropbtn() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Extract to csv">
      <Dropdown.Item onClick={()=>downloaduserCSV()} >User csv </Dropdown.Item>
      <Dropdown.Item  onClick={()=>downloadconverseCSV()}>Converse csv</Dropdown.Item>
    </DropdownButton>
  );
}