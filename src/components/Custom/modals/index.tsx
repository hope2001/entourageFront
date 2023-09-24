// import Head from 'next/head';
// import SidebarLayout from '@/layouts/SidebarLayout';
// import PropTypes from 'prop-types';
// import { useState } from 'react';

// import PageTitle from '@/components/PageTitle';
// import PageTitleWrapper from '@/components/PageTitleWrapper';
// import {
//   Container,
//   Grid,
//   Card,
//   CardHeader,
//   CardContent,
//   Divider
// } from '@mui/material';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import Footer from '@/components/Footer';

// const emails = ['username@gmail.com', 'user02@gmail.com'];

// function SimpleDialog(props) {
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const handleListItemClick = (value) => {
//     onClose(value);
//   };

//   return (
//     <Dialog className="bg-danger" onClose={handleClose} open={open}>
//       <div className="container-fluid p-5 bg-warning">ff</div>
//       <DialogTitle>Set backup account</DialogTitle>
//       <List sx={{ pt: 0 }}>
//         {emails.map((email) => (
//           <ListItem
//             button
//             onClick={() => handleListItemClick(email)}
//             key={email}
//           >
//             <ListItemAvatar>
//               <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
//                 <PersonIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary={email} />
//           </ListItem>
//         ))}

//         <ListItem
//           autoFocus
//           button
//           onClick={() => handleListItemClick('addAccount')}
//         >
//           <ListItemAvatar>
//             <Avatar>
//               <AddIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Add account" />
//         </ListItem>
//       </List>
//     </Dialog>
//   );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired
// };

// function Modals() {
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <>
//       <Head>
//         <title>Modals - Components</title>
//       </Head>
//       <PageTitleWrapper>
//         <PageTitle
//           heading="Modals"
//           subHeading="Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks."
//           docs="https://material-ui.com/components/dialogs/"
//         />
//       </PageTitleWrapper>
//       <Container maxWidth="lg">
//         <Grid
//           container
//           direction="row"
//           justifyContent="center"
//           alignItems="stretch"
//           spacing={3}
//         >
//           <Grid item xs={12}>
//             <Card>
//               <CardHeader title="Basic Dialog" />
//               <Divider />
//               <CardContent>
//                 <Typography variant="subtitle1" component="div">
//                   Selected: {selectedValue}
//                 </Typography>
//                 <br />
//                 <Button variant="outlined" onClick={handleClickOpen}>
//                   Open simple dialog
//                 </Button>
//                 <SimpleDialog
//                   selectedValue={selectedValue}
//                   open={open}
//                   onClose={handleClose}
//                 />
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//       <Footer />
//     </>
//   );
// }

// Modals.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

// export default Modals;


import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';



function Example({data, show, setShow}) {
  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  async function copyTextToClipboard(text) {
    // alert(text)
    if ('clipboard' in navigator) {
      toast(text+'       Copied to clipboard!',
      {autoClose: 2000, type: 'info'})
      return await navigator.clipboard.writeText(text);
    } else {
      toast(text+'    Copied to clipboard!',
      {autoClose: 2000, type: 'info'})
      return document.execCommand('copy', true, text);
    }
    // toast('Copied to clipboard!',
    //   {autoClose: 2000, type: 'success'})
    //   alert(text)
  }
  return (
    <>
      {/* <span  onClick={handleShow}>
        {children}
      </span> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        bgColor="red"
        
      >
        <Modal.Header className="bg-warnin border-0" closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          {/* {JSON.stringify(data)} */}
          <div className="container-fluid" style={{fontSize:"14px"}}>
            <div className="row my-3">
              <h4 className="col-md-12 text-center"> {data?.Full_name}  <a rel="noreferrer" href={data?.Linkedin} target="_blank"><i className="bi bi-linkedin text-primary"></i></a>  </h4>
            { data?.Email? <h6 className="col-md-12 text-center text-dark ">   <a style={{textDecoration:"none", color:"gray"}} rel="noreferrer" href={'mailto:'+data?.Email} target="_blank"> {data?.Email} </a>  </h6> : <span></span>}
              </div>
            <div className="row text-cente p-2">
              <div className="col-md-4 d-flex flex-column"> <span>Country</span> <strong>{data?.Country ||"N.A"}</strong>  </div>
              
              <div className="col-md-4 d-flex flex-column"> 
              <span>Cohort</span> 
             {data?.Cohort.length>1 ?  <strong > 
                {data.Cohort}
                </strong>:
                <span>N.A</span> }
              </div>

              <div className="col-md-4 d-flex flex-column"> 
              <span>Postion</span> 
             {data?.Position.length>1 ?  <strong > 
                {data.Position}
                </strong>:
                <span>N.A</span> }
              </div>


              {/* <div className="col-md-4 d-flex flex-column"> <span>LinkedIn</span> <span> {<Link className="btn btn-primary" href={data?.Linkedin}> <i className="bi bi-linkedin"></i> {data?.Linkedin ||"N.A"}</Link> ||"N.A"} </span>  </div> */}
              <div className="my-2"></div>
              <div className="col-md-8 d-flex flex-column"> <span> Area of Expertise </span> <strong>{data?.Area_of_Expertise ||"N.A"}</strong>  </div>
              </div>
              <div className="row p-2 my-4">
                  <strong className="">Bio</strong>
                <div className="col ">
                  <div style={{ whiteSpace: 'break-spaces', lineHeight: '1.2rem', textAlign:"justify" }} className="">
                  {data?.Biography ||"N.A"}
                  </div>
                </div>
              </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
     </>
  );
}

export default Example;