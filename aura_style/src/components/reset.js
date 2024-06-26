import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;



const validationSchema = Yup.object().shape({
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password is required'),
});
const ValidationMessage = ({ children }) => (
    <span style={{ color: 'red' }}>{children}</span>
);

function Reset() {
    const navigate = useNavigate();
    const location = useLocation();

    const emailIdParam = new URLSearchParams(location.search).get("emailId");


    const initialValues = {
        emailId: emailIdParam || "", 
        password: "",
        confirmPassword: ""
    };
    const handleFormSubmit = async (values) => {
        try {
            const url = `${apiUrl}/resetpass`;
            const response = await axios.post(url, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            
            if (response.status === 200) {
                console.log("password change successful")
                toast.success('Password changed successfully!');
                navigate('/Login');
            }
            else if (response.data.status === 400) {
                console.log("user Invalid");
            }
        } catch (error) {
            console.log(error, "error");
        }
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
                        Reset Password
                    </Typography>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                                
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
                                    <ErrorMessage name="password" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        placeholder="Confirm Your Password"
                                        sx={{ padding: '2px', marginTop : 4}}
                                    />
                                    <ErrorMessage name="confirmPassword" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000', padding: '2px', marginTop : 4 }}
                                        disabled={isSubmitting}
                                        fullWidth
                                    >
                                        {isSubmitting ? "Changing Password..." : "Reset Password"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    )
}

export default Reset;
