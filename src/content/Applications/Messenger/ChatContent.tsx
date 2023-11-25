import { Box, Avatar, Typography, Card, styled, Slide } from '@mui/material';
import { useState } from "react";
// import {
//   formatDistance,
//   format,
//   subDays,
//   subHours,
//   subMinutes
// } from 'date-fns';
// import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
// import { Grid } from 'react-bootstrap-icons';
import CollapsibleText from '@/components/Custom/CollapsText';
// import ProfilModal from '@/components/Custom/modalProfile';
import Example from '@/components/Custom/modals';
import CollapsibleText1 from '@/components/Custom/CollapseTest1';
// import { ChatRequest } from '@/Services/Requests/chatReq';
import Liker from '@/components/Custom/likesComponents';
// import { toast } from 'material-react-toastify';

// const DividerWrapper = styled(Divider)(
//   ({ theme }) => `
//       .MuiDivider-wrapper {
//         border-radius: ${theme.general.borderRadiusSm};
//         text-transform: none;
//         background: ${theme.palette.background.default};
//         font-size: ${theme.typography.pxToRem(13)};
//         color: ${theme.colors.alpha.black[50]};
//       }
// `
// );

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);


function ChatContent({ converse,  chatLoad, query}) {
// function ChatContent({ converse, setConverse, chatLoad, setchatLoad, response, setResponse, error, setError }) {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const qst = [
    { query: "I'm looking for job opportunities in africa in construction industry" },
    { query: "I'm looking for expert on digital marketing for a panel discussion" },
    { query: "I'm looking for career coach to help prepare me for interview in consulting industry" },
    { query: "I want to pivot my career to management consulting. Who should I talk with ?" }

  ]

  // const [isOpen, setIsOpen] = useState(false);
  const [infoDetails, setinfoDetails] = useState(null);
  const [openInfoDetails, setopenInfoDetails] = useState(false);

  const popProfilInfo = (data)=>{
    setopenInfoDetails(true);
    setinfoDetails(data);
  }
// const HandleLikes = async(c_id, like_status)=>{
//   try {
//     const res =  await ChatRequest.setlike(c_id, like_status)
//     if(res){

//     }
//   } catch (error) {
//     console.log(error.message);
    
