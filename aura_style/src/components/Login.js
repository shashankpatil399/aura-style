
import React from "react";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    emailId: Yup.string().email('Invalid email').required('Email is required'), 
    password: Yup.string().required('Password is required'),
});
export default function Login() {
    const navigate = useNavigate();

    const initialValues = {
        emailId: "",
        password: ""
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8040/login',values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Login successful');
                navigate("/admin");
            } else {
                console.log('Invalid credentials or unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setSubmitting(false);
    }
   
      
    return (
        <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{
                boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
                p: 7,
                borderRadius: 4,
                marginTop: 10,
                bgcolor: 'rgba(255, 153, 153, 0.4)',
            }}>
        <div className="App">
        <Typography variant="h4" style={{ fontFamily: "'Ojuju', sans-serif" }}>
    Login at Aurastyle
</Typography>
    </div>
   

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                  <Field
                                        as={TextField}
                                        fullWidth
                                        label="Email"
                                        name="emailId"
                                        placeholder="Enter Your Email"
                                        sx={{ padding: '2px', marginTop : 4}}
                                    />
                                    <ErrorMessage name="emailId" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        label="Password"
                                        name="password"
                                        placeholder="Enter Your Password"
                                        sx={{ padding: '2px', marginTop : 4}}
                                    />
                                    <ErrorMessage name="password" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000', padding: '2px', marginTop : 4 }}
                                        disabled={isSubmitting}
                                       
                                        fullWidth
                                    >
                                        {isSubmitting ? "LOGIN..." : "LOGIN"}
                                    </Button>
                                </Grid>
                                </Grid>
                        </Form>
                    )}
                </Formik>

            </Box>
        </Container>
    );
}