import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from "react-hook-form";
import { Tokenn } from '@/Services/Helpers/TokenLogic';
import { AuthSys } from '@/Services/Requests/auth';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import { secret_key } from '@/Services/enviro';
// import { useToast } from '@chakra-ui/react'
type Inputs = {
    email: string,
    password: string,
    secret: string
  }; 

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Entourage
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();
    const { register, handleSubmit,reset, formState: { errors } } = useForm<Inputs>();
    // const onSubmit: SubmitHandler<Inputs> = (data) => {
    //             console.log(data);}

                
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        // let body;
        
        if (data.email !== "" && data.password !== "") {
            let formDataToSend = new FormData();
            formDataToSend.append('username', data.email);
            formDataToSend.append('password', data.password);

          // console.log(formDataToSend);

          try{
             const response = await AuthSys.Login(formDataToSend)
            //  console.log("---->",response);
             if(data.secret == secret_key){
                Tokenn.saveAdminToken(response.data.access_token, data.secret)
                reset()
                toast("You are connected", {
                    hideProgressBar: false,
                    autoClose: 5000,
                    type: "success",
                });
                router.push("/staterVw/admin/admin")}else{
                    toast("Invalid credentials", {
                        hideProgressBar: false,
                        autoClose: 5000,
                        type: "error",
                    });
                }
 
           } catch (error) {
 

      
            if(error.response?.status === 401)
            {
               toast("Invalid credentials", {
                hideProgressBar: false,
                autoClose: 4000,
                type: "error",})
            }
            else{
               toast("Server Error", {  
                hideProgressBar: false,
                autoClose: 5000,
                type: "error" })
            }
            //  console.table('------->',error);
           }

        }else{
            alert('Tous les champs sont obligatoires')
        }
      };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?abstract)',
            // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        {/* <Grid style={{justifyContent:"center", display:"flex", backgroundColor:"#ebd8ce"}}  item xs={12} sm={8} md={5} component={Paper} elevation={6} square> */}
        <Grid style={{justifyContent:"center", display:"flex", backgroundColor:"#ebd8ce"}}  item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
          <Box
          bgcolor="white"
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: "20px",
              padding: 5,
              
            }}
            style={{justifyContent:"center", display:"flex"}}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
              <img src="/static/images/logo/logo-light1.png"/>
            </Avatar> */}
            <Link className="my-3 d-flex text-center justify-content-center" href="/"><img className="w-75" src="/static/images/logo/logodark.svg"/></Link>
              
            <Typography className="fw-bold text-danger" component="h1" variant="h5">
              Admin Login
            </Typography>
            <Box component="div"  sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email", { required: true })}
                autoComplete="email"
                autoFocus
              />{errors.email && <span>email is required</span>}
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("password", { required: true })}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />{errors.password && <span>password is required</span>}
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("secret", { required: true })}
                label="Admin Secret Key"
                type="password"
                id="password1"
              />{errors.secret && <span>Secret key is required</span>}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                style={{backgroundColor: "#F2AC23", color: "white", padding:"3", width:"50%", display:"block", margin:"auto"}}

              >
                Sign In
              </Button>
              <Grid className="mt-5" container>
               
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}