//   }
// }
  return (
    <Box p={3}>


      {/* <DividerWrapper>
        {format(subDays(new Date(), 3), 'MMMM dd yyyy')}
      </DividerWrapper> */}
      {converse?.map((conver, index) => (
        conver.who == "ia" ?
          <Box
            key={index}
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            py={3}
          // bgcolor={'red'}
          >
            {/* <div className="bg-danger">{JSON.stringify( conver.data.info_profil)}</div>  */}
            <Avatar
              variant="rounded"
              sx={{
                width: 50,
                height: 50
              }}
              alt="Entourage"
              src="/static/images/logo/avatent.png"
            />
            <Box
              width="75%"
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              justifyContent="flex-start"
              ml={2}
              sx={{
                width: 900,
              }}
            >
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                justifyContent="flex-end"
                mr={2}
              ><Slide direction="up" in={true} mountOnEnter unmountOnExit>
              
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 mb-3 p-4" style={{ backgroundColor: "#F3E5DB", borderRadius: "10px", color: "gray" }}>
                    <CollapsibleText text={conver.data.bot_response} />
                    {/* {JSON.stringify(conver)} */}
                    </div>
                    {/* {JSON.stringify(conver.id)} */}
                  </div>
                  <Liker id={conver.id} />
                </div>


            
      {/* <CardWrapperPrimary  className="mb-3 " style={{ backgroundColor: "#F3E5DB", borderRadius: "10px", color: "gray" }}>
                    <CollapsibleText text={conver.data.bot_response} />
                  </CardWrapperPrimary> */}

                  </Slide>

                {
                  conver.data.info_profil?.map((elmt, index) => (
                    <Slide key={index} direction="left" in={true} mountOnEnter unmountOnExit>
                     
                       <div onClick={()=> popProfilInfo(elmt)} className="container my-2 text-dark"> 
                        <div className="row p-2 border" style={{ backgroundColor: "#F3E5DB", borderRadius: "10px", color: "black"}}>
                          <strong className=""> {elmt?.Full_name}</strong>
                          <div className=""> {elmt?.Email}</div>
                         {elmt?.Biography && <div className=" mt-3"> <CollapsibleText1 text={elmt?.Biography} /> </div>}
                         {elmt?.Profil_description&& <div className=" mt-3"> <CollapsibleText1 text={elmt?.Profil_description} /> </div>}
                          <div className=" mt-3"> <span style={{ backgroundColor: "#F3E5DB"}} className="btn btn-outline-warning">Details</span> </div>
                        </div>
                    </div>
                   
                    </Slide>
              ))
                }
  
{/* popProfilInfo
 */}
  <Example show={openInfoDetails} setShow={setopenInfoDetails} data={infoDetails}/> 


              {/* <Typography
                variant="subtitle1"
                sx={{
                  pt: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
              
                <span>
                  <i style={{ backgroundColor: "", margin: "5px" }} className={`bi bi-hand-thumbs-up${"-fill"}`}></i>
                  <i style={{ backgroundColor: "", margin: "5px" }} className={`bi bi-hand-thumbs-down${"-fill"}`}></i>
                </span>
              </Typography> */}
              {/* <Liker/> */}

            </Box>
          </Box>
          </Box>
          :
  <Box
    display="flex"
    alignItems="flex-start"
    justifyContent="flex-end"
    py={3}
    key={index}
  >
    <Box
      display="flex"
      alignItems="flex-end"
      flexDirection="column"
      justifyContent="flex-end"
      mr={2}
    ><Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <CardWrapperPrimary style={{ backgroundColor: "transparent", border: "1px solid gray", color: "gray", padding: "12px" }}> {conver.data}</CardWrapperPrimary></Slide>
      {/* <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <CardWrapperPrimary
            style={{backgroundColor:"transparent", border:"1px solid gray", color:"gray", padding:"12px"}}
              sx={{
                mt: 2
              }}
            >
             -
            </CardWrapperPrimary></Slide> */}
      {/* <Typography
        variant="subtitle1"
        sx={{
          pt: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >

        <span>
          <i style={{ backgroundColor: "", margin: "5px" }} className={`bi bi-hand-thumbs-up${"-fill"}`}></i>
          <i style={{ backgroundColor: "", margin: "5px" }} className={`bi bi-hand-thumbs-down${""}`}></i>
        </span>
      </Typography> */}
      {/* <Liker/> */}
    </Box>
    <Avatar
      variant="rounded"
      sx={{
        width: 50,
        height: 50
      }}
      alt={user.name}
      src={user.avatar}
    // src={user.avatar}
    />
  </Box>
      ))

}


{
  (converse && chatLoad)&&   <Box
  display="flex"
  alignItems="flex-start"
  justifyContent="flex-end"
  py={3}
>
  <Box
    display="flex"
    alignItems="flex-end"
    flexDirection="column"
    justifyContent="flex-end"
    mr={2}
  ><Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <CardWrapperPrimary style={{ backgroundColor: "transparent", border: "1px solid gray", color: "gray", padding: "12px" }}> {query}</CardWrapperPrimary></Slide>

  </Box>
  <Avatar
    variant="rounded"
    sx={{
      width: 50,
      height: 50
    }}
    alt={user.name}
    src={user.avatar}
  />
</Box>
}

{
  (converse && chatLoad) && <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      py={3}
    >
      <Avatar
        variant="rounded"
        sx={{
          width: 50,
          height: 50
        }}
        alt="Zain Baptista"
        src="/static/images/logo/avatent.png"
      />
      <Box

        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="flex-start"
        ml={2}
      >
        <CardWrapperSecondary style={{ backgroundColor: "#F3E5DB", borderRadius: "10px", padding: "15px" }}>
          <div className="ticontainer">
            <div className="tiblock">
              <div className="tidot"></div>
              <div className="tidot"></div>
              <div className="tidot"></div>
            </div>
          </div>
        </CardWrapperSecondary>
        <Typography
          variant="subtitle1"
          sx={{
            pt: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
        </Typography>
      </Box>
    </Box>
  </Slide>
}

{
  (!chatLoad && converse.length < 1) && <div className="container my-5 ">
    <div className="row gap-4 justify-content-center my-5">

      <div style={{ backgroundColor: "#F3E5DB0", color: "#57352C" }} className="col-lg-5 p-3 rounded d-flex justify-content-center flex-column align-items-center gap-2 h3">
        <i className="bi bi-lightning-charge"></i>
        <strong className="">Example</strong>
      </div>
      <div style={{ backgroundColor: "#F3E5DB0", color: "#57352C" }} className="col-lg-5 p-3 rounded d-flex justify-content-center flex-column align-items-center gap-2 h3">
        <i className="bi bi-cloud-lightning-rain"></i>
        <strong className="">Capabilities</strong>
      </div>
    </div>
    <div className="row gap-4 justify-content-center">
      {
        qst?.map((item, index) =>

          <div key={index} style={{ backgroundColor: "#F3E5DB", color: "#57352C", cursor: "pointer" }} className="col-lg-5 p-3 rounded">
            {item.query} <i className="bi bi-arrow-right"></i> </div>
        )
      }
    </div>
  </div>
}

{/* <ProfilModal  data={"odnonronornbvortobvnon"} /> */ }
{/* <DividerWrapper>Today</DividerWrapper>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        py={3}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt="Zain Baptista"
          src="/static/images/avatars/2.jpg"
        />
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="flex-start"
          ml={2}
        >
          <CardWrapperSecondary>Hey there!</CardWrapperSecondary>
          <CardWrapperSecondary
            sx={{
              mt: 1
            }}
          >
            How are you? Is it ok if I call you?
          </CardWrapperSecondary>
          <Typography
            variant="subtitle1"
            sx={{
              pt: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ScheduleTwoToneIcon
              sx={{
                mr: 0.5
              }}
              fontSize="small"
            />
            {formatDistance(subMinutes(new Date(), 6), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
        py={3}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
          mr={2}
        >
          <CardWrapperPrimary>
            Hello, I just got my Amazon order shipped and I’m very happy about
            that.
          </CardWrapperPrimary>
          <CardWrapperPrimary
            sx={{
              mt: 1
            }}
          >
            Can you confirm?
          </CardWrapperPrimary>
          <Typography
            variant="subtitle1"
            sx={{
              pt: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ScheduleTwoToneIcon
              sx={{
                mr: 0.5
              }}
              fontSize="small"
            />
            {formatDistance(subMinutes(new Date(), 8), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt={user.name}
          src={user.avatar}
        />
      </Box> */}
    </Box >
  );
}

export default ChatContent;
