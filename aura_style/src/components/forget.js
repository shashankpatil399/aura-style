import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';
import axios from 'axios';
import HeaderBar from './HeaderBar';
import { toast } from 'react-toastify';

const Forget = () => {
    const [emailId, setEmailId] = useState(''); 
    const navigate = useNavigate();

    const initialValues = {
        emailId: '',
        otp: '',
    };

    const validationSchema = Yup.object().shape({
        emailId: Yup.string().email('Invalid email address').required('Required'),
        otp: Yup.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters').required('Required'),
    });

    const ValidationMessage = ({ children }) => (
        <span style={{ color: 'red' }}>{children}</span>
    );

    const handleSendOTP = async (values) => {
        console.log(values);
        try {
            const url = "http://localhost:8040/otpSend";
            const response = await axios.post(url, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.status)
            if (response.status === 200) {
                toast.success('OTP Sent Successfully');
                console.log("success", response.data);
         
            } else if (response.status === 401) {
                console.log("cannot send otp because email is not registered");
            }
        } catch (error) {
            if (error.response.status === 401) {
                toast.error("Invalid Email ID");
            }
            console.log("error", error);
        }
    };

    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const url = "http://localhost:8040/verifyOtp";
            const response = await axios.post(url, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response.status)
            if (response.status === 202) {
                setEmailId(values.emailId); 
                navigate(`/Reset?emailId=${values.emailId}`); 
                toast.success("OTP successfully verified");
            } else if (response.data.status === 402) {
                console.log("email already exists");
            }
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Invalid OTP");
            } else {
                console.log(error, "error");
            }
        }
    };

    return (
        <>
            <HeaderBar />
            <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{
                    boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
                    p: 7,
                    borderRadius: 4,
                    marginTop: 0,
                    bgcolor: 'rgba(255, 153, 153, 0.4)',
                }}>
                    <div className="App">
                        <Typography variant="h4" style={{ fontFamily: "'Ojuju', sans-serif" }}>
                            Reset password
                        </Typography>
                    </div>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onClick={handleSendOTP}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}></Grid>
                                    <TextField
                                        fullWidth
                                        name="emailId"
                                        label="emailId"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.emailId}
                                        placeholder="Enter Your Email"
                                        sx={{ padding: '2px', marginTop: 4 }}
                                        error={touched.emailId && Boolean(errors.emailId)}
                                        helperText={touched.emailId && errors.emailId}
                                    />
                                    <ErrorMessage name="emailId" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}></Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained"
                                        type="submit"
                                        fullWidth
                                        sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000', padding: '2px', marginTop: 4 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSendOTP(values);
                                        }}>
                                        {isSubmitting ? "Sending OTP..." : "Send OTP"}
                                    </Button>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ padding: '2px', marginTop: 4 }}
                                            fullWidth
                                            name="otp"
                                            label="OTP"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.otp}
                                            disabled={isSubmitting}
                                            error={touched.otp && Boolean(errors.otp)}
                                            helperText={touched.otp && errors.otp}
                                        />
                                        <ErrorMessage name="otp" component={ValidationMessage} />
                                    </Grid>
                                    <Button fullWidth type="submit" variant="contained" sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000', padding: '2px', marginTop: 4 }}>
                                        Verify OTP
                                    </Button>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </>
    );
};

export default Forget;
