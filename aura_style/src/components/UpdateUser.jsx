import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import HeaderBar from './HeaderBar';


function Update() {
    let { id } = useParams();
    const [update, setUpdate] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        mobileNo: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdate((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        axios.get(`http://localhost:8040/getUserById/${id}`)
            .then(res => {
                setUpdate({
                    ...update,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    emailId: res.data.emailId,
                    mobileNo: res.data.mobileNo
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const Navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:8040/Update/${id}`, update);
            Navigate('/Customer');
        } catch (error) {
            console.log(error);
        }
    };

    return (

      <>
      <HeaderBar/>
        <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{
                boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
                p: 3,
                borderRadius: 4,
                marginTop: 4,
                bgcolor: 'rgba(255, 153, 153, 0.4)',
            }}>
                <Typography variant="h4" style={{ fontFamily: "'Marck Script', cursive" }} align="center" gutterBottom>
                    Update Customer
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={update.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={update.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="emailId"
                                value={update.emailId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mobile No."
                                name="mobileNo"
                                value={update.mobileNo}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000' }}
                                fullWidth
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
        </>
    );
}

export default Update;
