import React, { useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button,Typography,Container, Grid, Box} from '@mui/material';
import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginFailure,loginSuccess } from "../redux/authSlice";


const apiUrl = process.env.REACT_APP_API_URL;



const validationSchema = Yup.object().shape({
    emailId: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')});

const ValidationMessage = ({ children }) => (
    <span style={{ color: 'red' }}>{children}</span>
);

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/Dashboard");
        }
    }, [navigate]);

    const initialValues = {
        emailId: "",
        password: ""
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post( `${apiUrl}/login`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                dispatch(loginSuccess({token :response.data.token
                }))
                tokenSave(response.data.token);
                console.log('Login successful');
                toast.success('Login successful!');
                navigate("/Dashboard");
            } else {
                console.log('Unexpected response status:', response.status);
                toast.error("An unexpected error occurred");
            }
        } catch (error) {
            console.error('Error:', error);
            dispatch(loginFailure({error : "login unsuccesfull"
            }))
    
            if (error.response) {
                const { status, data } = error.response;
                console.log('Error response status:', status);
                console.log('Error response data:', data);
                
                if (status === 404) {
                    toast.error(data.error || "User not found !");
                } else if (status === 401) {
                    toast.error(data.error || "Incorrect password !");
                } else {
                    toast.error("An unexpected error occurred");
                }
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    
        setSubmitting(false);
    };
    
    const tokenSave = (token) => {
        localStorage.setItem("token", token);
    };

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
                                        sx={{ padding: '2px', marginTop: 4 }}
                                    />
                                    <ErrorMessage name="emailId" component={ValidationMessage} />
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
                                        sx={{ padding: '2px', marginTop: 4 }}
                                    />
                                    <ErrorMessage name="password" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000', padding: '2px', marginTop: 4 }}
                                        disabled={isSubmitting}
                                        fullWidth >
                                        {isSubmitting ? "LOGIN..." : "LOGIN"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>

                <Typography variant="body2">
                    <Link to="/Forget" style={{ textDecoration: 'none', color: 'blue' }}>Forget Password</Link> {}
                </Typography>
<span>
                <Typography variant="body2">
                    <Link to="/Signup" style={{ textDecoration: 'none', color: 'blue' }}>Sign Up Here</Link> {}
                </Typography>
                </span>
            </Box>
        </Container>
    );
}
