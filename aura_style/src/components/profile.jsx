import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { Typography, Container, Grid, Box, Button, TextField, Avatar } from '@mui/material';
import HeaderBar from './HeaderBar';

const apiUrl = process.env.REACT_APP_API_URL;

function Profile() {
  const [profile,        setProfile]         = useState(null);
  const [loading,        setLoading]         = useState(true);
  const [editMode,       setEditMode]        = useState(false);
  const [updatedProfile, setUpdatedProfile]  = useState(null);
  const [selectedImage,  setSelectedImage]   = useState(null);
  
  console.log("updateIMage",updatedProfile);
  
  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const response = await Axios.get('http://localhost:8040/profile', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      if (response.data) {
        setProfile(response.data);
        setUpdatedProfile(response.data);
        setLoading(false);
      } else {
        console.error("No profile data received from the server.");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  

  // const handleSubmit = async (event) => {
  //   console.log(event.target.value);
  //   event.preventDefault();
  // };

  const handleEdit = () => {
    setEditMode(true);
  };

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  
  //   if (name === 'profileImage') {
  //     setUpdatedProfile({ ...updatedProfile, profileImage: files[0] });
  //   } else {
  //     setUpdatedProfile({ ...updatedProfile, [name]: value });
  //   }
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };
  


  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
}
  
  const handleUpdate = async () => {
    try {
        const formData = new FormData();
        formData.append('firstName', updatedProfile.firstName);
        formData.append('lastName', updatedProfile.lastName);
        formData.append('emailId', updatedProfile.emailId);
        formData.append('mobileNo', updatedProfile.mobileNo);
        // formData.append('password', values.password);
        // formData.append('confirmPassword', values.confirmPassword);
        formData.append('image', selectedImage);

        const token = localStorage.getItem('token');

        const response = await Axios.post(`${apiUrl}/updateProfile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token
          }
        });
        if (response.data) {
          setProfile(response.data);
          setUpdatedProfile(response.data);
          setEditMode(false);
          window.location.reload()
      
          // Fetch updated profile data
          fetchProfile();
        } else {
            console.log('Invalid credentials or unexpected response status:', response.status);
        }
    } catch (error) {
        // toast.error("User Already Register")
        console.error('Error:', error);
    } 
};

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
    
  //   if (name === 'profileImage') {
  //     setUpdatedProfile({ ...updatedProfile, [name]: files[0] });
  //   } else {
  //     setUpdatedProfile({ ...updatedProfile, [name]: value });
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Profile Image URL:", profile.image);

  return (
    <>
      <HeaderBar />
      <Container maxWidth="xs">
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
                  Profile Image:
                </Typography>
                {editMode ? (
  <input
    accept="image/*"
    id="contained-button-file"
    name="profileImage"
    type="file"
    onChange={handleImageChange}
  />
) : (
<Avatar alt="Profile Image" src={`http://localhost:8040/upload/images/${profile.image}`} />
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
                color: '#000', 
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
                color: '#000', 
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