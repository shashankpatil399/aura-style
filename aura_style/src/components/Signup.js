
import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

    const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailId: Yup.string().email('Invalid email').required('Email is required'),
    mobileNo: Yup.string().required('Mobile No. is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default function Signup() {
    const navigate = useNavigate();
    const initialValues = {
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNo: "",
        password: "",
        confirmPassword: ""
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8040/Signup', values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Register successful');
                navigate("/");
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
                p: 3,
                borderRadius: 4,
                marginTop: 4,
                bgcolor: 'rgba(255, 153, 153, 0.4)',
            }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register YourSelf At AuraStyle 🧥
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Enter Your First Name"
                                    />
                                    <ErrorMessage name="firstName" component="div" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Enter Your Last Name"
                                    />
                                    <ErrorMessage name="lastName" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Email"
                                        name="emailId"
                                        placeholder="Enter Your Email"
                                    />
                                    <ErrorMessage name="emailId" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Mobile No."
                                        name="mobileNo"
                                        placeholder="Enter Your Mobile Number"
                                    />
                                    <ErrorMessage name="mobileNo" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        label="Password"
                                        name="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <ErrorMessage name="password" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000' }}
                                        disabled={isSubmitting}
                                        fullWidth
                                    >
                                        {isSubmitting ? "Registering..." : "Register"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Link to="/Login" style={{ textDecoration: 'none', color: 'blue' }}>Login</Link> {}
                </Typography>
            </Box>
        </Container>
    );
}
