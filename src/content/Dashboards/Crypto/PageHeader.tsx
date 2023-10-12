import { useFetchUserData } from '@/Services/Query/userQuery';
import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const {
    data: userdata,
    // isLoading: isLoadinguser,
    // error: erroruser,
    // refetch
  } = useFetchUserData();

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={userdata?.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {userdata?.name}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to check entourage performances!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
