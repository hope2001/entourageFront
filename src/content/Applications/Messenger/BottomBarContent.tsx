import {
  // Avatar,
  // Tooltip,
  // IconButton,
  Box,
  Button,
  styled,
  InputBase,
  // useTheme
} from '@mui/material';
// import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
// import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { useForm } from 'react-hook-form';
import { ChatRequest } from '@/Services/Requests/chatReq';
// import{useState} from "react";
import Axios from '@/Services/Requests/interceptor';
// import { useRouter } from 'next/router';
// import { DiscussRequest } from '@/Services/Requests/discusReq';
// import { ChatContext } from '@/Services/Context/chatContext';
// import { useFetchUserData } from '@/Services/Query/userQuery';
import { toast } from 'react-toastify';
import { ia_api } from '@/Services/enviro';

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

// const Input = styled('input')({
//   display: 'none'
// });



function BottomBarContent({ converse, setConverse, chatLoad, setchatLoad, response, setResponse, error, setError,inter, setinter}) {
  // const {data: thisuser, isLoading, isError} = useFetchUserData()
  // const { discussId,setdiscussId } = useContext(ChatContext)

  console.log(response);
  console.log(error);
  
  // const [discussId, setdiscussId] = useState(null)
  // const { converse, setConverse, chatLoad, setchatLoad, response, setResponse, error, setError} = props;
  // const theme = useTheme();

  // const user = {
  //   name: 'Catherine Pike',
  //   avatar: '/static/images/avatars/1.jpg'
  // };

  // const router = useRouter()
  // {router.query.slug}
  const { register, handleSubmit,reset } = useForm();
  // const { register, handleSubmit,reset } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //             console.log(data);}

              
  // const onSubmitc: SubmitHandler<Inputs> = async (data) => {
  //     console.log(data);
  //     setchatLoad(true)
  //     try {
  //       if(!discussId){
  //         const response = await ChatRequest.newConverse(data.query)
  //         setdiscussId(response.data.id)
  //         if(response.data.id){
  //           console.log("response");
  //           console.log(response.data);
            
  //           const res = await ChatRequest.ask(`["hello"]`, response.data.id, data.query)
  //           console.log(res.data.response)
  //           setResponse(res.data.response)
  //           // const query = data.query
  //           setConverse([...converse, {who: "human", data: data.query}, {who: "ia", data: res.data.answer}])
    
  //            setchatLoad(false)
  //            resetField()
  //            setError(null); // Clear any previous errors
  //         }
  //       }else{
  //           const res = await ChatRequest.ask([],discussId,data.query)
  //           console.log(res.data.response)
  //           setResponse(res.data.response)
  //           // const query = data.query
  //           setConverse([...converse, {who: "human", data: data.query}, {who: "ia", data: res.data.answer}])
    
  //            setchatLoad(false)
  //            resetField()
  //            setError(null); // Clear any previous errors
        
  //       }

  //      } catch (err) {
  //        setError(err.message); // Handle errors
  //        setResponse(null); // Clear response data on error
  //      }

  //   };

    const onSubmit = async (data, e) => {
 
      e.preventDefault();
      try {
       const query = data.query
        setchatLoad(true)
        reset()
        
        // console.log(inter);
        // alert(JSON.stringify(inter));
        // console.log(inter.slice(-3));
        
        const apiUrlfull = ia_api+"chatbot?collect_name=entouragetest10&query="+query+"&json_data="+JSON.stringify(inter.slice(-3))+"&model=gpt-4&temp=0&templa=As%20a%20career%20development%20expert%2C%20you%20need%20to%20provide%20a%20helpful%20and%20professional%20answer%20to%20the%20user%27s%20question%20or%20problem.%20Add%20to%20your%20answers%20interesting%20professional%20profiles%20related%20to%20his%20question.%20Remember%20that%20you%20should%20never%20make%20up%20any%20information%20if%20you%20don%27t%20have%20a%20correct%20answer%20to%20the%20question."; // Your API URL
        // const apiUrlfull = "http://127.0.0.1:8001/chatbot?collect_name=entouragetest10&query="+query+"&model=gpt-4&temp=0&templa=As%20a%20career%20development%20expert%2C%20you%20need%20to%20provide%20a%20helpful%20and%20professional%20answer%20to%20the%20user%27s%20question%20or%20problem.%20Add%20to%20your%20answers%20interesting%20professional%20profiles%20related%20to%20his%20question.%20Remember%20that%20you%20should%20never%20make%20up%20any%20information%20if%20you%20don%27t%20have%20a%20correct%20answer%20to%20the%20question."; // Your API URL
  //   const apiUrlfull = 'http://127.0.0.1:8001/chatbot?'+'collect_name:=entouragetest10'+'&query=Bonjour'+'&json_data=%5B%5D'+'&model=gpt-3.5-turbo&temp=0.6'+'&templa='+"As a career development expert, you need to provide a helpful and professional response to the user\'s question or problem. Add to your answers interesting professional profiles related to his question. Remember that you should never invent or provide professional profiles that are not in the CONTEXT provided."; // Your API URL
        const response = await Axios.post(apiUrlfull);
        const res =  await ChatRequest.ask1(data.query, JSON.stringify(response.data))
        console.log("res data");
        console.log(res);


        
        setConverse([...converse,{who: "human", data: query}, {who: "ia", data: response.data} ])
        setinter([...inter,{"query":query,"response":response.data.bot_response}])
  
        // const res =  await ChatRequest.ask1(data.query, JSON.stringify(response.data))
        // // const res =  await ChatRequest.ask(thisuser.id, data.query, JSON.stringify(response.data))
        // console.log("res data");
        // console.log(res);

        setchatLoad(false)
        reset()
        setError(null); // Clear any previous errors
      } catch (err) {
        toast("Something went wrong server error",{
          type: "error",
          autoClose: 5000,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setchatLoad(false)
        setError(err.message); // Handle errors
        setResponse(null); // Clear response data on error
      }
    };

  return (<form style={{backgroundColor: "re", }} onSubmit={handleSubmit(onSubmit)}>
    <Box 
      sx={{
        background: "",
        // background: theme.colors.alpha.white[50],
        display: 'flex',
        alignItems: 'center',
        p: 2
      }}
    > <span style={{backgroundColor: "transparent", display: "flex", width:"100%", borderRadius:"10px", border:"1px #5A4A40 solid"}}>
      <Box  flexGrow={1} display="flex" alignItems="center">
        {/* <Avatar
          sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
          alt={user.name}
          src={user.avatar}
        /> */}
        <MessageInputWrapper
        style={{color: "##E0CDBE", }}
          // autoFocus
          placeholder="Ask something..."
          fullWidth
          {...register("query", { required: true })}
        />
      </Box>
      <Box>
        {/* <Tooltip arrow placement="top" title="Choose an emoji">
          <IconButton
            sx={{ fontSize: theme.typography.pxToRem(16) }}
            color="primary"
          >
            😀
          </IconButton>
        </Tooltip> */}
        {/* <Input accept="image/*" id="messenger-upload-file" type="file" /> */}
        {/* <Tooltip arrow placement="top" title="Attach a file">
          <label htmlFor="messenger-upload-file">
            <IconButton sx={{ mx: 1 }} color="primary" component="span">
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip> */}
        {/* <Button style={{backgroundColor:"gold", color:"brown"}} startIcon={<SendTwoToneIcon />} variant="contained"> */}
        <Button disabled={chatLoad} type="submit" style={{backgroundColor:"transparent"}} variant="contained"> 
       { !chatLoad? <img  src="/static/images/logo/submit.svg"/>:
         <i style={{fontSize:"25px"}} className="bi bi-cloud-upload-fill text-danger"></i>}
        </Button>
      </Box></span>
    </Box>
      <div style={{fontSize:"10px"}} className="container text-center  p-2 mx-auto">Please be mindful that Entourage retains your conversations for performance monitoring. Please refrain from sharing sensitive information during these exchanges.</div>
    </form>
  );
}

export default BottomBarContent;
