import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from "react-hook-form";
import router, { useRouter } from 'next/router';
import { AuthSys } from '@/Services/Requests/auth';
import { Tokenn } from '@/Services/Helpers/TokenLogic';
import { toast } from 'react-toastify';

type Inputs = {
    name: string,
    email: string,
    password: string,
    bio: string,
    location: string
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

export default function SignInSide() {
  const router = useRouter();

  const { register, handleSubmit,resetField, watch, formState: { errors } } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   console.log(data);
  // }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    let body;
    if (data.email !== "" && data.password !== "") {
        body = {
          name: data.name,
          email: data.email,
          password: data.password,
          bio: data.bio,
          location: data.location
        }

      console.log(body);
      try{
         const response = await AuthSys.Register(body)

         console.log("---->",response);
          Tokenn.saveToken(response.data.access_token)
          resetField()
          toast("Vous vous êtes inscrit", {
              hideProgressBar: false,
              autoClose: 5000,
              type: "info",
          });
          router.push("/auth/signin")
         

       } catch (error) {

         console.error('------->',error);
         toast(error.message, {
             hideProgressBar: false,
             autoClose: 4000,
             type: "error",
           });
       }

    }else{
        alert('Tous les champs sont obligatoires')
    }
  };


  const handleSubmit1 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = event.currentTarget;
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
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
        />
        <Grid style={{justifyContent:"center", display:"flex", backgroundColor:"#ebd8ce"}}  item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
          bgcolor="white"
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: "20px",
              padding: 10,
              
            }}
            style={{justifyContent:"center", display:"flex"}}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
              <img src="/static/images/logo/logo-light1.png"/>
            </Avatar> */}
              <img src="/static/images/logo/logodark.svg"/>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="div" noValidate  sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nom et Prénoms"
                {...register("name", { required: true })}
                autoComplete="Manuel Kokoui"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email", { required: true })}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("password", { required: true })}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("bio", { required: true })}
                label="Bio"
                type="bio"
                id="bio"
                autoComplete="current-bio"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("location", { required: true })}
                label="Localisation"
                type="location"
                id="location"
                autoComplete="current-location"
              />
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
                Sign Up
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <Copyright sx={{ mt: 5 }} />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}