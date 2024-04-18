import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import HeaderBar from './HeaderBar'
import { toast } from 'react-toastify';

const getToken = () => {
    return localStorage.getItem('token');
};

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('oldPassword is required'),
    newPassword:  Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const ValidationMessage = ({ children }) => (
    <span style={{ color: 'red' }}>{children}</span>
);

function ChangePass() {
    const navigate = useNavigate();
    const token = getToken();
    if (!token) {
        
        navigate('/login');
        return null; 
    }

    const initialValues = {
        oldPassword : "",
        newPassword : ""
    };
    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const url = "http://localhost:8040/ChangePass";
            const response = await axios.post(url, values, {
                headers: {
                    "Content-Type": "application/json",
            "Authorization": token
 
                },
                
            })

            console.log("response",response);

          
            if (response.status === 200) {
               
                    localStorage.removeItem('token'); 
                    navigate("/Login");
                  
                console.log("password change successfully")
                toast.success('password change successful!');
               
            }
            else if (response.data.status === 400) {
                console.log("user Invalid");
            }


        } catch (error) {
          if (error.response.status === 401) {
            toast.error("old password is incorrect")
                console.log("user Invalid");
            }
            console.log(error, "error");

        }
  
    }

         return (
<>
            <HeaderBar/>

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
    Change Password
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
                              
                                </Grid>
                                <Grid item xs={12}>
                                    
                                
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="Password"
                                        label="oldPassword"
                                        name="oldPassword"
                                        placeholder="Enter Your Password"
                                        sx={{ padding: '2px', marginTop : 4}}
                                    />
                                    <ErrorMessage name="oldPassword" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                <Field
                                        as={TextField}
                                        fullWidth
                                        type="Password"
                                        label="newPassword"
                                        name="newPassword"
                                        placeholder="Enter Your Password"
                                        sx={{ padding: '2px', marginTop : 4}}
                                    />
                                    <ErrorMessage name="newPassword" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000', padding: '2px', marginTop : 4 }}
                                        disabled={isSubmitting}
                                       
                                        fullWidth
                                    >
                                        {isSubmitting ? "chnage Password..." : "Change Password"}
                                    </Button>
                                </Grid>
                                </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
        </>
  )
}
export default ChangePass;