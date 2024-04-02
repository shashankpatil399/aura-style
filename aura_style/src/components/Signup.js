import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, Container, Grid, Box, Avatar } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailId: Yup.string().email('Invalid email format').test(
        'isValidDomain',
        'Invalid domain extension',
        (value) => {
            if (!value) return false; 
            const domainParts = value.split('@')[1].split('.');
            const domainExtension = domainParts[domainParts.length - 1];
            return ['com', 'org', 'net'].includes(domainExtension.toLowerCase()); 
        }
    ),
    mobileNo: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Mobile No. is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),

});

const ValidationMessage = ({ children }) => (
    <span style={{ color: 'red' }}>{children}</span>
);

export default function Signup() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const initialValues = {
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNo: "",
        image: null,
        password: "",
        confirmPassword: ""
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('emailId', values.emailId);
            formData.append('mobileNo', values.mobileNo);
            formData.append('password', values.password);
            formData.append('confirmPassword', values.confirmPassword);
            formData.append('image', selectedImage);

            const response = await axios.post('http://localhost:8040/Signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Register successful');
                toast.success('Registration successful!');
                navigate("/Login");
            } else {
                console.log('Invalid credentials or unexpected response status:', response.status);
            }
        } catch (error) {
            toast.error("User Already Register")
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{
                boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
                p: 3,
                borderRadius: 4,
                marginTop: 4,
                bgcolor: 'rgba(255, 153, 153, 0.4)',
            }}>
                <Avatar
                    sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                    src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
                    alt="Profile"
                />
                <Typography variant="h4" style={{ fontFamily: "'Marck Script', cursive" }} align="center" gutterBottom>
                    Register Yourself At AuraStyle 🧥
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        id="image-upload"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="image-upload">
                                        <Button variant="contained" component="span"  sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000',marginLeft:'28%', marginBottom : "4%" }}>
                                            Choose Image
                                        </Button>
                                    </label>
                                    </Grid>
                                </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Enter Your First Name"
                                    />
                                    <ErrorMessage name="firstName" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Enter Your Last Name"
                                    />
                                    <ErrorMessage name="lastName" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Email"
                                        name="emailId"
                                        placeholder="Enter Your Email"
                                    />
                                    <ErrorMessage name="emailId" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Mobile No."
                                        name="mobileNo"
                                        placeholder="Enter Your Mobile Number"
                                    />
                                    <ErrorMessage name="mobileNo" component={ValidationMessage}/>
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
                                    <ErrorMessage name="password" component={ValidationMessage} />
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
                                    <ErrorMessage name="confirmPassword" component={ValidationMessage} />
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
                  <Link to="/Login" style={{ textDecoration: 'none', color: 'blue' }}>Login</Link> {}               </Typography>
           </Box>
        </Container>
    );
}