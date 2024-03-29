// import React, { useEffect, useState } from "react";
// import Axios from 'axios';
// import { Typography, Container, Grid, Box} from '@mui/material';
// import HeaderBar from './HeaderBar';

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     Axios.get('http://localhost:8040/profile',{
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": token
//       }
//     })
//     .then((res) => {
//       if (res.data) {
//         setProfile(res.data);
//         setLoading(false);
//       } else {
//         console.error("No profile data received from the server.");
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching profile data:", error);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!profile) {
//     return <div>No profile data available.</div>;
//   }

//   return (
//     <>
//       <HeaderBar />
//       <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <Box sx={{
//           boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
//           p: 3,
//           borderRadius: 4,
//           marginTop: 4,
//           bgcolor: 'rgba(255, 153, 153, 0.4)',
//         }}>
//           <Typography variant="h4" style={{ fontFamily: "'Marck Script', cursive" }} align="center" gutterBottom>
//             Your Profile
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Typography variant="subtitle1" sx={{ flex: 1 }}>
//                   First Name:
//                 </Typography>
//                 <Typography variant="body1">{profile.firstName}</Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Typography variant="subtitle1" sx={{ flex: 1 }}>
//                   Last Name:
//                 </Typography>
//                 <Typography variant="body1">{profile.lastName}</Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Typography variant="subtitle1" sx={{ flex: 1 }}>
//                   Email:
//                 </Typography>
//                 <Typography variant="body1">{profile.emailId}</Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Typography variant="subtitle1" sx={{ flex: 1 }}>
//                   Mobile No.:
//                 </Typography>
//                 <Typography variant="body1">{profile.mobileNo}</Typography>
//               </Box>
//             </Grid>
//             {/* Add additional fields as needed */}
//           </Grid>
        
//         </Box>
//       </Container>
//     </>
//   );
// }
// export default Profile;



import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { Typography, Container, Grid, Box, Button, TextField } from '@mui/material';
import HeaderBar from './HeaderBar';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    Axios.get('http://localhost:8040/profile',{
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    .then((res) => {
      if (res.data) {
        setProfile(res.data);
        setUpdatedProfile(res.data); // Initialize updatedProfile with current profile data
        setLoading(false);
      } else {
        console.error("No profile data received from the server.");
      }
    })
    .catch(error => {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    });
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = () => {
    const token = localStorage.getItem('token');
    Axios.put('http://localhost:8040/updateProfile', updatedProfile, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    .then((res) => {
      if (res.data) {
        setProfile(res.data);
        setUpdatedProfile(res.data);
        setEditMode(false);
      } else {
        console.error("No updated profile data received from the server.");
      }
    })
    .catch(error => {
      console.error("Error updating profile data:", error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <>
      <HeaderBar />
      <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{
          boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
          p: 3,
          borderRadius: 4,
          marginTop: 4,
          bgcolor: 'rgba(255, 153, 153, 0.4)',
        }}>
          <Typography variant="h4" style={{ fontFamily: "'Marck Script', cursive" }} align="center" gutterBottom>
            Your Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  First Name:
                </Typography>
                {editMode ? (
                  <TextField name="firstName" value={updatedProfile.firstName} onChange={handleChange} />
                ) : (
                  <Typography variant="body1">{profile.firstName}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  Last Name:
                </Typography>
                {editMode ? (
                  <TextField name="lastName" value={updatedProfile.lastName} onChange={handleChange} />
                ) : (
                  <Typography variant="body1">{profile.lastName}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  Email:
                </Typography>
                <Typography variant="body1">{profile.emailId}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  Mobile No.:
                </Typography>
                {editMode ? (
                  <TextField name="mobileNo" value={updatedProfile.mobileNo} onChange={handleChange} />
                ) : (
                  <Typography variant="body1">{profile.mobileNo}</Typography>
                )}
              </Box>
            </Grid>
            {/* Add additional fields as needed */}
          </Grid>
          {editMode ? (
           <Button
           variant="contained"
           sx={{
             width: '100%',
             bgcolor: 'rgba(255, 153, 153, 0.4)',
             '&:hover': {
               bgcolor: 'lightblue',
             },
             color: '#000', // Text color
           }}
           onClick={handleUpdate}
         >
           Update
         </Button>
          ) : (
            <Button
            variant="contained"
            sx={{
              width: '100%',
              bgcolor: 'rgba(255, 153, 153, 0.4)',
              '&:hover': {
                bgcolor: 'lightblue',
              },
              color: '#000', // Text color
            }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          
          )}
        </Box>
      </Container>
    </>
  );
}

export default Profile;
